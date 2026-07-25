-- NeoHub admin, leads (spam-hardened), testimonials, and CMS write policies.

-- ── Admin registry (never trust user_metadata for authz) ───────────────────
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users (lower(email));

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users au
    WHERE au.user_id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

DROP POLICY IF EXISTS "Admins read admin_users" ON public.admin_users;
CREATE POLICY "Admins read admin_users"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Users read own admin row" ON public.admin_users;
CREATE POLICY "Users read own admin row"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- ── Leads ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL DEFAULT 'contact' CHECK (type IN ('tour', 'contact')),
  name text NOT NULL,
  email text,
  phone text NOT NULL,
  company text,
  subject text,
  preferred_date text,
  amenity text,
  source_path text,
  ip_hash text,
  user_agent text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed', 'spam')),
  is_spam boolean NOT NULL DEFAULT false,
  spam_reasons text[] NOT NULL DEFAULT '{}',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (btrim(name) <> ''),
  CHECK (btrim(phone) <> '')
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone_created ON public.leads (phone, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_ip_created ON public.leads (ip_hash, created_at DESC);

CREATE OR REPLACE FUNCTION public.set_leads_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_leads_updated_at ON public.leads;
CREATE TRIGGER trg_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.set_leads_updated_at();

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins manage leads" ON public.leads;
CREATE POLICY "Admins manage leads"
  ON public.leads
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Public lead intake via SECURITY DEFINER RPC (no direct anon INSERT)
CREATE OR REPLACE FUNCTION public.submit_public_lead(
  p_type text,
  p_name text,
  p_email text,
  p_phone text,
  p_company text DEFAULT NULL,
  p_subject text DEFAULT NULL,
  p_preferred_date text DEFAULT NULL,
  p_amenity text DEFAULT NULL,
  p_source_path text DEFAULT NULL,
  p_ip_hash text DEFAULT NULL,
  p_user_agent text DEFAULT NULL,
  p_honeypot text DEFAULT NULL,
  p_form_started_at timestamptz DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_type text;
  v_name text;
  v_email text;
  v_phone text;
  v_phone_digits text;
  v_spam boolean := false;
  v_reasons text[] := '{}';
  v_id uuid;
  v_recent_phone int;
  v_recent_ip int;
BEGIN
  v_type := lower(coalesce(nullif(btrim(p_type), ''), 'contact'));
  IF v_type NOT IN ('tour', 'contact') THEN
    v_type := 'contact';
  END IF;

  v_name := left(btrim(coalesce(p_name, '')), 120);
  v_email := nullif(left(btrim(coalesce(p_email, '')), 160), '');
  v_phone := left(btrim(coalesce(p_phone, '')), 20);
  v_phone_digits := regexp_replace(v_phone, '\D', '', 'g');

  IF v_name = '' THEN
    RAISE EXCEPTION 'Name is required' USING ERRCODE = '22023';
  END IF;
  IF length(v_phone_digits) < 8 OR length(v_phone_digits) > 15 THEN
    RAISE EXCEPTION 'A valid phone number is required' USING ERRCODE = '22023';
  END IF;
  IF v_email IS NOT NULL AND v_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'Please enter a valid email address' USING ERRCODE = '22023';
  END IF;

  -- Honeypot filled => silent spam accept (don't tip off bots)
  IF coalesce(btrim(p_honeypot), '') <> '' THEN
    v_spam := true;
    v_reasons := array_append(v_reasons, 'honeypot');
  END IF;

  -- Too-fast submit (< 2.5s) is usually a bot
  IF p_form_started_at IS NOT NULL AND p_form_started_at > (now() - interval '2.5 seconds') THEN
    v_spam := true;
    v_reasons := array_append(v_reasons, 'too_fast');
  END IF;

  -- Link spam / script tags in free text
  IF coalesce(p_subject, '') ~* '(https?://|www\.|<script|\[url=)' THEN
    v_spam := true;
    v_reasons := array_append(v_reasons, 'link_spam');
  END IF;

  SELECT count(*) INTO v_recent_phone
  FROM public.leads
  WHERE phone = v_phone
    AND created_at > now() - interval '1 hour';

  IF v_recent_phone >= 3 THEN
    RAISE EXCEPTION 'Too many requests from this number. Please try WhatsApp or call us.' USING ERRCODE = '54000';
  END IF;

  IF coalesce(p_ip_hash, '') <> '' THEN
    SELECT count(*) INTO v_recent_ip
    FROM public.leads
    WHERE ip_hash = p_ip_hash
      AND created_at > now() - interval '1 hour';

    IF v_recent_ip >= 8 THEN
      RAISE EXCEPTION 'Too many requests. Please try again later.' USING ERRCODE = '54000';
    END IF;
  END IF;

  INSERT INTO public.leads (
    type, name, email, phone, company, subject, preferred_date, amenity,
    source_path, ip_hash, user_agent, status, is_spam, spam_reasons
  ) VALUES (
    v_type,
    v_name,
    v_email,
    v_phone,
    nullif(left(btrim(coalesce(p_company, '')), 120), ''),
    nullif(left(btrim(coalesce(p_subject, '')), 1000), ''),
    nullif(left(btrim(coalesce(p_preferred_date, '')), 20), ''),
    nullif(left(btrim(coalesce(p_amenity, '')), 80), ''),
    nullif(left(btrim(coalesce(p_source_path, '')), 200), ''),
    nullif(left(btrim(coalesce(p_ip_hash, '')), 128), ''),
    nullif(left(btrim(coalesce(p_user_agent, '')), 300), ''),
    CASE WHEN v_spam THEN 'spam' ELSE 'new' END,
    v_spam,
    v_reasons
  )
  RETURNING id INTO v_id;

  -- Always return success shape; spam rows are stored but hidden from ops queues.
  RETURN jsonb_build_object(
    'ok', true,
    'id', v_id,
    'message', 'Thank you! Our team will contact you within 24 hours.'
  );
END;
$$;

REVOKE ALL ON FUNCTION public.submit_public_lead FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_public_lead TO anon, authenticated;

-- ── Testimonials ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  text text NOT NULL,
  image text,
  rating int NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (btrim(name) <> ''),
  CHECK (btrim(text) <> '')
);

CREATE INDEX IF NOT EXISTS idx_testimonials_published
  ON public.testimonials (is_published, sort_order, created_at DESC);

CREATE OR REPLACE FUNCTION public.set_testimonials_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_testimonials_updated_at ON public.testimonials;
CREATE TRIGGER trg_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION public.set_testimonials_updated_at();

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published testimonials" ON public.testimonials;
CREATE POLICY "Public read published testimonials"
  ON public.testimonials
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

DROP POLICY IF EXISTS "Admins manage testimonials" ON public.testimonials;
CREATE POLICY "Admins manage testimonials"
  ON public.testimonials
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

INSERT INTO public.testimonials (name, role, text, image, rating, sort_order) VALUES
  ('Gyanendra Pratap Singh', 'Eclat Health Solutions', 'NeoHub gives our team a professional base in Gomti Nagar with reliable infrastructure and meeting rooms that are always client-ready.', '/assets/testimg3_98d93f4b.png', 5, 1),
  ('Suraj Singh', 'Zomato', 'The workstations and conference facilities make day-to-day operations smooth. NeoHub is a strong coworking partner for our Lucknow team.', '/assets/testimg2_9ded9eee.png', 5, 2),
  ('Vikas', 'Infoedge', 'We get the privacy of cabin space with the flexibility of a managed coworking setup. Support from the NeoHub team has been consistent.', '/assets/testimg1_4d709d5b.png', 5, 3),
  ('Manwar', 'Tata Play', 'From dedicated desks to conference bookings, NeoHub covers everything our team needs without the overhead of a traditional office lease.', '/assets/testimg4_89125531.png', 5, 4),
  ('Vikramjeet Singh', 'EKA Mobility', 'Scaling our seating across NeoHub locations has been straightforward. The spaces are professional, well-connected, and ready for growth.', '/assets/testimg3_98d93f4b.png', 5, 5)
ON CONFLICT DO NOTHING;

-- ── Blog CMS write access for admins ───────────────────────────────────────
DROP POLICY IF EXISTS "Admins manage blog_post" ON public.blog_post;
CREATE POLICY "Admins manage blog_post"
  ON public.blog_post
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins manage blog_category" ON public.blog_category;
CREATE POLICY "Admins manage blog_category"
  ON public.blog_category
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

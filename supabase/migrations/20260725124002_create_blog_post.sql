-- NeoHub blog: Athrise-style published posts with SEO/AIO fields.
-- Public site reads published rows via anon key + RLS.

CREATE TABLE IF NOT EXISTS public.blog_category (
  slug text PRIMARY KEY,
  label text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  CHECK (btrim(label) <> '')
);

CREATE TABLE IF NOT EXISTS public.blog_post (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL,
  title text NOT NULL,
  excerpt text,
  body_html text NOT NULL,
  cover_image_url text,
  cover_image_alt text,
  author text NOT NULL DEFAULT 'NeoHub Team',
  tags text[] NOT NULL DEFAULT '{}',
  categories text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  meta_title text,
  meta_description text,
  og_image_url text,
  canonical_url text,
  focus_keyword text,
  noindex boolean NOT NULL DEFAULT false,
  reading_time_min int,
  CHECK (btrim(slug) <> ''),
  CHECK (btrim(title) <> ''),
  CHECK (btrim(body_html) <> ''),
  CHECK (status IN ('draft', 'published'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_post_slug_unique
  ON public.blog_post (lower(slug))
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_blog_post_published
  ON public.blog_post (status, published_at DESC)
  WHERE deleted_at IS NULL;

CREATE OR REPLACE FUNCTION public.set_blog_post_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_blog_post_updated_at ON public.blog_post;
CREATE TRIGGER trg_blog_post_updated_at
  BEFORE UPDATE ON public.blog_post
  FOR EACH ROW
  EXECUTE FUNCTION public.set_blog_post_updated_at();

ALTER TABLE public.blog_category ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read blog_category" ON public.blog_category;
CREATE POLICY "Public read blog_category"
  ON public.blog_category
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public read published blog_post" ON public.blog_post;
CREATE POLICY "Public read published blog_post"
  ON public.blog_post
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published' AND deleted_at IS NULL);

INSERT INTO public.blog_category (slug, label) VALUES
  ('coworking', 'Coworking'),
  ('pricing', 'Pricing'),
  ('workspaces', 'Workspaces'),
  ('meeting-rooms', 'Meeting Rooms'),
  ('startups', 'Startups'),
  ('lucknow', 'Lucknow')
ON CONFLICT (slug) DO NOTHING;

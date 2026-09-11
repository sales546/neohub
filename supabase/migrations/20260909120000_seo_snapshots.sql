-- Cached Google Search Console snapshots for the admin Growth dashboard.
-- Public has no access. Admins read/write via is_admin().

CREATE TABLE IF NOT EXISTS public.seo_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL DEFAULT 'gsc',
  fetched_at timestamptz NOT NULL DEFAULT now(),
  payload jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_seo_snapshots_source_fetched
  ON public.seo_snapshots (source, fetched_at DESC);

ALTER TABLE public.seo_snapshots ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins manage seo_snapshots" ON public.seo_snapshots;
CREATE POLICY "Admins manage seo_snapshots"
  ON public.seo_snapshots
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

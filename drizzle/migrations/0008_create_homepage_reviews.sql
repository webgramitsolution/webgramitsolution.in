CREATE TABLE public.homepage_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_role text NOT NULL DEFAULT '',
  company_name text NOT NULL DEFAULT '',
  review_text text NOT NULL,
  rating smallint NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  avatar_url text,
  is_published boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.homepage_reviews TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.homepage_reviews TO authenticated;
GRANT ALL ON public.homepage_reviews TO service_role;

ALTER TABLE public.homepage_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published homepage reviews"
ON public.homepage_reviews
FOR SELECT
TO anon, authenticated
USING (is_published = true OR public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins manage homepage reviews"
ON public.homepage_reviews
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

INSERT INTO public.homepage_reviews (customer_name, customer_role, company_name, review_text, rating, display_order)
VALUES
  ('Aarav Mehta', 'Founder', 'Mehta Retail', 'Webgram turned our online store into a faster, clearer buying experience. The team understood our commercial goals and delivered with care.', 5, 1),
  ('Nisha Kapoor', 'Operations Head', 'Northline Distribution', 'Our ordering workflow is now much easier for customers and our internal team. Communication and post-launch support have been excellent.', 5, 2),
  ('Rohit Verma', 'Director', 'Verma Manufacturing', 'The new B2B platform gives buyers the pricing, catalogue and enquiry tools they need while saving our team hours every week.', 5, 3);
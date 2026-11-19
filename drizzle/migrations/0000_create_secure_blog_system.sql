CREATE TYPE public.app_role AS ENUM ('admin', 'editor');
CREATE TYPE public.blog_status AS ENUM ('draft', 'published');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  display_name text NOT NULL DEFAULT '',
  avatar_url text,
  preferences jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;
CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text NOT NULL DEFAULT '',
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_categories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.blog_categories TO authenticated;
GRANT ALL ON public.blog_categories TO service_role;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active categories" ON public.blog_categories FOR SELECT TO anon, authenticated USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage categories" ON public.blog_categories FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (char_length(title) BETWEEN 3 AND 180),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  excerpt text NOT NULL CHECK (char_length(excerpt) BETWEEN 10 AND 500),
  content text NOT NULL,
  featured_image text,
  featured_image_alt text NOT NULL DEFAULT '',
  category_id uuid REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  author_id uuid,
  author_name text NOT NULL DEFAULT 'Webgram Team',
  status public.blog_status NOT NULL DEFAULT 'draft',
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published posts" ON public.blog_posts FOR SELECT TO anon, authenticated USING (status = 'published' AND published_at IS NOT NULL AND published_at <= now());
CREATE POLICY "Admins can read all posts" ON public.blog_posts FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can create posts" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin') AND author_id = auth.uid());
CREATE POLICY "Admins can update posts" ON public.blog_posts FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete posts" ON public.blog_posts FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX blog_posts_public_feed_idx ON public.blog_posts (status, published_at DESC);
CREATE INDEX blog_posts_category_idx ON public.blog_posts (category_id, published_at DESC);

INSERT INTO public.blog_categories (name, slug, description, display_order) VALUES
('Ecommerce', 'ecommerce', 'Practical strategies for modern online stores.', 1),
('Technology', 'technology', 'Platforms, integrations and engineering insights.', 2),
('Business Growth', 'business-growth', 'Ideas for acquiring customers and scaling operations.', 3);

INSERT INTO public.blog_posts (title, slug, excerpt, content, featured_image, featured_image_alt, category_id, author_name, status, seo_title, seo_description, published_at) VALUES
('How to Build an Ecommerce Website That Converts', 'how-to-build-an-ecommerce-website-that-converts', 'A practical guide to planning a fast, trustworthy ecommerce experience that turns more visitors into customers.', 'A successful ecommerce website is more than a digital catalog. It combines clear product discovery, persuasive product pages, dependable payments and a smooth checkout into one focused customer journey.\n\n## Start with the buying journey\n\nMap how customers discover products, compare options and make a decision. Navigation, filters and search should reduce effort at every step.\n\n## Build trust before checkout\n\nShow clear pricing, delivery expectations, return policies and genuine customer proof. Trust signals work best when they answer a real concern close to the purchase decision.\n\n## Keep performance measurable\n\nTrack page speed, conversion rate, cart abandonment and repeat purchases. Use these signals to improve the store continuously instead of treating launch day as the finish line.', 'https://ik.imagekit.io/home1/home%20page/Ecommerce%20Development.png', 'Ecommerce storefront displayed on a laptop and phone', (SELECT id FROM public.blog_categories WHERE slug = 'ecommerce'), 'Webgram Team', 'published', 'How to Build an Ecommerce Website That Converts', 'Learn the essential steps for creating a fast, trustworthy and conversion-focused ecommerce website.', now() - interval '3 days'),
('Why API Integration Matters for Growing Businesses', 'why-api-integration-matters-for-growing-businesses', 'Discover how connecting your website, CRM, payments and logistics reduces manual work and supports scalable growth.', 'Growing businesses often lose time when teams copy information between disconnected tools. API integration creates a dependable flow of information across the systems that run sales and operations.\n\n## Remove repetitive work\n\nOrders can move automatically from the storefront to inventory, logistics and accounting. This reduces errors and gives teams more time for higher-value work.\n\n## Create one reliable view\n\nConnected systems make it easier to understand stock, customers, payments and fulfilment without assembling reports by hand.\n\n## Design for change\n\nA thoughtful integration layer makes it easier to add a new payment provider, delivery partner or business application as requirements evolve.', 'https://ik.imagekit.io/home1/home%20page/Api%20integration%20page.png', 'Connected business platforms and API integrations', (SELECT id FROM public.blog_categories WHERE slug = 'technology'), 'Webgram Team', 'published', 'Why API Integration Matters for Growing Businesses', 'See how secure API integration reduces manual work and connects the systems behind business growth.', now() - interval '8 days'),
('B2B Commerce Features Buyers Now Expect', 'b2b-commerce-features-buyers-now-expect', 'From customer-specific pricing to quick reorder, these are the capabilities modern wholesale buyers expect online.', 'B2B customers increasingly expect the convenience of consumer ecommerce without losing the pricing, approval and ordering rules their businesses require.\n\n## Personalised accounts and pricing\n\nEach buyer should see relevant catalogs, contract pricing, tax rules and payment terms after signing in.\n\n## Faster repeat ordering\n\nQuick order forms, saved lists and order history help regular buyers complete complex purchases with fewer steps.\n\n## Support real buying teams\n\nRole-based approvals, quote requests and shared company accounts allow purchasing teams to work together without relying on email and spreadsheets.', 'https://ik.imagekit.io/home1/home%20page/B2B%20Commerce.png', 'B2B commerce and wholesale ordering workflow', (SELECT id FROM public.blog_categories WHERE slug = 'business-growth'), 'Webgram Team', 'published', 'B2B Commerce Features Buyers Now Expect', 'Explore the account, pricing and ordering features that create a better B2B buying experience.', now() - interval '14 days');
ALTER TABLE public.blog_categories DROP CONSTRAINT blog_categories_name_key;
CREATE UNIQUE INDEX blog_categories_root_name_unique ON public.blog_categories (lower(name)) WHERE parent_id IS NULL;
CREATE UNIQUE INDEX blog_categories_child_name_unique ON public.blog_categories (parent_id, lower(name)) WHERE parent_id IS NOT NULL;
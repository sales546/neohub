export type BlogCategory = {
  slug: string;
  label: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body_html: string;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  author: string | null;
  tags: string[];
  categories: string[];
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  canonical_url: string | null;
  focus_keyword: string | null;
  noindex: boolean;
  reading_time_min: number | null;
};

export type BlogPostCard = Pick<
  BlogPost,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "cover_image_url"
  | "cover_image_alt"
  | "author"
  | "tags"
  | "categories"
  | "published_at"
  | "updated_at"
  | "reading_time_min"
>;

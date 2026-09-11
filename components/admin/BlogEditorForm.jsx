"use client";

export default function BlogEditorForm({ action, post, defaults }) {
  const values = {
    title: post?.title || defaults?.title || "",
    slug: post?.slug || defaults?.slug || "",
    excerpt: post?.excerpt || defaults?.excerpt || "",
    body_html: post?.body_html || defaults?.body_html || "",
    cover_image_url: post?.cover_image_url || defaults?.cover_image_url || "/assets/blog-covers/neohub-gomti-nagar-hub.webp",
    author: post?.author || defaults?.author || "NeoHub Team",
    status: post?.status || defaults?.status || "draft",
    meta_title: post?.meta_title || defaults?.meta_title || "",
    meta_description: post?.meta_description || defaults?.meta_description || "",
    focus_keyword: post?.focus_keyword || defaults?.focus_keyword || "",
  };

  return (
    <form action={action} className="nh-card nh-stack">
      {post?.id ? <input type="hidden" name="id" value={post.id} /> : null}
      {defaults?.focus_keyword ? (
        <p className="nh-flash nh-flash--quiet">
          Prefilling from keyword “{defaults.focus_keyword}”. Edit the outline, then save as draft.
        </p>
      ) : null}
      <div className="nh-field">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" defaultValue={values.title} required />
      </div>
      <div className="nh-field">
        <label htmlFor="slug">Slug</label>
        <input id="slug" name="slug" defaultValue={values.slug} placeholder="auto-from-title-if-empty" />
      </div>
      <div className="nh-field">
        <label htmlFor="excerpt">Excerpt</label>
        <textarea id="excerpt" name="excerpt" defaultValue={values.excerpt} />
      </div>
      <div className="nh-field">
        <label htmlFor="body_html">Body HTML</label>
        <textarea id="body_html" name="body_html" defaultValue={values.body_html} required style={{ minHeight: 280 }} />
      </div>
      <div className="nh-field">
        <label htmlFor="cover_image_url">Cover image URL</label>
        <input id="cover_image_url" name="cover_image_url" defaultValue={values.cover_image_url} />
      </div>
      <div className="nh-field">
        <label htmlFor="author">Author</label>
        <input id="author" name="author" defaultValue={values.author} />
      </div>
      <div className="nh-field">
        <label htmlFor="status">Status</label>
        <select id="status" name="status" defaultValue={values.status}>
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
      </div>
      <div className="nh-field">
        <label htmlFor="meta_title">Meta title</label>
        <input id="meta_title" name="meta_title" defaultValue={values.meta_title} />
      </div>
      <div className="nh-field">
        <label htmlFor="meta_description">Meta description</label>
        <textarea id="meta_description" name="meta_description" defaultValue={values.meta_description} />
      </div>
      <div className="nh-field">
        <label htmlFor="focus_keyword">Focus keyword</label>
        <input id="focus_keyword" name="focus_keyword" defaultValue={values.focus_keyword} />
      </div>
      <button className="nh-btn nh-btn-primary" type="submit">
        Save post
      </button>
    </form>
  );
}

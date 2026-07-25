"use client";

export default function BlogEditorForm({ action, post }) {
  return (
    <form action={action} className="nh-card nh-stack">
      {post?.id ? <input type="hidden" name="id" value={post.id} /> : null}
      <div className="nh-field">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" defaultValue={post?.title || ""} required />
      </div>
      <div className="nh-field">
        <label htmlFor="slug">Slug</label>
        <input id="slug" name="slug" defaultValue={post?.slug || ""} placeholder="auto-from-title-if-empty" />
      </div>
      <div className="nh-field">
        <label htmlFor="excerpt">Excerpt</label>
        <textarea id="excerpt" name="excerpt" defaultValue={post?.excerpt || ""} />
      </div>
      <div className="nh-field">
        <label htmlFor="body_html">Body HTML</label>
        <textarea id="body_html" name="body_html" defaultValue={post?.body_html || ""} required style={{ minHeight: 280 }} />
      </div>
      <div className="nh-field">
        <label htmlFor="cover_image_url">Cover image URL</label>
        <input id="cover_image_url" name="cover_image_url" defaultValue={post?.cover_image_url || "/assets/blog-covers/neohub-gomti-nagar-hub.webp"} />
      </div>
      <div className="nh-field">
        <label htmlFor="author">Author</label>
        <input id="author" name="author" defaultValue={post?.author || "NeoHub Team"} />
      </div>
      <div className="nh-field">
        <label htmlFor="status">Status</label>
        <select id="status" name="status" defaultValue={post?.status || "draft"}>
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
      </div>
      <div className="nh-field">
        <label htmlFor="meta_title">Meta title</label>
        <input id="meta_title" name="meta_title" defaultValue={post?.meta_title || ""} />
      </div>
      <div className="nh-field">
        <label htmlFor="meta_description">Meta description</label>
        <textarea id="meta_description" name="meta_description" defaultValue={post?.meta_description || ""} />
      </div>
      <div className="nh-field">
        <label htmlFor="focus_keyword">Focus keyword</label>
        <input id="focus_keyword" name="focus_keyword" defaultValue={post?.focus_keyword || ""} />
      </div>
      <button className="nh-btn nh-btn-primary" type="submit">Save post</button>
    </form>
  );
}

type BlogPostBodyProps = {
  html: string;
};

export default function BlogPostBody({ html }: BlogPostBodyProps) {
  return (
    <div
      className="neo-blog-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

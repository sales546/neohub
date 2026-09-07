import Link from "next/link";

/**
 * `as` lets pages that already render their own <h1> (blog index, articles)
 * drop the banner to a non-heading element instead of emitting a second H1.
 * Styling follows the `title-box-heading` class, not the tag.
 */
export default function PageBanner({ title, breadcrumbLabel, as: Heading = "h1" }) {
  const label = breadcrumbLabel || title;

  return (
    <div
      className="title-box"
      style={{ backgroundImage: "url('/assets/banner_f797f160.webp')" }}
    >
      <div className="container">
        <div className="banner-heading">
          <Heading className="title-box-heading align-self-center">{title}</Heading>
          <div className="breadcrums text-center">
            <Link href="/">
              <i className="fa fa-home"></i> Home /
            </Link>{" "}
            <span> {label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

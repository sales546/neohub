import Link from "next/link";

export default function PageBanner({ title, breadcrumbLabel }) {
  const label = breadcrumbLabel || title;

  return (
    <div
      className="title-box"
      style={{ backgroundImage: "url('/assets/banner_f797f160.png')" }}
    >
      <div className="container">
        <div className="banner-heading">
          <h1 className="align-self-center">{title}</h1>
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

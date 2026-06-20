import PageBanner from "@/components/PageBanner";
import { galleryImages } from "@/lib/siteData";

export const metadata = {
  title: "Office Gallery & Virtual Tour | NeoHub Coworking Lucknow",
  description: "Take a tour of our office space. See high-resolution images of our workspaces, conference rooms, hot desks, and private office cabins in Cyber Heights.",
};

export default function GalleryPage() {
  return (
    <>
      <PageBanner title="Gallery" />

      <div className="gallery-page">
        <div className="container" data-aos="fade-right">
          <div className="col-12 mt-md-5 mb-md-5 gallery-outer">
            {galleryImages.map((image) => (
              <div className="gallery_page_front" key={image.src}>
                <a href={image.src} className="gallery-page-link" title={image.alt}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <span className="home-gallery-zoom" aria-hidden="true">
                    <i className="fas fa-search-plus"></i>
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

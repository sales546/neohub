import PageBanner from "@/components/PageBanner";
import SiteImage from "@/components/SiteImage";
import { galleryImages } from "@/lib/siteData";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata = constructMetadata({
  title: "Office Gallery & Workspace Tour",
  description:
    "Browse NeoHub's office gallery — workspaces, conference rooms, hot desks, and private cabins at Levana Cyber Heights, Gomti Nagar, Lucknow.",
  canonical: "/gallery",
  ogSubtitle: "See the NeoHub coworking experience",
  ogImage: "/assets/slider1_0fe6417c.webp",
  keywords: ["neohub gallery", "coworking office photos lucknow", "cyber heights office tour"],
});

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
                  <SiteImage src={image.src} alt={image.alt} width={900} height={700} sizes="(max-width: 768px) 100vw, 50vw" />
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

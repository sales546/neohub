import Link from "next/link";
import { homeGalleryImages, buildPlanWhatsAppUrl } from "@/lib/siteData";

export default function HomeGallery() {
  return (
    <section id="Our_gallery" className="home-gallery-section position-relative">
      <div className="container position-relative">
        <div className="col-12 gallery-outer pb-xl-4">
          <div id="gallery" className="home-gallery-grid">
            <div className="gallery-head-outer-box">
              <div className="gallery-head-box heading-box text-md-start text-center">
                <h6>Gallery</h6>
                <h3 className="blog-main-heading align-self-center">
                  Join Co-Working Space Today and Elevate Your Work Experience!
                </h3>
                <p className="home-gallery-lead">
                  Explore our private cabins, open desks, and meeting rooms at Levana Cyber Heights, Gomti Nagar.
                </p>
                <div className="gallery-button-box d-flex flex-wrap gap-2 justify-content-md-start justify-content-center">
                  <a
                    className="gallery-btn btn mt-lg-3 mt-2"
                    href={buildPlanWhatsAppUrl("workspace tour")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a Tour
                  </a>
                  <Link className="gallery-btn gallery-btn--outline btn mt-lg-3 mt-2" href="/gallery">
                    View Full Gallery
                  </Link>
                </div>
              </div>
            </div>

            {homeGalleryImages.map((image, index) => (
              <a
                key={image.src}
                href={image.src}
                className={`home-gallery-link home-gallery-item home-gallery-item--${index + 1}`}
                title={image.alt}
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
                <span className="home-gallery-zoom" aria-hidden="true">
                  <i className="fas fa-search-plus"></i>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

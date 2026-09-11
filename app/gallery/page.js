import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import SiteImage from "@/components/SiteImage";
import { galleryImages, neoHubAddresses, siteContact } from "@/lib/siteData";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata = constructMetadata({
  title: "NeoHub Office Gallery | Cyber Heights, Bhavya & Experion",
  description:
    "Tour photos of NeoHub’s Gomti Nagar centres — private cabins, open desks, and conference rooms at Cyber Heights, Bhavya, and Experion.",
  canonical: "/gallery",
  absoluteTitle: true,
  ogSubtitle: "See the NeoHub coworking experience",
  ogImage: "/assets/slider1_0fe6417c.webp",
  keywords: ["neohub gallery", "coworking office photos lucknow", "cyber heights office tour"],
});

export default function GalleryPage() {
  return (
    <>
      <PageBanner title="NeoHub Workspace Gallery — Gomti Nagar" breadcrumbLabel="Gallery" />

      <div className="gallery-page">
        <div className="container">
          <header className="gallery-page-intro">
            <h2 className="about-main-heading">What a NeoHub floor looks like</h2>
            <p>
              These photos are from NeoHub’s Gomti Nagar centres: lounges, open desks, lockable
              cabins, and meeting rooms. A tour is still the honest way to check noise, daylight,
              and whether the cabin you want is free this month. Call{" "}
              <a href={`tel:${siteContact.phoneTel}`}>{siteContact.phone}</a> or write to{" "}
              <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>.
            </p>
            <p>
              Inventory sits in three buildings in Vibhuti Khand. Hours and starting rates differ
              by floor — Cyber Heights is a daytime centre, Bhavya is the 24-hour floor, Experion
              runs into the evening. Compare them in{" "}
              <Link href="/blog/neohub-locations-cyber-heights-bhavya-experion">
                Cyber Heights, Bhavya, and Experion
              </Link>{" "}
              before you pick a pin on Maps.
            </p>
          </header>

          <div className="col-12 mt-md-4 mb-md-5 gallery-outer">
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

          <section className="gallery-centres" aria-labelledby="gallery-centres-heading">
            <h2 id="gallery-centres-heading" className="about-main-heading">
              Three centres, one operator
            </h2>
            <p>
              Use the photos to get a sense of finish. Use the centre pages for address, seats,
              and published desk or cabin rates. Meeting rooms are booked by the hour — see{" "}
              <Link href="/blog/meeting-rooms-conference-booking-gomti-nagar">
                meeting room booking in Gomti Nagar
              </Link>
              .
            </p>
            <ul className="gallery-centre-list">
              {neoHubAddresses.map((location) => (
                <li key={location.id}>
                  <h3>
                    {location.pagePath ? (
                      <Link href={location.pagePath}>{location.shortName || location.name}</Link>
                    ) : (
                      location.name
                    )}
                  </h3>
                  <p>
                    {location.seats ? `${location.seats} seats. ` : null}
                    {location.hours ? `${location.hours}. ` : null}
                    {location.address}
                  </p>
                </li>
              ))}
            </ul>
            <p className="gallery-page-cta">
              <Link href="/contact">Book a walkthrough</Link>
              {" · "}
              <Link href="/spaces">See plans and spaces</Link>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

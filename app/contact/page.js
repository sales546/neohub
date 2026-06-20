import PageBanner from "@/components/PageBanner";
import ContactForm from "@/components/ContactForm";
import { siteContact, neoHubAddresses } from "@/lib/siteData";

export const metadata = {
  title: "Contact Us & Book a Free Tour | NeoHub Lucknow",
  description:
    "Visit NeoHub coworking centres at Levana Cyber Heights, Bhavya Corporate Tower, and Experion in Gomti Nagar, Lucknow. Book a tour or enquire about pricing.",
};

const LocationIcon = () => (
  <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8.77778 21C12.6667 17 16.5556 13.4182 16.5556 9C16.5556 4.58172 13.0733 1 8.77778 1C4.48223 1 1 4.58172 1 9C1 13.4182 4.88889 17 8.77778 21Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.77776 12.1111C10.6188 12.1111 12.1111 10.6188 12.1111 8.77779C12.1111 6.93685 10.6188 5.44446 8.77776 5.44446C6.93676 5.44446 5.44443 6.93685 5.44443 8.77779C5.44443 10.6188 6.93676 12.1111 8.77776 12.1111Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ContactPage() {
  return (
    <>
      <PageBanner title="Contact" />

      <section id="Get-Contact" style={{ position: "relative" }}>
        <div className="container">
          <div className="row contact-page-row">
            <div className="col-lg-6 col-md-6 contact-info-column order-lg-1 order-2">
              <div className="contact-page-card neo-form-card">
                <h3 className="neo-form-card-title">Contact Information</h3>
                <p className="neo-form-subtitle">
                  Have questions about pricing, office availability, or custom layouts? Our space manager will contact you within 24 hours.
                </p>

                <div className="contact-cta-links">
                  <a className="contact-cta-link" href={`tel:${siteContact.phoneTel}`}>
                    <span className="contact-cta-icon" aria-hidden="true">
                      <svg width="18" height="17" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.3204 21.9147C15.0872 21.3795 10.5154 19.8707 6.37071 15.9063C2.22608 11.9418 0.648696 7.56881 0.08917 5.4327C-0.232375 4.20511 0.346652 3.02052 1.32846 2.34972L3.90233 0.591165C5.40833 -0.43777 7.50337 -0.0886167 8.55682 1.36688L10.1772 3.60573C10.8651 4.55608 10.6278 5.85863 9.64447 6.53047L8.35241 7.41326C8.54796 8.12873 9.15616 9.59803 11.0609 11.42C12.9657 13.2419 14.5018 13.8236 15.2498 14.0107L16.1727 12.7748C16.8751 11.8343 18.2369 11.6073 19.2304 12.2652L21.571 13.8152C23.0926 14.8229 23.4577 16.8267 22.3819 18.2673L20.5435 20.7293C19.8421 21.6684 18.6038 22.2223 17.3204 21.9147ZM7.93412 14.4108C11.7032 18.016 15.8626 19.3851 17.8577 19.8633C18.1493 19.9331 18.5018 19.8247 18.7443 19.5L20.5828 17.038C20.9413 16.5579 20.8197 15.89 20.3124 15.554L17.9719 14.004L16.9814 15.3304C16.5767 15.8724 15.8282 16.2975 14.9566 16.1176C13.8688 15.8931 11.8579 15.1731 9.49755 12.9154C7.1372 10.6577 6.38446 8.73421 6.14974 7.6937C5.96169 6.86002 6.40615 6.14404 6.9728 5.75688L8.35938 4.80953L6.73895 2.57068C6.38779 2.08551 5.68945 1.96913 5.18745 2.31211L2.61358 4.07066C2.27414 4.30256 2.16082 4.63978 2.23388 4.91871C2.73377 6.82711 4.16506 10.8056 7.93412 14.4108Z" fill="currentColor" />
                      </svg>
                    </span>
                    <span>{siteContact.phone}</span>
                  </a>
                  <a className="contact-cta-link" href={`mailto:${siteContact.email}`}>
                    <span className="contact-cta-icon" aria-hidden="true">
                      <svg width="18" height="15" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5.07143L8.26656 10.0023C9.97727 11.1631 10.8327 11.7436 11.7571 11.9691C12.5741 12.1683 13.4259 12.1683 14.2429 11.9691C15.1673 11.7436 16.0228 11.1631 17.7335 10.0023L25 5.07143M5.26667 20H20.7333C22.2268 20 22.9736 20 23.544 19.7041C24.0457 19.444 24.4537 19.0287 24.7093 18.518C25 17.9374 25 17.1773 25 15.6571V5.34286C25 3.82272 25 3.06264 24.7093 2.48203C24.4537 1.97129 24.0457 1.55606 23.544 1.29584C22.9736 1 22.2268 1 20.7333 1H5.26667C3.7732 1 3.02645 1 2.45603 1.29584C1.95425 1.55606 1.54631 1.97129 1.29065 2.48203C1 3.06264 1 3.82271 1 5.34286V15.6571C1 17.1773 1 17.9374 1.29065 18.518C1.54631 19.0287 1.95425 19.444 2.45603 19.7041C3.02645 20 3.77319 20 5.26667 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>{siteContact.email}</span>
                  </a>
                </div>

                <div className="contact-addresses-block">
                  <h4 className="contact-page-section-label">NeoHub Locations</h4>
                  <ul className="contact-address-list">
                    {neoHubAddresses.map((location) => (
                      <li key={location.id}>
                        <a
                          id={`location-${location.id}`}
                          href={location.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`contact-address-item contact-address-link${location.isPrimary ? " is-primary" : ""}`}
                        >
                          <div className="contact-address-icon">
                            <LocationIcon />
                          </div>
                          <div className="contact-address-body">
                            <strong>{location.name}</strong>
                            {location.rating ? (
                              <span className="contact-address-rating">{location.rating}</span>
                            ) : null}
                            <p>{location.address}</p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-12 contact-form-column order-lg-2 order-1">
              <div className="contact-page-card neo-form-card">
                <h3 className="neo-form-card-title">Send us a message</h3>
                <p className="neo-form-subtitle">Share your requirements and our team will reach out within 24 hours.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
        <div className="contact-bg-colr"></div>
      </section>

      <section className="contact-maps-section">
        <div className="container">
          <div className="contact-maps-grid">
            {neoHubAddresses.map((location) => (
              <div key={location.id} className="contact-map-card">
                <h5 className="contact-map-card-title">{location.name}</h5>
                <div className="contact-map-wrap">
                  <iframe
                    width="100%"
                    height="320"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${location.name} map`}
                    src={location.mapEmbedUrl}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import { neoHubAddresses } from "@/lib/siteData";

const LocationIcon = () => (
  <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8.77778 21C12.6667 17 16.5556 13.4182 16.5556 9C16.5556 4.58172 13.0733 1 8.77778 1C4.48223 1 1 4.58172 1 9C1 13.4182 4.88889 17 8.77778 21Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.77776 12.1111C10.6188 12.1111 12.1111 10.6188 12.1111 8.77779C12.1111 6.93685 10.6188 5.44446 8.77776 5.44446C6.93676 5.44446 5.44443 6.93685 5.44443 8.77779C5.44443 10.6188 6.93676 12.1111 8.77776 12.1111Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function NeoHubLocations({ showMaps = false, title = "NeoHub Locations" }) {
  return (
    <>
      <div className="neo-locations-block">
        <h2 className="seo-card-title">{title}</h2>
        <p className="neo-locations-note">Tap a location to open directions in Google Maps.</p>
        <ul className="contact-address-list">
          {neoHubAddresses.map((location) => (
            <li key={location.id}>
              <a
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

      {showMaps ? (
        <div className="neo-locations-maps">
          <div className="contact-maps-grid">
            {neoHubAddresses.map((location) => (
              <div key={location.id} className="contact-map-card">
                <h5 className="contact-map-card-title">{location.name}</h5>
                <div className="contact-map-wrap">
                  <iframe
                    width="100%"
                    height="280"
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
      ) : null}
    </>
  );
}

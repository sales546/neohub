import Link from "next/link";
import { neoHubAddresses, siteContact } from "@/lib/siteData";

const WHATSAPP_ROOM_URL =
  "https://wa.me/917000481286?text=Hi%20NeoHub%2C%20I%20want%20to%20book%20a%20meeting%20room%20in%20Gomti%20Nagar.";
const WHATSAPP_TOUR_URL =
  "https://wa.me/917000481286?text=Hi%20NeoHub%2C%20I%20would%20like%20to%20book%20a%20tour%20of%20your%20coworking%20space.";

export default function MeetingRoomsExtras() {
  return (
    <>
      <div className="seo-card">
        <h2 className="seo-card-title">Capacities</h2>
        <div className="seo-intent-grid">
          <div className="seo-intent-card">
            <h3>Meeting cabins — 4–8</h3>
            <p>
              Acoustic cabins for interviews, video calls, and small client huddles. Book by the
              hour; tell us headcount so we assign the right room.
            </p>
          </div>
          <div className="seo-intent-card">
            <h3>Conference layouts — 8–20</h3>
            <p>
              Larger rooms for board reviews and workshops. Half-day conference packages start at
              ₹7,500 for four hours at Cyber Heights and Bhavya. Ask on tour for Experion.
            </p>
          </div>
        </div>
      </div>

      <div className="seo-card">
        <h2 className="seo-card-title">How to book</h2>
        <p>
          Members and non-members book the same way. Same-day is possible if the calendar is open;
          reserve at least 24 hours ahead for investor or client meetings. Parking is available —
          ask on the tour which basement or ground-level bays apply to your centre.
        </p>
        <ul className="seo-related-list">
          <li>
            Call <a href={`tel:${siteContact.phoneTel}`}>{siteContact.phone}</a>
          </li>
          <li>
            <Link href="/contact">Send the contact form</Link>
          </li>
          <li>
            <a href={WHATSAPP_ROOM_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp a room request
            </a>
          </li>
        </ul>
      </div>

      <div className="seo-card">
        <h2 className="seo-card-title">Rooms at each centre</h2>
        <div className="seo-intent-grid">
          {neoHubAddresses.map((centre) => (
            <div key={centre.id} className="seo-intent-card">
              <h3>
                <Link href={centre.pagePath}>{centre.shortName}</Link>
              </h3>
              <p>
                {centre.seats} seats · {centre.hours} · rooms from ₹{centre.pricing.conference}/hr
              </p>
              <p>
                <a href={centre.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  Google Maps
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="seo-cta-row">
        <a
          href={WHATSAPP_ROOM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="seo-cta-btn"
        >
          Book a room
        </a>
        <a
          href={WHATSAPP_TOUR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="seo-cta-btn seo-cta-btn-ghost"
        >
          Book a free tour
        </a>
        <Link href="/contact" className="seo-cta-btn seo-cta-btn-ghost">
          Contact form
        </Link>
      </div>
    </>
  );
}

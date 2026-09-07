"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main id="main-content">{children}</main>;
  }

  return (
    <>
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="neo-main">
        <div
          key={pathname}
          className={pathname === "/" ? undefined : "neo-page-enter"}
        >
          {children}
        </div>
      </main>
      <Footer />
      <a
        href="https://wa.me/917000481286?text=Hello%20NeoHub%2C%20I%20would%20like%20to%20know%20more%20about%20the%20coworking%20spaces!"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-widget"
        aria-label="Chat on WhatsApp"
      >
        <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.118-2.905-6.993-1.876-1.875-4.357-2.906-6.993-2.907-5.439 0-9.865 4.42-9.87 9.867-.001 1.7.452 3.361 1.311 4.8l-.348 1.272.378-.372 1.315-1.272.438.223zM16.518 13.9c-.247-.125-1.47-.724-1.696-.807-.226-.083-.39-.125-.555.125-.164.249-.64.807-.784.973-.145.166-.29.187-.537.062-.247-.125-1.045-.385-1.99-1.23-.736-.656-1.233-1.466-1.378-1.715-.145-.249-.015-.383.109-.507.112-.112.247-.29.37-.436.125-.145.166-.249.249-.415.083-.166.042-.311-.02-.436-.062-.125-.555-1.338-.76-1.834-.2-.486-.42-.421-.577-.428-.15-.006-.322-.007-.495-.007-.172 0-.455.065-.693.303-.238.238-.91.888-.91 2.166 0 1.278.93 2.515 1.06 2.69 1.135 1.517 2.148 2.37 3.86 2.94 1.385.46 2.052.42 2.673.328.694-.103 1.47-.6 1.677-1.18.207-.579.207-1.077.145-1.18-.063-.104-.227-.146-.475-.27z" />
        </svg>
        <span className="tooltip-text">Chat on WhatsApp</span>
      </a>
    </>
  );
}

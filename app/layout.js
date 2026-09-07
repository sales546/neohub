import "./globals.css";
import LegacyStyles from "@/components/LegacyStyles";
import LegacyScripts from "@/components/LegacyScripts";
import SiteChrome from "@/components/SiteChrome";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import Analytics from "@/components/seo/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { rootMetadata } from "@/lib/seo/metadata";

export const metadata = rootMetadata();

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <LegacyStyles />
        <link rel="preload" href="/assets/slider1_0fe6417c.webp" as="image" fetchPriority="high" />
      </head>
      <body>
        <noscript>
          <style>{`html body { visibility: visible !important; }`}</style>
        </noscript>
        <LocalBusinessSchema />
        <SiteChrome>{children}</SiteChrome>
        <LegacyScripts />
        <Analytics />
        <VercelAnalytics />
        <style dangerouslySetInnerHTML={{ __html: `
          .whatsapp-widget {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background-color: #25D366;
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            z-index: 99999;
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .whatsapp-widget:hover {
            transform: scale(1.1);
            background-color: #20ba5a;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
            color: #fff;
          }
          .whatsapp-widget svg {
            fill: #fff;
          }
          .whatsapp-widget::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
            animation: whatsapp-pulse 1.8s infinite;
            pointer-events: none;
          }
          @keyframes whatsapp-pulse {
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
          }
          .whatsapp-widget .tooltip-text {
            visibility: hidden;
            width: 130px;
            background-color: #333;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 6px 10px;
            position: absolute;
            z-index: 100000;
            right: 75px;
            top: 50%;
            transform: translateY(-50%);
            opacity: 0;
            transition: opacity 0.3s;
            font-family: sans-serif;
            font-size: 13px;
            font-weight: 500;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          }
          .whatsapp-widget .tooltip-text::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 100%;
            margin-top: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent transparent #333;
          }
          .whatsapp-widget:hover .tooltip-text {
            visibility: visible;
            opacity: 1;
          }
          #return-to-top {
            bottom: 105px !important;
          }
          @media (prefers-reduced-motion: reduce) {
            .whatsapp-widget::after { animation: none; }
            .whatsapp-widget:hover { transform: none; }
          }
        `}} />
      </body>
    </html>
  );
}

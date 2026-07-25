import { Outfit } from "next/font/google";
import AdminBodyClass from "@/components/admin/AdminBodyClass";
import { constructMetadata } from "@/lib/seo/metadata";
import "./admin.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = constructMetadata({
  title: "NeoHub Admin",
  description: "Private NeoHub content and leads console.",
  canonical: "/admin",
  absoluteTitle: true,
  noIndex: true,
});

export default function AdminLayout({ children }) {
  return (
    <div className={`nh-admin-root ${outfit.className}`}>
      <AdminBodyClass />
      {children}
    </div>
  );
}

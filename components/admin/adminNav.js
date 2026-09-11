import {
  IconBlogs,
  IconGrowth,
  IconLeads,
  IconOverview,
  IconQuotes,
} from "@/components/admin/AdminIcons";

export const ADMIN_NAV_GROUPS = [
  {
    id: "ops",
    label: "Operations",
    items: [
      { href: "/admin", label: "Overview", icon: IconOverview, exact: true },
      { href: "/admin/leads", label: "Leads", icon: IconLeads },
      { href: "/admin/blogs", label: "Blogs", icon: IconBlogs },
      { href: "/admin/testimonials", label: "Testimonials", icon: IconQuotes },
    ],
  },
  {
    id: "growth",
    label: "Growth",
    items: [{ href: "/admin/growth", label: "SEO & keywords", icon: IconGrowth }],
  },
];

export const ADMIN_JUMP_ITEMS = [
  { href: "/admin", label: "Overview", hint: "Leads, drafts, today’s move" },
  { href: "/admin/leads", label: "Leads", hint: "Tours and contact messages" },
  { href: "/admin/blogs", label: "Blogs", hint: "SEO posts" },
  { href: "/admin/blogs/new", label: "New blog post", hint: "Write", icon: "plus" },
  { href: "/admin/testimonials", label: "Testimonials", hint: "Homepage quotes" },
  { href: "/admin/growth", label: "SEO & keywords", hint: "Health, gaps, campaign kits" },
  { href: "/", label: "View website", hint: "neohubspaces.in", external: true },
];

export function headerMeta(pathname) {
  if (pathname === "/admin") return { kicker: "Operations", title: "Overview" };
  if (pathname.startsWith("/admin/leads")) return { kicker: "Operations", title: "Leads" };
  if (pathname === "/admin/blogs/new") return { kicker: "Operations", title: "New post" };
  if (pathname.startsWith("/admin/blogs/")) return { kicker: "Operations", title: "Edit post" };
  if (pathname.startsWith("/admin/blogs")) return { kicker: "Operations", title: "Blogs" };
  if (pathname.startsWith("/admin/testimonials")) return { kicker: "Operations", title: "Testimonials" };
  if (pathname.startsWith("/admin/growth")) return { kicker: "Growth", title: "SEO & keywords" };
  return { kicker: "NeoHub", title: "Admin" };
}

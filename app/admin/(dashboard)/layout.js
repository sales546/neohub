import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin";

export default async function AdminDashboardLayout({ children }) {
  const { admin } = await requireAdmin();
  return <AdminShell email={admin.email}>{children}</AdminShell>;
}

import { Suspense } from "react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="nh-login"><div className="nh-login-card">Loading…</div></div>}>
      <AdminLoginForm />
    </Suspense>
  );
}

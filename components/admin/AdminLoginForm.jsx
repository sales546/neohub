"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { validateAdminLogin } from "@/lib/formValidation";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState(
    searchParams.get("error") === "unauthorized" ? "This account is not an admin." : ""
  );
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    const validation = validateAdminLogin({ email, password });
    if (!validation.ok) {
      setFieldErrors(validation.errors);
      setError(validation.formError);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    const supabase = createClient();
    const { data, error: signError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (signError) {
      setError(signError.message);
      setLoading(false);
      return;
    }

    const { data: admin } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (!admin) {
      await supabase.auth.signOut();
      setError("This account is not authorized for NeoHub admin.");
      setLoading(false);
      return;
    }

    router.replace(searchParams.get("next") || "/admin");
    router.refresh();
  }

  return (
    <div className="nh-login">
      <form className="nh-login-card" onSubmit={onSubmit} noValidate>
        <img src="/assets/logo_67f6779b.png" alt="NeoHub" width={120} height={28} style={{ height: 28, width: "auto", marginBottom: 18 }} />
        <h1>Admin sign in</h1>
        <p>Manage leads, blogs, and testimonials for neohubspaces.in</p>
        {error ? <div className="nh-error" role="alert">{error}</div> : null}
        <div className="nh-field">
          <label htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: "" }));
            }}
            autoComplete="username"
            maxLength={160}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "admin-email-error" : undefined}
          />
          {fieldErrors.email ? (
            <span id="admin-email-error" className="neo-field-error">{fieldErrors.email}</span>
          ) : null}
        </div>
        <div className="nh-field">
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: "" }));
            }}
            autoComplete="current-password"
            minLength={8}
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={fieldErrors.password ? "admin-password-error" : undefined}
          />
          {fieldErrors.password ? (
            <span id="admin-password-error" className="neo-field-error">{fieldErrors.password}</span>
          ) : null}
        </div>
        <button
          className="nh-btn nh-btn-primary"
          type="submit"
          disabled={loading}
          style={{ width: "100%", justifyContent: "center" }}
        >
          {loading ? "Signing in..." : "Enter dashboard"}
        </button>
      </form>
    </div>
  );
}

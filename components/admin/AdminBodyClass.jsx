"use client";

import { useEffect } from "react";

export default function AdminBodyClass() {
  useEffect(() => {
    document.body.classList.add("nh-admin-active");
    return () => document.body.classList.remove("nh-admin-active");
  }, []);

  return null;
}

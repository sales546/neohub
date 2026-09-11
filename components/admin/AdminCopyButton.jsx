"use client";

import { useState } from "react";
import { IconCopy } from "@/components/admin/AdminIcons";

export default function AdminCopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" className="nh-btn nh-btn-secondary nh-btn-compact" onClick={copy}>
      <IconCopy />
      {copied ? "Copied" : label}
    </button>
  );
}

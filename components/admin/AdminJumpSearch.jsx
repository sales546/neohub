"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ADMIN_JUMP_ITEMS } from "@/components/admin/adminNav";
import { IconSearch } from "@/components/admin/AdminIcons";

export default function AdminJumpSearch() {
  const router = useRouter();
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKey(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    if (open) {
      if (!node.open) node.showModal();
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (node.open) {
      node.close();
    }
  }, [open]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return ADMIN_JUMP_ITEMS;
    return ADMIN_JUMP_ITEMS.filter((item) =>
      `${item.label} ${item.hint}`.toLowerCase().includes(needle),
    );
  }, [query]);

  function go(item) {
    setOpen(false);
    if (item.external) {
      window.open(item.href, "_blank", "noreferrer");
      return;
    }
    router.push(item.href);
  }

  return (
    <>
      <button type="button" className="nh-jump-trigger" onClick={() => setOpen(true)}>
        <IconSearch />
        <span>Jump to</span>
        <kbd>⌘K</kbd>
      </button>

      <dialog
        ref={dialogRef}
        className="nh-jump-dialog"
        aria-label="Jump to page"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setOpen(false);
        }}
      >
        <form
          className="nh-jump-box"
          onSubmit={(event) => {
            event.preventDefault();
            if (results[0]) go(results[0]);
          }}
        >
          <div className="nh-jump-input-wrap">
            <IconSearch />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Leads, blogs, SEO, new post…"
              aria-label="Jump to"
            />
          </div>
          <ul className="nh-jump-list">
            {results.length ? (
              results.map((item) => (
                <li key={item.href}>
                  <button type="button" onClick={() => go(item)}>
                    <strong>{item.label}</strong>
                    <span>{item.hint}</span>
                  </button>
                </li>
              ))
            ) : (
              <li className="nh-jump-empty">No matches.</li>
            )}
          </ul>
        </form>
      </dialog>
    </>
  );
}

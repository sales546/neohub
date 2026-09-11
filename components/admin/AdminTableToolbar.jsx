"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconSearch } from "@/components/admin/AdminIcons";

export default function AdminTableToolbar({
  searchPlaceholder = "Search",
  searchParam = "q",
  filters = [],
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get(searchParam) || "");

  useEffect(() => {
    setQuery(searchParams.get(searchParam) || "");
  }, [searchParams, searchParam]);

  function replaceParams(mutate) {
    const next = new URLSearchParams(searchParams.toString());
    mutate(next);
    next.delete("page");
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  useEffect(() => {
    const handle = setTimeout(() => {
      const current = searchParams.get(searchParam) || "";
      if (query.trim() === current) return;
      replaceParams((next) => {
        if (query.trim()) next.set(searchParam, query.trim());
        else next.delete(searchParam);
      });
    }, 280);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- debounce query only
  }, [query]);

  return (
    <div className="nh-table-toolbar">
      <label className="nh-table-search">
        <IconSearch />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
        />
      </label>
      <div className="nh-table-filters">
        {filters.map((filter) => (
          <label key={filter.name} className="nh-table-filter">
            <span>{filter.label}</span>
            <select
              value={searchParams.get(filter.name) || filter.defaultValue || "all"}
              onChange={(event) =>
                replaceParams((next) => {
                  const value = event.target.value;
                  if (!value || value === "all") next.delete(filter.name);
                  else next.set(filter.name, value);
                })
              }
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
  );
}

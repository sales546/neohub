import Link from "next/link";
import { withParams } from "@/lib/admin/listParams";

export default function AdminSortHeader({
  label,
  column,
  currentSort,
  currentDir,
  basePath,
  current = {},
}) {
  const active = currentSort === column;
  const nextDir = active && currentDir === "desc" ? "asc" : "desc";
  return (
    <th aria-sort={active ? (currentDir === "asc" ? "ascending" : "descending") : "none"}>
      <Link
        className={`nh-sort ${active ? "is-active" : ""}`}
        href={withParams(basePath, current, { sort: column, dir: nextDir, page: 1 })}
      >
        {label}
        <span aria-hidden="true">{active ? (currentDir === "asc" ? "↑" : "↓") : ""}</span>
      </Link>
    </th>
  );
}

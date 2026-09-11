import { Suspense } from "react";
import AdminPagination from "@/components/admin/AdminPagination";
import AdminTableToolbar from "@/components/admin/AdminTableToolbar";

export default function AdminDataTable({
  searchPlaceholder,
  filters,
  total,
  page,
  pageSize,
  basePath,
  current,
  empty,
  filtered,
  children,
}) {
  const hasRows = total > 0;

  return (
    <div className="nh-card nh-table-card">
      <Suspense fallback={<div className="nh-table-toolbar" aria-hidden="true" />}>
        <AdminTableToolbar searchPlaceholder={searchPlaceholder} filters={filters} />
      </Suspense>
      {!hasRows ? (
        <p className="nh-empty">{filtered ? "No rows match these filters." : empty}</p>
      ) : (
        <>
          <div className="nh-table-wrap">{children}</div>
          <AdminPagination
            total={total}
            page={page}
            pageSize={pageSize}
            basePath={basePath}
            current={current}
          />
        </>
      )}
    </div>
  );
}

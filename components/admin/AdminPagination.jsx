import Link from "next/link";
import { pageCount, PAGE_SIZE, withParams } from "@/lib/admin/listParams";

export default function AdminPagination({
  total,
  page,
  pageSize = PAGE_SIZE,
  basePath,
  current = {},
}) {
  const pages = pageCount(total, pageSize);
  if (total <= pageSize) {
    return (
      <div className="nh-table-foot">
        <span>
          {total} {total === 1 ? "result" : "results"}
        </span>
      </div>
    );
  }

  return (
    <div className="nh-table-foot">
      <span>
        {total} results · page {page} of {pages}
      </span>
      <div className="nh-actions">
        {page > 1 ? (
          <Link className="nh-btn nh-btn-secondary" href={withParams(basePath, current, { page: page - 1 })}>
            Previous
          </Link>
        ) : (
          <span className="nh-btn nh-btn-secondary" aria-disabled="true">
            Previous
          </span>
        )}
        {page < pages ? (
          <Link className="nh-btn nh-btn-secondary" href={withParams(basePath, current, { page: page + 1 })}>
            Next
          </Link>
        ) : (
          <span className="nh-btn nh-btn-secondary" aria-disabled="true">
            Next
          </span>
        )}
      </div>
    </div>
  );
}

export function formatBlogDate(iso: string | null | undefined) {
  if (!iso) return { day: "", month: "", full: "" };
  const date = new Date(iso);
  return {
    day: date.toLocaleDateString("en-IN", { day: "2-digit" }),
    month: date.toLocaleDateString("en-IN", { month: "short" }),
    full: date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}

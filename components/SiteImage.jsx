import Image from "next/image";

/**
 * next/image wrapper for local /assets and configured remote hosts.
 * Decorative images must pass alt="" (and get aria-hidden).
 */
export default function SiteImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  preload = false,
  loading = undefined,
  decoding = undefined,
  sizes = undefined,
  className = undefined,
  style = undefined,
  quality = undefined,
}) {
  const decorative = alt === "";
  // Next.js 16 deprecates `priority` in favor of `preload`. Keep both so
  // existing callers still work, and never pass loading with preload.
  const shouldPreload = Boolean(preload || priority);
  const common = {
    src,
    alt,
    className,
    style,
    quality,
    preload: shouldPreload || undefined,
    loading: shouldPreload ? undefined : loading,
    decoding,
    sizes,
    "aria-hidden": decorative ? true : undefined,
  };

  if (fill) {
    return <Image {...common} fill />;
  }

  return <Image {...common} width={width} height={height} />;
}

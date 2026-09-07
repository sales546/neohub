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
  sizes,
  className,
  style,
  quality,
}) {
  const decorative = alt === "";
  const common = {
    src,
    alt,
    className,
    style,
    quality,
    priority,
    sizes,
    "aria-hidden": decorative ? true : undefined,
  };

  if (fill) {
    return <Image {...common} fill />;
  }

  return <Image {...common} width={width} height={height} />;
}

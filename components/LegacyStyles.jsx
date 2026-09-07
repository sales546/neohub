import { LEGACY_STYLESHEETS } from "@/lib/legacyAssets";

/** One stylesheet link. Extra preload / noscript / print-swap copies
 *  were showing up four times in production HTML. */
export default function LegacyStyles() {
  return (
    <>
      {LEGACY_STYLESHEETS.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
    </>
  );
}

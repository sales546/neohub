import { LEGACY_STYLESHEETS } from "@/lib/legacyAssets";

export default function LegacyStyles() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
      />
      {LEGACY_STYLESHEETS.map((href) => (
        <link key={href} rel="preload" href={href} as="style" />
      ))}
      {LEGACY_STYLESHEETS.map((href) => (
        <link
          key={`${href}-sheet`}
          rel="stylesheet"
          href={href}
          media="print"
          data-legacy-css=""
        />
      ))}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "document.querySelectorAll('link[data-legacy-css]').forEach(function(l){l.media='all'});",
        }}
      />
      <noscript>
        {LEGACY_STYLESHEETS.map((href) => (
          <link key={`${href}-ns`} rel="stylesheet" href={href} />
        ))}
      </noscript>
    </>
  );
}

import { submitIndexNow } from "../lib/seo/indexnow";

const BASE = "https://www.neohubspaces.in";

const URLS = [
  "/",
  "/blog",
  "/blog/coworking-near-hazratganj-lucknow-commute",
  "/blog/24-hour-coworking-lucknow-bhavya-tower",
  "/blog/virtual-office-gst-registration-lucknow-guide",
  "/blog/best-coworking-spaces-in-lucknow-2026",
  "/levana-cyber-heights",
  "/bhavya-corporate-tower",
  "/experion",
  "/office-space-for-rent-lucknow",
  "/managed-office-gomti-nagar",
  "/gst-registration-lucknow",
  "/company-registration-lucknow",
  "/virtual-office",
  "/sitemap.xml",
].map((path) => `${BASE}${path === "/" ? "/" : path}`);

// Apex too — Google still has a stale Maine snippet on this host.
URLS.unshift("https://neohubspaces.in/");

async function main() {
  const apex = URLS.filter((u) => u.startsWith("https://neohubspaces.in"));
  const www = URLS.filter((u) => u.startsWith("https://www.neohubspaces.in"));
  const wwwResult = await submitIndexNow(www, "www.neohubspaces.in");
  console.log("www", wwwResult);
  const apexResult = await submitIndexNow(apex, "neohubspaces.in");
  console.log("apex", apexResult);
  if (!wwwResult.ok && !wwwResult.skipped) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

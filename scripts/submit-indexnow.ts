import { submitIndexNow } from "../lib/seo/indexnow";

const BASE = "https://www.neohubspaces.in";

const URLS = [
  "/",
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

async function main() {
  const result = await submitIndexNow(URLS);
  console.log(result);
  if (!result.ok && !result.skipped) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

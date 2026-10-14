// Builds the text of robots.txt and sitemap.xml.
// The sitemap list comes from src/data/seo.js, so when you add a page there,
// it appears in the sitemap automatically.

import { site } from "../../src/data/site.js";
import { pageSeo } from "../../src/data/seo.js";

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildRobotsTxt() {
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/", // the contact form URL is not a page for Google
    "",
    `Sitemap: ${site.url}/sitemap.xml`,
    "",
  ].join("\n");
}

export function buildSitemapXml() {
  const urls = Object.entries(pageSeo)
    // Leave out any page marked sitemap: false (e.g. a "thank you" page — see data/seo.js)
    .filter(([, seo]) => seo.sitemap !== false)
    .map(([path]) => `  <url>\n    <loc>${escapeXml(site.url + path)}</loc>\n  </url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

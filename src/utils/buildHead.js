// Builds the <head> tags (SEO) for a page. This runs on the SERVER,
// so the tags are inside the HTML that Google receives.
//
// It creates: title, description, canonical URL, Open Graph (Facebook, LinkedIn, WhatsApp...),
// Twitter/X card, and the JSON-LD schema.

import { site } from "../data/site.js";
import { pageSeo, notFoundSeo } from "../data/seo.js";
import { cleanPath } from "./cleanPath.js";
import { buildSchema } from "./buildSchema.js";

// Makes text safe to place inside an HTML attribute
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Makes JSON safe to place inside a <script> tag ("<" could otherwise close the tag)
function safeJson(object) {
  return JSON.stringify(object).replace(/</g, "\\u003c");
}

export function buildHead(url) {
  const path = cleanPath(url);
  const seo = pageSeo[path];

  // Unknown URL = 404 page. Tell Google not to index it.
  if (!seo) {
    const title = escapeHtml(notFoundSeo.title);
    const description = escapeHtml(notFoundSeo.description);
    return {
      status: 404,
      head: `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="noindex" />`,
    };
  }

  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  const canonical = escapeHtml(`${site.url}${path}`);
  const image = escapeHtml(`${site.url}${site.ogImage}`);
  const imageAlt = escapeHtml(site.ogImageAlt);
  // Every normal page is indexable unless the page itself says otherwise (see data/seo.js)
  const robots = escapeHtml(seo.robots || "index, follow");

  const head = `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${canonical}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(site.name)}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${imageAlt}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${imageAlt}" />

    <script type="application/ld+json">${safeJson(buildSchema(path))}</script>`;

  return { status: 200, head };
}

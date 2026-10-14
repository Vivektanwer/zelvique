// Builds the "structured data" (schema.org JSON-LD) for a page.
// Google reads it to understand who we are and what we offer.
// It runs on the SERVER, so it is inside the HTML that Google receives.
//
// What each page gets:
//   every page     -> Organization (+ ProfessionalService if a real address is set in data/site.js)
//   Home           -> WebSite
//   inner pages    -> BreadcrumbList (matches the visible breadcrumbs)
//   Services page  -> one Service item for every service in data/services.js

import { site } from "../data/site.js";
import { pageSeo } from "../data/seo.js";
import { services } from "../data/services.js";

const organizationId = `${site.url}/#organization`;

// site.social entries with no url yet are kept out of the schema
function socialUrls() {
  return site.social.filter((entry) => entry.url).map((entry) => entry.url);
}

// True only if a real address was filled in (street, city and country are the minimum)
function hasAddress() {
  const { street, city, country } = site.address;
  return Boolean(street && city && country);
}

function buildOrganization() {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    url: site.url,
    description: site.tagline,
    email: site.email,
    logo: {
      "@type": "ImageObject",
      url: `${site.url}${site.logo}`,
      width: 512,
      height: 512,
    },
    // Optional parts are added only when they are filled in
    ...(site.phone && { telephone: site.phone }),
    ...(socialUrls().length > 0 && { sameAs: socialUrls() }),
  };
}

// Only used when a real business address exists
function buildLocalBusiness() {
  const { street, city, region, postalCode, country } = site.address;
  return {
    "@type": "ProfessionalService", // a type of LocalBusiness
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    url: site.url,
    image: `${site.url}${site.ogImage}`,
    email: site.email,
    ...(site.phone && { telephone: site.phone }),
    address: {
      "@type": "PostalAddress",
      streetAddress: street,
      addressLocality: city,
      ...(region && { addressRegion: region }),
      ...(postalCode && { postalCode }),
      addressCountry: country,
    },
    parentOrganization: { "@id": organizationId },
  };
}

function buildWebSite() {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": organizationId },
  };
}

function buildBreadcrumbs(path) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: pageSeo[path].name, item: `${site.url}${path}` },
    ],
  };
}

function buildServices() {
  return services.map((service) => ({
    "@type": "Service",
    "@id": `${site.url}/services#${service.slug}`,
    name: service.title,
    serviceType: service.title,
    description: service.what,
    url: `${site.url}/services#${service.slug}`,
    provider: { "@id": organizationId },
  }));
}

// Returns the full schema object for a page path like "/about" (or null if the page is unknown)
export function buildSchema(path) {
  if (!pageSeo[path]) return null;

  const graph = [buildOrganization()];
  if (hasAddress()) graph.push(buildLocalBusiness());

  if (path === "/") {
    graph.push(buildWebSite());
  } else {
    graph.push(buildBreadcrumbs(path));
  }

  if (path === "/services") {
    graph.push(...buildServices());
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

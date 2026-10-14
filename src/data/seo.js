// SEO title + description for every page.
// The server puts these into the HTML, so Google can read them without running JavaScript.
// Tip: keep titles under 60 characters and descriptions under 160.
//
// Each page can set:
//   name        short page name used in breadcrumbs (Home / About)
//   title       browser tab title + Google search result title
//   description Google search result description
//   robots      OPTIONAL. What search engines should do with this page.
//               Leave it out for a normal page (it defaults to "index, follow" — please index this page).
//               Use "noindex, follow" for pages with no unique content of their own, like a
//               "thank you" page after a form — this keeps it OUT of Google search results.
//   sitemap     OPTIONAL. Set to false to leave a page out of sitemap.xml (used together with
//               "noindex, follow" above, since a page told not to be indexed should not be listed either).
//
// This list also builds sitemap.xml, so a new page only needs to be added here to appear in it
// (unless you set sitemap: false).

export const pageSeo = {
  "/": {
    name: "Home",
    title: "Zelvique | Website Design & Digital Marketing Agency",
    description:
      "Zelvique designs, builds and improves websites, then helps you reach more customers with digital marketing. Start a project today.",
  },
  "/about": {
    name: "About",
    title: "About Zelvique | Our Story, Mission and Values",
    description:
      "Learn who Zelvique is, what we believe, and how we help businesses grow with better websites and smarter digital marketing.",
  },
  "/services": {
    name: "Services",
    title: "Website & Digital Marketing Services | Zelvique",
    description:
      "Website design, development, redesign, mobile optimization, UI/UX, performance and digital marketing services from Zelvique.",
  },
  "/work": {
    name: "Work",
    title: "Our Work | Website Projects & Case Studies | Zelvique",
    description:
      "See how Zelvique helps businesses get better results with new websites, redesigns and digital marketing. Browse our projects.",
  },
  "/contact": {
    name: "Contact",
    title: "Contact Zelvique | Start a Project",
    description:
      "Tell us about your business and goals. Contact Zelvique to get a free consultation on your website or digital marketing.",
  },
  "/thank-you": {
    name: "Thank You",
    title: "Thank You | Zelvique",
    description: "Thank you for contacting Zelvique. We have received your message.",
    // This page only appears after submitting the form, is the same for everyone, and has
    // no content of its own worth showing in search results — so it is kept out of Google
    // and out of the sitemap, to avoid confusing visitors who find it through a search.
    robots: "noindex, follow",
    sitemap: false,
  },
};

// Used when a visitor opens a URL that does not exist
export const notFoundSeo = {
  title: "Page not found | Zelvique",
  description: "This page could not be found. Go back to the Zelvique home page.",
};

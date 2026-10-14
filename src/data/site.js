// Basic website information in ONE place.
// Change something here and it updates everywhere (pages, emails, SEO tags, schema).

export const site = {
  name: "Zelvique",
  url: "https://zelvique.com", // no slash at the end
  email: "vivektanwer648@gmail.com", // shown on the site AND where leads are emailed (Apps Script sends here)
  phone: "+91 93104 79781",
  tagline: "Websites and digital marketing that help your business grow.",

  // Images used for Google and social media (files are in the "public" folder)
  logo: "/logo.png", // square logo, at least 112 x 112 pixels
  ogImage: "/og-image.png", // picture shown when a link is shared (1200 x 630 pixels)
  ogImageAlt: "Zelvique: a website that works as hard as you do",

  // Your social media page links. Icons only appear for entries where "url" is filled in,
  // so leave "url" as "" for any platform you do not use yet.
  // TODO: replace these "" URLs with your real profile links.
  social: [
    { platform: "instagram", label: "Instagram", icon: "bi-instagram", url: "" },
    { platform: "linkedin", label: "LinkedIn", icon: "bi-linkedin", url: "" },
    { platform: "facebook", label: "Facebook", icon: "bi-facebook", url: "" },
    { platform: "twitter", label: "X (Twitter)", icon: "bi-twitter-x", url: "" },
  ],

  // LocalBusiness schema is only added when you fill in a REAL public business address.
  // If you work online only and have no public address, leave everything empty.
  address: {
    street: "",
    city: "",
    region: "", // state
    postalCode: "",
    country: "", // two-letter code, for example "IN"
  },
};

// Links shown in the Navbar and Footer
export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Contact", to: "/contact" },
];

# Zelvique website

Modern digital agency website. Built with Vite, React, React Router (the "react-router" package), Tailwind CSS, GSAP, Lenis and Express (server-side rendering).

## How to run it

You need Node.js 20 or newer (check with `node -v`).

```bash
npm install        # 1. install packages (only the first time)
npm run dev        # 2. start the website, then open http://localhost:3000
```

To test the production version:

```bash
npm run build      # creates the "dist" folder
npm start          # runs the built website
```

## Folder guide

```text
src/
  components/   Small reusable pieces used on more than one page (Navbar, Footer, Button,
                ServiceCard, ProjectCard, FAQItem, CTASection, Breadcrumbs, ...)
  pages/        One short file per page. Each page is just a list of its sections, in order.
  sections/     The actual content of each page, one file per section, grouped in a folder per page:
                  home/     Hero, Trusted, About, Services, WhyChoose, Process, FeaturedWork,
                            Results, Testimonials, FAQ
                  about/    AboutHero, Story, MissionVision, Values, Approach, WhyWorkWithUs
                  services/ ServicesIntro, ServiceDetail (one service), ServicesList (all of them)
                  work/     WorkIntro, CaseStudy (one project), CaseStudyList (all of them)
                  contact/  ContactIntro, ContactDetails, ContactForm, ContactFormSection, ContactFAQSection
  data/         Simple lists you can edit (services, projects, testimonials, FAQs, SEO text, site info)
  hooks/        Small helper functions for React (page title, scroll, smooth scroll, animations)
  utils/        Plain helper functions (SEO tags, schema builder, form validation, animation helpers)
  style.css     ONLY colors and fonts
  entry-client.jsx  Starts the website in the BROWSER (hydration)
  entry-server.jsx  Starts the website on the SERVER (SSR)
server/
  server.js         Express server: SSR pages + the /api routes
  routes/           URLs of the API (POST /api/contact)
  controllers/      What happens when the form is sent (validate, save, email)
  services/         appsScriptService.js — sends the lead to your Google Apps Script
  utils/            Email texts, date/time, rate limiter, robots.txt + sitemap.xml builders
  Code.gs           Paste this into script.google.com (Apps Script) — see SETUP-BACKEND.md
```

To change what a page SHOWS (add/remove a section, reorder sections): edit the short file in
`src/pages/`. To change what is INSIDE a section (its text or layout): open its file in
`src/sections/<page>/`. The 8 services and the projects still come from `src/data/services.js` and
`src/data/projects.js` — you never need to touch the section files to add one.

## Easy edits

- Change the business email, phone number, website URL, tagline or social media links: `src/data/site.js`
- Change a page title or description for Google: `src/data/seo.js`
- Change the picture shown when a link is shared (WhatsApp, LinkedIn, X): replace `public/og-image.png` (1200 x 630 pixels)
- Add your address / social links for Google: `src/data/site.js` (see the SEO section below)
- Add or remove a service: `src/data/services.js`
- Edit About page text (story, mission, values): `src/data/about.js`
- Edit a service (text, what is included): `src/data/services.js` (the Services page updates by itself)
- Add a project (the Work page updates by itself): `src/data/projects.js`
- Add a real project screenshot: put the JPG/WebP in `public/images/work/` and set `image` in `src/data/projects.js`
- Add a testimonial: `src/data/testimonials.js`
- Edit FAQ questions (Home and Contact pages): `src/data/faqs.js`
- Change the contact form rules (what is required, error messages): `src/utils/validateContactForm.js` (used by the browser AND the server)
- Change the email texts: `server/utils/emailTemplates.js`
- Edit Home page text (process steps, statistics, reasons): `src/data/home.js`
- Change the order of Home page sections: `src/pages/HomePage.jsx`
- Change a brand color or a font: `src/style.css`

## Rules used in this project

- All styling uses Tailwind classes. `style.css` only holds colors and fonts.
- Layouts use Flexbox only. No CSS Grid.
- No SVG in our own code. Every icon is a Bootstrap Icons font glyph (loaded via CDN in `index.html`,
  e.g. `<i className="bi bi-envelope-fill"></i>`), and the favicon is a PNG.
- Secrets (passwords, keys) live in `.env` on the server. Never in React code.
  Copy `.env.example` to `.env` and fill in your values.

## Placeholder content (replace before launch)

The projects, testimonials and statistics are SAMPLE content used to build the design.
Search the code for `TODO` and replace them with real information.

## Contact form (Google Sheet + emails, via Google Apps Script)

The contact form sends the lead to a small Google Apps Script, which saves a row in your
Google Sheet and sends both emails (to you and to the visitor) from your own Gmail account.
Follow **SETUP-BACKEND.md** to deploy `server/Code.gs` and fill in your `.env` file
(`GOOGLE_SCRIPT_URL` and `APPS_SCRIPT_SECRET`). No SMTP password and no Google Cloud service
account are needed. The form shows a friendly error message if the script or a step inside it fails.

## SEO (search engine optimization)

Everything below is created on the SERVER, so it is inside the HTML that Google receives.
It does not depend on JavaScript running in the browser.

| What | Where |
| --- | --- |
| Title, description, canonical URL, Open Graph, Twitter/X tags | `src/utils/buildHead.js` (text comes from `src/data/seo.js`) |
| Schema (structured data): Organization, WebSite, Service, BreadcrumbList | `src/utils/buildSchema.js` |
| `robots.txt` and `sitemap.xml` | `server/utils/seoFiles.js` (served at `/robots.txt` and `/sitemap.xml`) |
| Breadcrumbs shown on inner pages | `src/components/Breadcrumbs.jsx` |
| `/about/` redirects to `/about` (one address per page) | `server/server.js` |
| Unknown URLs give a real 404 page with `noindex` | `src/utils/buildHead.js` |

**Add a new page:** add it to `src/data/seo.js` (title, description, name). It is then included in the
sitemap and breadcrumbs automatically. Also add the route in `src/App.jsx`.

**Control search engines per page:** each entry in `src/data/seo.js` can set `robots` (defaults to
`"index, follow"` — please index this page) and `sitemap` (defaults to `true`). The Thank You page
(shown after the contact form) sets `robots: "noindex, follow"` and `sitemap: false`, because it has
no content of its own and should never appear in a Google search — copy that pattern for any other
page that should stay out of search results (an internal/testing page, for example).

**LocalBusiness schema** is only added if you fill in a REAL public business address in `src/data/site.js`.
Google requires a real address for it, so it stays off until you add one. Also add your `phone` and
your `social` profile links there when you have them.

**Before launch (TODO):**
- Replace `public/og-image.png` with a designed image that uses the Instrument Sans font.
  The current one is a simple placeholder made with a substitute font.
- Check `site.url` in `src/data/site.js` is your final address (with https).
- After the site is online: add the site in Google Search Console, submit
  `https://zelvique.com/sitemap.xml`, and test a page with Google's "Rich Results Test".

## Animations (GSAP + Lenis)

Animations are added with small `data-` attributes in the page files. You do not need to write any
GSAP code to use them:

| Attribute | What it does |
| --- | --- |
| `data-hero` | Slides up when the page opens. Put it on the first few elements of a page (heading, text, buttons). |
| `data-reveal` | Fades and slides up when the visitor scrolls to it. |
| `data-reveal="image"` | Same as above, but fades in while growing slightly (for pictures). |
| `data-count` | A number like `"50+"` counts up when it scrolls into view. |
| `data-parallax="40"` | Moves slowly while scrolling (the number is pixels). |
| `data-float` | Floats up and down gently, forever. |
| `data-magnetic` | A button leans a little towards the mouse (desktop only). |

How it stays safe:

- **GSAP and Lenis only run in the browser.** They are loaded with `import()` inside `useEffect`, so
  the server (SSR) never touches them and can never break because of them.
- **`prefers-reduced-motion` is respected everywhere.** If the visitor's device asks for less motion,
  no animation and no smooth scrolling starts, and everything appears normally.
- **Nothing stays invisible.** `data-hero` and `data-reveal` elements start hidden only through a class
  added by a tiny script in `index.html`. If GSAP fails to load (slow network, blocked file), that same
  script removes the class again after 5 seconds, and every element shows.
- **The mobile menu and FAQ accordion still work without GSAP.** They already have a plain CSS
  animation; GSAP only makes it smoother once it has loaded.

To add a new animated section: copy the pattern used in an existing page (for example
`data-reveal` on a `<SectionHeading>` or on a card's wrapping `<li>`) — the logic lives in
`src/hooks/useAnimations.js` and needs no changes.

## Icons

Every icon on the site is a [Bootstrap Icons](https://icons.getbootstrap.com) glyph, loaded once via
a `<link>` in `index.html` (no npm package, no SVG files). To use one anywhere:

```jsx
<i className="bi bi-envelope-fill"></i>
```

Browse the full icon list on the Bootstrap Icons website and copy the class name shown under each
icon. Service icons live in `src/data/services.js` (`icon: "bi-..."`); most others are written
directly in the component or section file that uses them.

## Contact form flow (Thank You page)

After a successful submission, the visitor is sent to a dedicated **Thank You page**
(`src/pages/ThankYouPage.jsx`, at `/thank-you`) instead of an inline message. That page:

- Shows the same "Submitted successfully!" message
- Counts down and automatically returns to the Home page after 5 seconds
- Also has a "Go to Home Now" button, for anyone who does not want to wait (or whose
  browser blocks automatic navigation)
- Is set to `robots: "noindex, follow"` and left out of `sitemap.xml` (see the SEO section
  above), since it is the same page for everyone and has no content worth showing in search

To change the wait time, edit `REDIRECT_SECONDS` at the top of `src/pages/ThankYouPage.jsx`.

## Performance

| Area | What is done |
| --- | --- |
| **Compression** | Every response (HTML, CSS, JS, JSON) is gzip/brotli-compressed by the server (`server/server.js`, the `compression` package) |
| **Caching** | Built JS/CSS files have a content hash in their name, so they are cached by the browser for a full year; everything else uses a short cache (`server/server.js`) |
| **Code splitting** | React, React DOM and React Router are bundled separately from the site's own code (`vite.config.js`), so a future update to the site does not force visitors to re-download React too |
| **Animations load lazily** | GSAP and Lenis are only downloaded once the page is already visible, and never on the server (`src/utils/animationLibs.js`) — they cannot slow down the first paint |
| **Images** | Every real `<img>` (project screenshots, testimonial photos) uses `loading="lazy"` and sets `width`/`height`, so the browser can skip downloading off-screen images and never has to reflow the page once they load |
| **Fonts** | Google Fonts are loaded with `preconnect` and `display=swap`, so text is never invisible while a font downloads |
| **CSS** | Tailwind only ships the classes actually used in the project (nothing unused) |
| **SSR** | Every page's HTML is fully built on the server, so content is visible immediately, before any JavaScript runs |

To check the real numbers for your own build, run `npm run build && npm start`, then test a page
with Chrome DevTools' **Lighthouse** tab (Performance) or https://pagespeed.web.dev.

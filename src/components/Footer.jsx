// The dark footer shown on every page.
// 4 balanced columns on wide screens: Brand+contact+social, Company, Services (split into
// two halves so 8 items do not make one column much taller than the others).

import { Link } from "react-router";
import Container from "./Container.jsx";
import Logo from "./Logo.jsx";
import { site, navLinks } from "../data/site.js";
import { services } from "../data/services.js";

// Same style for every footer link
const footerLinkClasses =
  "text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

// Contact rows (icon + value). Phone only shows if site.phone is filled in.
function contactRows() {
  const rows = [{ icon: "bi-envelope-fill", href: `mailto:${site.email}`, label: site.email }];
  if (site.phone) {
    rows.push({ icon: "bi-telephone-fill", href: `tel:${site.phone.replace(/\s/g, "")}`, label: site.phone });
  }
  return rows;
}

// Split the services list into two even halves, so two short columns replace one tall one
function splitInHalf(list) {
  const middle = Math.ceil(list.length / 2);
  return [list.slice(0, middle), list.slice(middle)];
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [servicesLeft, servicesRight] = splitInHalf(services);
  const socialLinks = site.social.filter((entry) => entry.url);

  return (
    <footer className="bg-navy text-white">
      <Container className="py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-10">
          {/* Brand + contact + social */}
          <div className="flex flex-col gap-5 lg:w-[30%]">
            <Logo light />
            <p className="text-white/70">{site.tagline}</p>

            <ul className="flex flex-col gap-2">
              {contactRows().map((row) => (
                <li key={row.icon}>
                  <a
                    href={row.href}
                    className="inline-flex items-center gap-2 font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <i aria-hidden="true" className={`bi ${row.icon}`}></i>
                    {row.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social icons: only the platforms with a real link in data/site.js appear here */}
            {socialLinks.length > 0 && (
              <ul className="flex flex-wrap gap-3 pt-1">
                {socialLinks.map((entry) => (
                  <li key={entry.platform}>
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={entry.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-lg text-white transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      <i aria-hidden="true" className={`bi ${entry.icon}`}></i>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-x-10 gap-y-10 lg:w-[65%] lg:justify-end lg:gap-x-14">
            <nav aria-label="Footer navigation">
              <h2 className="font-heading text-base font-semibold text-white">Company</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={footerLinkClasses}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Footer services, part 1">
              <h2 className="font-heading text-base font-semibold text-white">Services</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {servicesLeft.map((service) => (
                  <li key={service.slug}>
                    <Link to={`/services#${service.slug}`} className={footerLinkClasses}>
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Same list, continued — visually a second column, one heading for both halves */}
            <nav aria-label="Footer services, part 2">
              <h2 className="font-heading text-base font-semibold text-white opacity-0 select-none" aria-hidden="true">
                Services
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {servicesRight.map((service) => (
                  <li key={service.slug}>
                    <Link to={`/services#${service.slug}`} className={footerLinkClasses}>
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>Website design and digital marketing agency.</p>
        </div>
      </Container>
    </footer>
  );
}

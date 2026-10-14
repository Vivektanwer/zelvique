// A small "Home / About" trail at the top of every inner page.
// It helps visitors know where they are, and it matches the BreadcrumbList schema
// that the server adds for Google (see utils/buildSchema.js).
// It reads the page name from data/seo.js, so you just write <Breadcrumbs /> at the top of a page.

import { Link, useLocation } from "react-router";
import Container from "./Container.jsx";
import { pageSeo } from "../data/seo.js";
import { cleanPath } from "../utils/cleanPath.js";

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const page = pageSeo[cleanPath(pathname)];

  // No breadcrumbs on the Home page or on unknown pages
  if (!page || cleanPath(pathname) === "/") return null;

  return (
    <Container className="pt-6">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
          <li>
            <Link
              to="/"
              className="underline-offset-4 transition-colors hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-ink">
            {page.name}
          </li>
        </ol>
      </nav>
    </Container>
  );
}

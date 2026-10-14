// Updates the browser tab title when the visitor moves between pages.
// (The server already sets the correct title for the first page load.)

import { useEffect } from "react";
import { useLocation } from "react-router";
import { pageSeo, notFoundSeo } from "../data/seo.js";
import { cleanPath } from "../utils/cleanPath.js";

export default function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pageSeo[cleanPath(pathname)] || notFoundSeo;
    document.title = page.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", page.description);
  }, [pathname]);
}

// Scrolls to the top when the page changes.
// If the link has a #hash (like /services#website-design), it scrolls to that section instead.
// It uses the Lenis smooth scroller when it is ready, and normal scrolling otherwise.

import { useEffect } from "react";
import { useLocation } from "react-router";
import { getLenis } from "../utils/animationLibs.js";

export default function useScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const lenis = getLenis();

    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        if (lenis) lenis.scrollTo(target, { offset: -96 });
        else target.scrollIntoView();
      }
      return;
    }

    // "immediate" = jump to the top without the smooth movement
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
}

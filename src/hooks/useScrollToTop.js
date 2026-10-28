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

    // requestAnimationFrame waits for the browser to actually paint the new page first.
    // Without this, Lenis can still be measuring the OLD page's height (for example a long
    // page like Contact) while the NEW page (like Thank You) is much shorter — that mismatch
    // is what makes a page feel "stuck" or impossible to scroll for a moment after moving to
    // a page with a very different height. lenis.resize() re-measures the page before we set
    // the scroll position, so Lenis always works with the new page's real height.
    const frame = requestAnimationFrame(() => {
      lenis?.resize();

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
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
}

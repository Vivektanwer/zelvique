// Smooth scrolling with Lenis. Used once, in Layout.
// It runs only in the browser (inside useEffect), and not at all if the visitor prefers reduced motion.
// On phones and tablets Lenis keeps the normal touch scrolling, which is faster and feels natural.

import { useEffect } from "react";
import { loadAnimationLibs, setLenis } from "../utils/animationLibs.js";
import { prefersReducedMotion } from "../utils/motion.js";

// The navbar is sticky, so we stop a little above the section we scroll to
const SCROLL_OFFSET = -96;

export default function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cancelled = false;
    let lenis;
    let tick;
    let gsapRef;

    // Links like <a href="#website-design"> scroll smoothly instead of jumping
    function handleClick(event) {
      if (!lenis || event.defaultPrevented || event.metaKey || event.ctrlKey) return;

      const link = event.target.closest('a[href^="#"]');
      if (!link) return;

      const id = link.getAttribute("href").slice(1);
      if (!id || id === "main") return; // "main" is the skip link: keep the normal browser behavior

      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: SCROLL_OFFSET });
      history.replaceState(null, "", `#${id}`);
    }

    loadAnimationLibs()
      .then(({ gsap, ScrollTrigger, Lenis }) => {
        if (cancelled) return;

        lenis = new Lenis({ duration: 1.1 });
        setLenis(lenis);
        gsapRef = gsap;

        // Tell ScrollTrigger every time Lenis scrolls, and let GSAP's clock run Lenis
        lenis.on("scroll", ScrollTrigger.update);
        tick = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        document.addEventListener("click", handleClick);
      })
      .catch(() => {
        // If the library cannot load, normal scrolling still works. Nothing else to do.
      });

    // Cleanup when the component is removed
    return () => {
      cancelled = true;
      document.removeEventListener("click", handleClick);
      if (gsapRef && tick) gsapRef.ticker.remove(tick);
      if (lenis) lenis.destroy();
      setLenis(null);
    };
  }, []);
}

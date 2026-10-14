// All GSAP animations of the website. Used once, in Layout. It runs again on every page change.
//
// HOW IT WORKS (no animation code is needed inside the pages):
// You add a small "data-" attribute to an element in a page, and this file animates it.
//
//   data-hero        The first thing on a page (heading, text, buttons). Slides up one after another when the page opens.
//   data-reveal      Fades and slides up when the visitor scrolls to it. Many at once appear one after another.
//   data-reveal="image"   Same, but the element fades in while growing slightly (nice for pictures).
//   data-count       A number that counts up when it is scrolled into view (for example "50+").
//   data-parallax="40"    Moves slowly while scrolling. The number is how many pixels.
//   data-float       Floats up and down gently, forever.
//   data-magnetic    A button that leans a little towards the mouse. Put it on a wrapper around the button.
//
// Elements with data-hero or data-reveal are hidden by a Tailwind class on <body> (see index.html)
// only while the page is "animated". If anything goes wrong, the animate class is removed and everything shows.
//
// Nothing here runs on the server, and nothing runs if the visitor prefers reduced motion.

import { useEffect } from "react";
import { useLocation } from "react-router";
import { loadAnimationLibs } from "../utils/animationLibs.js";
import { prefersReducedMotion, parseCountText, formatCount } from "../utils/motion.js";

// ---------- 1. Page opening (hero) ----------
function animateHero(gsap) {
  const items = gsap.utils.toArray("[data-hero]");

  if (items.length > 0) {
    gsap.fromTo(
      items,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.05 }
    );
  }

  // Floating cards: a very small up and down movement
  gsap.utils.toArray("[data-float]").forEach((card, index) => {
    gsap.to(card, {
      y: index % 2 === 0 ? -8 : 8,
      duration: 2.8 + index * 0.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.2,
    });
  });
}

// ---------- 2. Reveal while scrolling ----------
function animateReveals(gsap, ScrollTrigger) {
  const items = gsap.utils.toArray("[data-reveal]");
  if (items.length === 0) return;

  // Starting position of every item (it is already invisible because of the class on <body>)
  items.forEach((item) => {
    const isImage = item.dataset.reveal === "image";
    gsap.set(item, isImage ? { opacity: 0, scale: 1.05 } : { opacity: 0, y: 32 });
  });

  // "batch" groups items that come into view at the same moment, so they appear one after another
  ScrollTrigger.batch(items, {
    start: "top bottom-=48", // when the top of the item is 48px inside the screen
    once: true, // animate only the first time
    interval: 0.1,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        overwrite: true,
      }),
  });
}

// ---------- 3. Numbers that count up ----------
function animateCounters(gsap, ScrollTrigger) {
  gsap.utils.toArray("[data-count]").forEach((element) => {
    const parsed = parseCountText(element.textContent);
    if (!parsed) return; // no number inside: leave it alone

    ScrollTrigger.create({
      trigger: element,
      start: "top bottom-=48",
      once: true,
      onEnter: () => {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: parsed.number,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            element.textContent = formatCount(counter.value, parsed);
          },
          // At the end we put back the exact original text (for example "50+")
          onComplete: () => {
            element.textContent = parsed.original;
          },
        });
      },
    });
  });
}

// ---------- 4. Parallax (moves slower or faster than the page) ----------
function animateParallax(gsap) {
  gsap.utils.toArray("[data-parallax]").forEach((element) => {
    const distance = Number(element.dataset.parallax) || 40;

    gsap.fromTo(
      element,
      { y: -distance },
      {
        y: distance,
        ease: "none",
        scrollTrigger: {
          trigger: element.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true, // the animation follows the scrollbar
        },
      }
    );
  });
}

// ---------- 5. Magnetic buttons (only on devices with a mouse) ----------
function setupMagneticButtons(gsap, cleanups) {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  gsap.utils.toArray("[data-magnetic]").forEach((element) => {
    // quickTo is a fast way to move an element again and again
    const moveX = gsap.quickTo(element, "x", { duration: 0.4, ease: "power3.out" });
    const moveY = gsap.quickTo(element, "y", { duration: 0.4, ease: "power3.out" });

    function handleMove(event) {
      const box = element.getBoundingClientRect();
      moveX((event.clientX - (box.left + box.width / 2)) * 0.25);
      moveY((event.clientY - (box.top + box.height / 2)) * 0.25);
    }

    function handleLeave() {
      moveX(0);
      moveY(0);
    }

    element.addEventListener("mousemove", handleMove);
    element.addEventListener("mouseleave", handleLeave);

    // Remember how to remove the listeners when the page changes
    cleanups.push(() => {
      element.removeEventListener("mousemove", handleMove);
      element.removeEventListener("mouseleave", handleLeave);
    });
  });
}

// ---------- The hook ----------
export default function useAnimations() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cancelled = false;
    let context;
    const cleanups = [];

    loadAnimationLibs()
      .then(({ gsap, ScrollTrigger }) => {
        if (cancelled) return;

        // index.html checks this after 5 seconds to make sure animations really started
        window.__animationsStarted = true;

        // gsap.context collects everything created inside it, so we can undo it all in one go
        context = gsap.context(() => {
          animateHero(gsap);
          animateReveals(gsap, ScrollTrigger);
          animateCounters(gsap, ScrollTrigger);
          animateParallax(gsap);
          setupMagneticButtons(gsap, cleanups);
        });

        // When the fonts finish loading the page height can change, so measure again
        document.fonts?.ready.then(() => {
          if (!cancelled) ScrollTrigger.refresh();
        });
      })
      .catch(() => {
        // Something failed (for example the file did not download). Show everything normally.
        document.documentElement.classList.remove("animate");
      });

    return () => {
      cancelled = true;
      cleanups.forEach((cleanup) => cleanup());
      context?.revert(); // remove all animations of this page
    };
  }, [pathname]);
}

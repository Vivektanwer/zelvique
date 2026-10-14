// One question that opens and closes, with a smooth height animation.
// The parent (a page) decides which item is open.
// If GSAP has not loaded yet (or fails), the browser's own "hidden" attribute still works,
// so the accordion is never stuck broken.

import { useEffect, useId, useRef } from "react";
import { loadAnimationLibs } from "../utils/animationLibs.js";
import { prefersReducedMotion } from "../utils/motion.js";

export default function FAQItem({ question, answer, isOpen, onToggle }) {
  const id = useId();
  const panelRef = useRef(null);
  const gsapRef = useRef(null);

  // Load GSAP once, just for this component
  useEffect(() => {
    let cancelled = false;
    loadAnimationLibs().then(({ gsap }) => {
      if (!cancelled) gsapRef.current = gsap;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Animate open/close whenever "isOpen" changes
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const gsap = gsapRef.current;
    if (!gsap || prefersReducedMotion()) {
      // No animation library yet, or the visitor prefers less motion: just show or hide instantly
      panel.hidden = !isOpen;
      return;
    }

    if (isOpen) {
      panel.hidden = false;
      gsap.fromTo(
        panel,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    } else {
      gsap.to(panel, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          panel.hidden = true;
        },
      });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          id={`${id}-question`}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${id}-answer`}
          className="flex w-full items-center justify-between gap-6 py-5 text-left font-heading text-lg font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
        >
          {question}

          {/* Chevron icon (Bootstrap Icons) that flips when the answer is open */}
          <i
            aria-hidden="true"
            className={`bi bi-chevron-down shrink-0 text-brand-dark transition-transform duration-200 motion-reduce:transition-none ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          ></i>
        </button>
      </h3>

      {/* Height starts at "auto" via CSS (overflow-hidden clips it) so the very first render
          (before GSAP has loaded) already looks correct, whether open or closed. */}
      <div
        ref={panelRef}
        id={`${id}-answer`}
        role="region"
        aria-labelledby={`${id}-question`}
        hidden={!isOpen}
        className="overflow-hidden pr-6 text-ink-soft sm:pr-10"
      >
        <div className="pb-5">{answer}</div>
      </div>
    </div>
  );
}

// The top navigation bar.
// Desktop: logo, links and a button.
// Mobile: logo and a hamburger button that opens a menu, animated by GSAP when it is ready
// (the Tailwind transition classes already in the JSX are the fallback, so it always works).

import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import Logo from "./Logo.jsx";
import Button from "./Button.jsx";
import { navLinks } from "../data/site.js";
import { loadAnimationLibs } from "../utils/animationLibs.js";
import { prefersReducedMotion } from "../utils/motion.js";

// Classes for desktop links. "isActive" is true for the page we are on.
function desktopLinkClasses({ isActive }) {
  return `rounded-md text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark ${
    isActive ? "text-brand-dark" : "text-ink-soft hover:text-ink"
  }`;
}

// Classes for the bigger mobile links
function mobileLinkClasses({ isActive }) {
  return `block rounded-xl px-4 py-3 text-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark ${
    isActive ? "bg-brand-soft text-brand-dark" : "text-ink hover:bg-paper"
  }`;
}

export default function Navbar() {
  // true = mobile menu is open
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const menuRef = useRef(null);
  const gsapRef = useRef(null);

  // Load GSAP once, just for the menu animation
  useEffect(() => {
    let cancelled = false;
    loadAnimationLibs().then(({ gsap }) => {
      if (!cancelled) gsapRef.current = gsap;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Animate the menu whenever it opens or closes
  useEffect(() => {
    const menu = menuRef.current;
    const gsap = gsapRef.current;
    if (!menu || !gsap || prefersReducedMotion()) return; // the CSS classes below still handle it

    if (menuOpen) {
      gsap.fromTo(
        menu,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
      );
      // Each link and the button slide in one after another
      gsap.fromTo(
        menu.querySelectorAll("a, button"),
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", stagger: 0.04, delay: 0.05 }
      );
    }
  }, [menuOpen]);

  // Close the mobile menu when the visitor goes to another page
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close the mobile menu when the Escape key is pressed
  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="relative mx-auto max-w-6xl">
        {/* The floating white bar */}
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between rounded-2xl border border-line bg-white/90 px-5 py-3 backdrop-blur"
        >
          <Logo />

          {/* Desktop links (hidden on mobile) */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end className={desktopLinkClasses}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Desktop button (hidden on mobile) */}
            <Button to="/contact" size="sm" className="md:!block !hidden md:inline-flex">
              Start a Project
            </Button>

            {/* Hamburger button (hidden on desktop) */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-ink transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark md:hidden"
            >
              {/* Hamburger / close icon (Bootstrap Icons) */}
              <i aria-hidden="true" className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"} text-xl`}></i>
            </button>
          </div>
        </nav>

        {/* Mobile menu. The Tailwind classes are the fallback animation (and what shows before
            GSAP has loaded); the GSAP effect above plays on top of it once it is ready. */}
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`absolute inset-x-0 top-full mt-2 flex flex-col gap-4 rounded-2xl border border-line bg-white p-4 shadow-lg transition-all duration-300 motion-reduce:transition-none md:hidden ${
            menuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end className={mobileLinkClasses}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button to="/contact" className="w-full">
            Start a Project
          </Button>
        </div>
      </div>
    </header>
  );
}

// The frame around every page: Navbar on top, Footer at the bottom.
// <Outlet /> is where the current page appears.

import { Outlet } from "react-router";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import usePageMeta from "../hooks/usePageMeta.js";
import useScrollToTop from "../hooks/useScrollToTop.js";
import useSmoothScroll from "../hooks/useSmoothScroll.js";
import useAnimations from "../hooks/useAnimations.js";

export default function Layout() {
  usePageMeta();
  useScrollToTop();
  useSmoothScroll(); // Lenis smooth scrolling
  useAnimations(); // GSAP animations (must stay AFTER useScrollToTop)

  return (
    <div className="flex min-h-screen flex-col">
      {/* "Skip to content" link for keyboard users. Only visible when focused. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

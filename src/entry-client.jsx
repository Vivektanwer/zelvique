// Client entry file (runs in the browser).
// The server already sent the HTML, so here React "hydrates" it:
// it attaches click handlers and makes the page interactive.

import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import "./style.css";

// By default, the browser tries to restore the old scroll position itself whenever the
// page changes (for example, scrolling back down after visiting Contact, then going to the
// Thank You page). That fights with Lenis (our smooth-scroll library), which also tries to
// set the scroll position — the two fixing the scroll at the same time is exactly what makes
// a new page feel "stuck" or impossible to scroll for a moment. Turning this off hands scroll
// position fully over to useScrollToTop.js, so only one thing is ever in control of it.
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Client entry file (runs in the browser).
// The server already sent the HTML, so here React "hydrates" it:
// it attaches click handlers and makes the page interactive.

import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import "./style.css";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

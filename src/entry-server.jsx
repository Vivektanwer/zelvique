// Server entry file.
// The server calls render(url) to turn a page into HTML text.

import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App.jsx";
import { buildHead } from "./utils/buildHead.js";

export function render(url) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

  // SEO tags (title, description, canonical, Open Graph...) for this URL
  const { head, status } = buildHead(url);

  return { html, head, status };
}

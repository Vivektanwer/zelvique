// This file starts our website.
// It does two jobs:
//   1. Server-side rendering (SSR): builds the HTML of each page on the server
//   2. The backend API for the contact form (POST /api/contact)

// Loads the values from the .env file (passwords, keys). This must be the FIRST import.
import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import compression from "compression";
import contactRoutes from "./routes/contactRoutes.js";
import { buildRobotsTxt, buildSitemapXml } from "./utils/seoFiles.js";

// "npm start" adds --production. Hosting companies usually set NODE_ENV=production.
const isProduction =
  process.env.NODE_ENV === "production" || process.argv.includes("--production");
const port = process.env.PORT || 3000;

// The main project folder (one level above /server)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const app = express();
app.disable("x-powered-by"); // don't tell the world we use Express

// PERFORMANCE: compress every response (HTML, CSS, JS, JSON) before sending it.
// This alone often cuts page weight by 60-80% with no visible change to the visitor.
app.use(compression());

// Behind a hosting company's proxy, this makes req.ip the visitor's real IP address.
// (The contact form limit of 5 messages per 15 minutes uses it.)
if (isProduction) app.set("trust proxy", 1);

// ---- Backend API ----
// This must come BEFORE the website pages below.
app.use("/api", express.json({ limit: "20kb" })); // read JSON sent by the website
app.use("/api", contactRoutes); // POST /api/contact

// An unknown /api URL answers with JSON (not with the website's HTML page)
app.use("/api", (req, res) => {
  res.status(404).json({ message: "Not found." });
});

// If something goes wrong inside the API (for example broken JSON), answer with a friendly message
app.use("/api", (error, req, res, next) => {
  console.error("[api] Error:", error.message);
  const tooLarge = error.status === 413;
  res.status(error.status || 500).json({
    message: tooLarge
      ? "Your message is too large. Please make it shorter."
      : "We could not read your message. Please try again.",
  });
});

// ---- SEO files ----
app.get("/robots.txt", (req, res) => {
  res.type("text/plain").send(buildRobotsTxt());
});

app.get("/sitemap.xml", (req, res) => {
  res.type("application/xml").send(buildSitemapXml());
});

// /about/ and /about are the same page. Send /about/ to /about (a permanent redirect),
// so Google sees only one address for each page.
app.use((req, res, next) => {
  const isPageRequest = req.method === "GET" || req.method === "HEAD";

  if (isPageRequest && req.path.length > 1 && req.path.endsWith("/")) {
    // Rebuild the path from its parts. This makes sure it always starts with ONE slash,
    // so nobody can use this redirect to send visitors to another website.
    const cleanPath = "/" + req.path.split(/[\\/]+/).filter(Boolean).join("/");
    const queryStart = req.originalUrl.indexOf("?");
    const query = queryStart === -1 ? "" : req.originalUrl.slice(queryStart);
    return res.redirect(301, cleanPath + query);
  }

  next();
});

let vite; // only used while developing

if (!isProduction) {
  // DEVELOPMENT: Vite gives us instant updates while we edit code
  const { createServer } = await import("vite");
  vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: "custom",
  });
  app.use(vite.middlewares);
} else {
  // PRODUCTION: serve the files created by "npm run build"
  //
  // PERFORMANCE (caching): "npm run build" names JS/CSS files with a hash, for example
  // "index-a1b2c3.js". That hash changes automatically whenever the file's content changes,
  // so it is 100% safe to tell browsers to cache those files "forever" (1 year) — a browser
  // that already has "index-a1b2c3.js" will never need to download it again, and if the code
  // changes later, the new build gets a new hash (a new filename), so the old cached file is
  // simply never referenced again. Files WITHOUT a hash (favicon.png, robots-related files,
  // and index.html itself) use a short cache instead, since replacing them keeps the same name.
  app.use(
    "/assets",
    express.static(path.join(root, "dist/client/assets"), {
      immutable: true,
      maxAge: "1y",
    })
  );
  app.use(express.static(path.join(root, "dist/client"), { index: false, maxAge: "1h" }));
}

// In production we read the HTML template one time and reuse it
const productionTemplate = isProduction
  ? await fs.readFile(path.join(root, "dist/client/index.html"), "utf-8")
  : "";

// Every other request is a page request: render the React app to HTML
app.use(async (req, res) => {
  try {
    const url = req.originalUrl;
    let template;
    let render;

    if (!isProduction) {
      template = await fs.readFile(path.join(root, "index.html"), "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
    } else {
      template = productionTemplate;
      render = (await import("../dist/server/entry-server.js")).render;
    }

    // "html" = the page content, "head" = title/meta tags, "status" = 200 or 404
    const { html, head, status } = render(url);

    // Put them into the template (using functions keeps special characters safe)
    const page = template
      .replace("<!--app-head-->", () => head)
      .replace("<!--app-html-->", () => html);

    res.status(status).set({ "Content-Type": "text/html" }).send(page);
  } catch (error) {
    vite?.ssrFixStacktrace(error);
    console.error(error); // full details only in the server log
    res.status(500).send("Something went wrong. Please try again later.");
  }
});

app.listen(port, () => {
  console.log(`Zelvique is running at http://localhost:${port}`);
});

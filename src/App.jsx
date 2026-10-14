// All website pages (routes) are listed here.

import { Routes, Route } from "react-router";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import WorkPage from "./pages/WorkPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ThankYouPage from "./pages/ThankYouPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <Routes>
      {/* Layout adds the Navbar and Footer around every page */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        {/* Any other URL shows the "not found" page */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

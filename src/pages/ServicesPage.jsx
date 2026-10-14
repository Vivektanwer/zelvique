// The Services page. It is just a list of sections, in order.
// To edit the intro, open src/sections/services/ServicesIntro.jsx.
// To edit one service's text, open src/data/services.js (ServicesList builds the page from it).

import Breadcrumbs from "../components/Breadcrumbs.jsx";
import CTASection from "../components/CTASection.jsx";
import ServicesIntro from "../sections/services/ServicesIntro.jsx";
import ServicesList from "../sections/services/ServicesList.jsx";

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs />
      <ServicesIntro />
      <ServicesList />
      <CTASection
        title="Not sure which service you need?"
        text="Tell us about your business and goals. We will recommend the right starting point. The first consultation is free."
      />
    </>
  );
}

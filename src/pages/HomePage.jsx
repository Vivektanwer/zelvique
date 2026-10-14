// The Home page. It is just a list of sections, in order.
// Navbar and Footer come from Layout, so they are not here.
// To change the order, move a line up or down. To edit a section's content,
// open its file in src/sections/home/.

import HeroSection from "../sections/home/HeroSection.jsx";
import TrustedSection from "../sections/home/TrustedSection.jsx";
import AboutSection from "../sections/home/AboutSection.jsx";
import ServicesSection from "../sections/home/ServicesSection.jsx";
import WhyChooseSection from "../sections/home/WhyChooseSection.jsx";
import ProcessSection from "../sections/home/ProcessSection.jsx";
import FeaturedWorkSection from "../sections/home/FeaturedWorkSection.jsx";
import ResultsSection from "../sections/home/ResultsSection.jsx";
import TestimonialsSection from "../sections/home/TestimonialsSection.jsx";
import FAQSection from "../sections/home/FAQSection.jsx";
import CTASection from "../components/CTASection.jsx";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseSection />
      <ProcessSection />
      <FeaturedWorkSection />
      {/* <ResultsSection /> */}
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

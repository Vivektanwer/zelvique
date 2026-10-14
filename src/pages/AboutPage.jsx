// The About page. It is just a list of sections, in order.
// To edit a section's content, open its file in src/sections/about/.

import Breadcrumbs from "../components/Breadcrumbs.jsx";
import CTASection from "../components/CTASection.jsx";
import AboutHero from "../sections/about/AboutHero.jsx";
import StorySection from "../sections/about/StorySection.jsx";
import MissionVisionSection from "../sections/about/MissionVisionSection.jsx";
import ValuesSection from "../sections/about/ValuesSection.jsx";
import ApproachSection from "../sections/about/ApproachSection.jsx";
import WhyWorkWithUsSection from "../sections/about/WhyWorkWithUsSection.jsx";

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs />
      <AboutHero />
      <StorySection />
      <MissionVisionSection />
      <ValuesSection />
      <ApproachSection />
      <WhyWorkWithUsSection />
      <CTASection
        title="Ready to strengthen your digital presence?"
        text="Tell us about your business and goals. We reply within 24 hours with clear next steps."
      />
    </>
  );
}

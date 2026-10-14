// The Work page. It is just a list of sections, in order.
// To edit the intro, open src/sections/work/WorkIntro.jsx.
// To add or edit a project, open src/data/projects.js (CaseStudyList builds the page from it).

import Breadcrumbs from "../components/Breadcrumbs.jsx";
import CTASection from "../components/CTASection.jsx";
import WorkIntro from "../sections/work/WorkIntro.jsx";
import CaseStudyList from "../sections/work/CaseStudyList.jsx";

export default function WorkPage() {
  return (
    <>
      <Breadcrumbs />
      <WorkIntro />
      <CaseStudyList />
      <CTASection
        title="Have a project in mind?"
        text="Tell us about your business and what you want to achieve. We reply within 24 hours with clear next steps."
      />
    </>
  );
}

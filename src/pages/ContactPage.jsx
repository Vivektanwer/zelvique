// The Contact page. It is just a list of sections, in order.
// To edit the form itself, open src/sections/contact/ContactForm.jsx.
// To edit the contact details, open src/sections/contact/ContactDetails.jsx.

import Breadcrumbs from "../components/Breadcrumbs.jsx";
import CTASection from "../components/CTASection.jsx";
import ContactIntro from "../sections/contact/ContactIntro.jsx";
import ContactFormSection from "../sections/contact/ContactFormSection.jsx";
import ContactFAQSection from "../sections/contact/ContactFAQSection.jsx";

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs />
      <ContactIntro />
      <ContactFormSection />
      <ContactFAQSection />
      {/* This page is already the contact page, so this CTA button goes to the Work page. */}
      <CTASection
        title="Want to see our work first?"
        text="Browse our recent projects to see how better websites help businesses get better results."
        buttonLabel="View Our Work"
        buttonTo="/work"
      />
    </>
  );
}

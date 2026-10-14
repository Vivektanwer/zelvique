// Contact page, section 1: Introduction. Contains the page <h1> and a side card
// (filling the empty space next to the text on wide screens) with quick reasons to reach out,
// built from the same numbers shown on the Home page.

import Container from "../../components/Container.jsx";
import HighlightList from "../../components/HighlightList.jsx";

const reasons = [
  { icon: "bi-gift-fill", title: "Free consultation", text: "No cost, no pressure, just a conversation about your project." },
  { icon: "bi-lightning-charge-fill", title: "Fast replies", text: "We read every message and reply within 24 hours." },
  { icon: "bi-chat-square-text-fill", title: "Plain language", text: "No confusing jargon, just clear answers and next steps." },
];

export default function ContactIntro() {
  return (
    <section className="pb-12 pt-8 sm:pt-10 lg:pt-12">
      <Container className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-14">
        <div className="flex flex-col items-start gap-6 lg:w-3/5">
          <h1 data-hero className="max-w-4xl font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            Let's talk about your project.
          </h1>
          <p data-hero className="max-w-2xl text-lg text-ink-soft sm:text-xl">
            Tell us about your business and what you want to achieve. Whether you
            need a new website, a redesign or help with digital marketing, we are
            happy to give you a free consultation.
          </p>
        </div>

        <div data-hero className="lg:w-2/5">
          <HighlightList items={reasons} />
        </div>
      </Container>
    </section>
  );
}

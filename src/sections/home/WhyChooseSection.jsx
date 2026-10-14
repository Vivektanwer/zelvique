// Home page, section 5: Why Choose Zelvique (dark).
// Heading is full width on top, then the 4 reasons sit in an even 2-column grid below —
// so both columns always match, instead of a short heading next to a long list.

import Container from "../../components/Container.jsx";
import SectionHeading from "../../components/SectionHeading.jsx";
import { reasons } from "../../data/home.js";

export default function WhyChooseSection() {
  return (
    <section className="bg-navy py-20 sm:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          data-reveal
          light
          eyebrow="Why Zelvique"
          title="Why businesses choose to work with us"
          text="We keep things simple: understand your goals, build the right thing and stay in touch."
          className="max-w-2xl"
        />

        <ul className="flex flex-col gap-8 md:flex-row md:flex-wrap">
          {reasons.map((reason) => (
            <li
              key={reason.title}
              data-reveal
              className="flex flex-col gap-2 border-t-2 border-brand pt-6 md:w-[calc(50%_-_1rem)]"
            >
              <h3 className="font-heading text-xl font-semibold text-white">{reason.title}</h3>
              <p className="text-white/70">{reason.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

// About page, section 5: Our approach.
// Each row: title on the left, text on the right (on bigger screens).

import Container from "../../components/Container.jsx";
import SectionHeading from "../../components/SectionHeading.jsx";
import { approach } from "../../data/about.js";

export default function ApproachSection() {
  return (
    <section className="py-20 sm:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          data-reveal
          eyebrow="Our approach"
          title="How we turn ideas into websites that work"
        />

        <ul className="flex flex-col border-t border-line">
          {approach.map((item) => (
            <li
              key={item.title}
              data-reveal
              className="flex flex-col gap-2 border-b border-line py-7 md:flex-row md:gap-10"
            >
              <h3 className="font-heading text-xl font-semibold tracking-tight text-ink md:w-1/3">
                {item.title}
              </h3>
              <p className="text-lg text-ink-soft md:w-2/3">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

// About page, section 4: Values.
// Two per row on tablet and laptop (Flexbox wrap), one per row on phones.

import Container from "../../components/Container.jsx";
import SectionHeading from "../../components/SectionHeading.jsx";
import { values } from "../../data/about.js";

export default function ValuesSection() {
  return (
    <section className="border-y border-line bg-white py-20 sm:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading data-reveal eyebrow="Our values" title="What we care about in every project" />

        <ul className="flex flex-col gap-8 md:flex-row md:flex-wrap">
          {values.map((value) => (
            <li
              key={value.title}
              data-reveal
              className="flex flex-col gap-3 border-t-2 border-brand pt-5 md:w-[calc(50%_-_1rem)]"
            >
              <h3 className="font-heading text-2xl font-semibold tracking-tight text-ink">
                {value.title}
              </h3>
              <p className="text-lg text-ink-soft">{value.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

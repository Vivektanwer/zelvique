// About page, section 6: Why businesses work with us (dark).

import Container from "../../components/Container.jsx";
import SectionHeading from "../../components/SectionHeading.jsx";
import { expectations } from "../../data/about.js";

export default function WhyWorkWithUsSection() {
  return (
    <section className="bg-navy py-20 sm:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          data-reveal
          light
          eyebrow="Why work with us"
          title="What you can expect when you work with Zelvique"
        />

        <ul className="flex flex-col gap-8 md:flex-row md:flex-wrap">
          {expectations.map((item) => (
            <li key={item.title} data-reveal className="flex gap-4 md:w-[calc(50%_-_1rem)]">
              {/* Check mark */}
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-lg text-white"
              >
                <i className="bi bi-check2"></i>
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-heading text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-white/70">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

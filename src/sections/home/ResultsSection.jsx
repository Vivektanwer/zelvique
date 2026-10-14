// Home page, section 8: Results / Statistics.
// Numbers come from data/home.js (remember to replace the placeholders!)

import Container from "../../components/Container.jsx";
import SectionHeading from "../../components/SectionHeading.jsx";
import { stats } from "../../data/home.js";

export default function ResultsSection() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <div className="relative flex flex-col gap-12 overflow-hidden rounded-3xl bg-linear-to-br from-brand-dark to-navy p-8 sm:p-12 lg:p-16">
          <span
            aria-hidden="true"
            data-parallax="30"
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border-[40px] border-white/10"
          ></span>
          <SectionHeading
            data-reveal
            light
            eyebrow="Results"
            title="Better websites lead to better business"
            text="We measure our work by what it does for you: more visitors, faster pages and more enquiries."
          />

          <ul className="flex flex-col gap-8 sm:flex-row sm:flex-wrap">
            {stats.map((stat) => (
              <li
                key={stat.label}
                className="flex flex-col gap-2 border-t border-white/30 pt-6 sm:w-[calc(50%_-_1rem)] lg:w-[calc(25%_-_1.5rem)]"
              >
                <span data-count data-reveal className="font-heading text-5xl font-bold tracking-tight text-white">
                  {stat.value}
                </span>
                <span className="text-white">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

// Home page, section 2: Trusted / Brand Introduction.
// We do not have client logos yet, so this shows the types of business we work with.

import Container from "../../components/Container.jsx";
import { industries } from "../../data/home.js";

export default function TrustedSection() {
  return (
    <section className="border-y border-line bg-white py-14">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex flex-col gap-2 lg:w-2/5">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-ink">
            Made for growing businesses
          </h2>
          <p className="text-ink-soft">
            From a first website to a full redesign, we help owners build a
            clear, professional online presence.
          </p>
        </div>

        <ul className="flex flex-wrap gap-3 lg:w-3/5 lg:justify-end">
          {industries.map((industry) => (
            <li
              key={industry}
              className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-ink"
            >
              {industry}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

// Services page, section 1: Introduction.
// Contains the page <h1>, quick links that jump to each service, and a side card
// (filling the empty space next to the text on wide screens) showing what is covered.

import Container from "../../components/Container.jsx";
import HighlightList from "../../components/HighlightList.jsx";
import { services } from "../../data/services.js";

const coverage = [
  { icon: "bi-palette", title: "Design & build", text: "Website design, development and redesign." },
  { icon: "bi-phone", title: "Made for every screen", text: "Responsive layouts and UI/UX improvements." },
  { icon: "bi-graph-up-arrow", title: "Growth", text: "Performance, digital marketing and social media." },
];

export default function ServicesIntro() {
  return (
    <section className="pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pt-12">
      <Container className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-14">
        <div className="flex flex-col items-start gap-8 lg:w-3/5">
          <h1 data-hero className="max-w-4xl font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            Website design and digital marketing services that help your business grow.
          </h1>

          <p data-hero className="max-w-2xl text-lg text-ink-soft sm:text-xl">
            From a new website to a full redesign, faster pages and marketing that
            brings in customers, everything you need is available from one team.
            Choose a service below to see what it is, what it solves and what is
            included.
          </p>

          {/* Jump links. They are normal links to the sections further down this page. */}
          {/* <nav data-hero aria-label="Jump to a service">
            <ul className="flex flex-wrap gap-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <a
                    href={`#${service.slug}`}
                    className="inline-block rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav> */}
        </div>

        <div data-hero className="lg:w-2/5">
          <HighlightList title="What we cover" items={coverage} />
        </div>
      </Container>
      <Container className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-14 mt-8">
      <nav data-hero aria-label="Jump to a service">
            <ul className="flex flex-wrap gap-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <a
                    href={`#${service.slug}`}
                    className="inline-block rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          </Container>
    </section>
  );
}

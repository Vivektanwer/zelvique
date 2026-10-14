// Work page, section 1: Introduction.
// Contains the page <h1>, quick links that jump to each project, and a side card
// (filling the empty space next to the text on wide screens) showing how we approach a project.

import Container from "../../components/Container.jsx";
import HighlightList from "../../components/HighlightList.jsx";
import { projects } from "../../data/projects.js";

const approach = [
  { icon: "bi-search", title: "Real problems", text: "Each project starts with a business that had something slowing it down." },
  { icon: "bi-tools", title: "Real solutions", text: "A design and build made for that specific problem, not a template." },
  { icon: "bi-graph-up", title: "Real results", text: "We look at what changed for the business after launch." },
];

export default function WorkIntro() {
  return (
    <section className="pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pt-12">
      <Container className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-14">
        <div className="flex flex-col items-start gap-8 lg:w-3/5">
          <h1 data-hero className="max-w-4xl font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            Projects where a better website led to better results.
          </h1>

          <p data-hero className="max-w-2xl text-lg text-ink-soft sm:text-xl">
            Every business is different. Here is how we approached a few
            projects: the problem we found, the solution we built and what
            changed for the business.
          </p>

          {/* Jump links to each case study further down this page */}
          <nav data-hero aria-label="Jump to a project">
            <ul className="flex flex-wrap gap-3">
              {projects.map((project) => (
                <li key={project.slug}>
                  <a
                    href={`#${project.slug}`}
                    className="inline-block rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
                  >
                    {project.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div data-hero className="lg:w-2/5">
          <HighlightList title="How we work" items={approach} />
        </div>
      </Container>
    </section>
  );
}

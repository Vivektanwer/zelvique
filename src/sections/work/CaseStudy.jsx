// Work page, section 2: one case study for ONE project.
// CaseStudyList.jsx creates one of these for every project in data/projects.js.

import Button from "../../components/Button.jsx";
import Container from "../../components/Container.jsx";
import ProjectPreview from "../../components/ProjectPreview.jsx";

export default function CaseStudy({ project, isWhite }) {
  return (
    // "scroll-mt-24" leaves space for the sticky navbar when jumping to this project.
    <section
      id={project.slug}
      className={`scroll-mt-24 py-16 sm:py-20 ${isWhite ? "border-y border-line bg-white" : ""}`}
    >
      <Container data-reveal className="flex flex-col gap-10">
        {/* Top row: picture + project details. The picture switches sides on big screens. */}
        <div
          className={`flex flex-col gap-8 lg:items-center lg:gap-14 ${
            isWhite ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
        >
          <div className="lg:w-1/2">
            <ProjectPreview project={project} className="h-64 sm:h-80 lg:h-96" />
          </div>

          <div className="flex flex-col items-start gap-5 lg:w-1/2">
            <p className="text-sm font-medium text-ink-soft">{project.businessType}</p>

            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {project.name}
            </h2>

            <p className="text-lg text-ink-soft">{project.summary}</p>

            {/* Services provided */}
            <div className="flex flex-col gap-2">
              <h3 className="font-heading text-sm font-semibold text-ink">Services provided</h3>
              <ul className="flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <li
                    key={service}
                    className="rounded-full bg-brand-soft px-3 py-1 text-sm text-brand-dark"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies used */}
            <div className="flex flex-col gap-2">
              <h3 className="font-heading text-sm font-semibold text-ink">Built with</h3>
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full border border-line px-3 py-1 text-sm text-ink-soft"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </div>

            <Button to="/contact">Start a Project</Button>
          </div>
        </div>

        {/* Bottom row: problem, solution and result */}
        <div className="flex flex-col gap-6 md:flex-row">
          <div
            className={`flex flex-col gap-3 rounded-2xl border border-line p-6 sm:p-8 md:flex-1 ${
              isWhite ? "bg-paper" : "bg-white"
            }`}
          >
            <h3 className="font-heading text-lg font-semibold text-ink">The problem</h3>
            <p className="text-ink-soft">{project.problem}</p>
          </div>

          <div
            className={`flex flex-col gap-3 rounded-2xl border border-line p-6 sm:p-8 md:flex-1 ${
              isWhite ? "bg-paper" : "bg-white"
            }`}
          >
            <h3 className="font-heading text-lg font-semibold text-ink">The solution</h3>
            <p className="text-ink-soft">{project.solution}</p>
          </div>

          {/* The result is dark so it stands out */}
          <div className="flex flex-col gap-3 rounded-2xl bg-navy p-6 sm:p-8 md:flex-1">
            <h3 className="font-heading text-lg font-semibold text-white">The result</h3>
            <p className="text-white/85">{project.result}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

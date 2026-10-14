// One portfolio project card (used on the Home page).
// Usage: <ProjectCard project={projects[0]} />

import { Link } from "react-router";
import ProjectPreview from "./ProjectPreview.jsx";

export default function ProjectCard({ project }) {
  return (
    <article className="group relative flex w-full flex-col gap-5 rounded-2xl border border-line bg-white p-4 transition-colors duration-200 hover:border-brand">
      <ProjectPreview project={project} />

      <div className="flex flex-1 flex-col gap-3 px-2 pb-2">
        <p className="text-sm font-medium text-ink-soft">{project.businessType}</p>
        <h3 className="font-heading text-xl font-semibold tracking-tight text-ink">
          {project.name}
        </h3>
        <p className="text-ink-soft">{project.summary}</p>

        {/* Services provided */}
        <ul className="flex flex-wrap gap-2 pt-1">
          {project.services.map((service) => (
            <li
              key={service}
              className="rounded-full bg-brand-soft px-3 py-1 text-sm text-brand-dark"
            >
              {service}
            </li>
          ))}
        </ul>

        {/* "after:absolute after:inset-0" makes the whole card clickable */}
        <Link
          to={`/work#${project.slug}`}
          className="mt-auto flex items-center gap-2 pt-4 font-heading font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 transition-colors after:absolute after:inset-0 after:rounded-2xl group-hover:decoration-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
        >
          View case study
          <i aria-hidden="true" className="bi bi-arrow-right text-sm transition-transform duration-200 group-hover:translate-x-1"></i>
        </Link>
      </div>
    </article>
  );
}

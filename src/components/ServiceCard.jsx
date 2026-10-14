// One service card. The whole card is clickable (the "Learn more" link stretches over it).
// Usage: <ServiceCard service={services[0]} />

import { Link } from "react-router";

export default function ServiceCard({ service }) {
  return (
    <article className="group relative flex w-full flex-col gap-4 rounded-2xl border border-line bg-white p-6 transition-colors duration-200 hover:border-brand">
      {/* Icon badge: turns solid blue when the card is hovered */}
      <span
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-xl text-brand-dark transition-colors duration-200 group-hover:bg-brand group-hover:text-white"
      >
        <i className={`bi ${service.icon}`}></i>
      </span>

      <h3 className="font-heading text-xl font-semibold tracking-tight text-ink">
        {service.title}
      </h3>
      <p className="text-ink-soft">{service.description}</p>

      {/* "after:absolute after:inset-0" makes the whole card clickable */}
      <Link
        to={`/services#${service.slug}`}
        className="mt-auto flex items-center gap-2 pt-2 font-heading font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 transition-colors after:absolute after:inset-0 after:rounded-2xl group-hover:decoration-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
      >
        Learn more
        <i aria-hidden="true" className="bi bi-arrow-right text-sm transition-transform duration-200 group-hover:translate-x-1"></i>
      </Link>
    </article>
  );
}

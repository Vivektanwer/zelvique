// Contact page: the LEFT side of section 2 — contact details and what happens next.
// Used by ContactFormSection.jsx.

import { site } from "../../data/site.js";

// What happens after the visitor sends a message
const nextSteps = [
  {
    title: "We read your message",
    text: "We look at your business and what you want to achieve.",
  },
  {
    title: "We reply within 24 hours",
    text: "You get answers to your questions and clear next steps.",
  },
  {
    title: "We book a free consultation",
    text: "We talk about your project and how we can help.",
  },
];

export default function ContactDetails() {
  return (
    <div data-hero className="flex flex-col gap-10 lg:w-2/5">
      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-ink">
          Contact details
        </h2>

        <ul className="flex flex-col rounded-2xl border border-line bg-white">
          <li className="flex items-center gap-4 border-b border-line p-5 min-w-0">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-lg text-brand-dark"
            >
              <i className="bi bi-envelope-fill"></i>
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-sm text-ink-soft">Email</span>
              <a
                href={`mailto:${site.email}`}
                className="break-all font-heading text-lg font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 hover:decoration-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark"
              >
                {site.email}
              </a>
            </span>
          </li>

          {/* The phone number only shows if you added it in data/site.js */}
          {site.phone && (
            <li className="flex items-center gap-4 border-b border-line p-5 min-w-0">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-lg text-brand-dark"
              >
                <i className="bi bi-telephone-fill"></i>
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-sm text-ink-soft">Phone</span>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="break-all font-heading text-lg font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 hover:decoration-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark"
                >
                  {site.phone}
                </a>
              </span>
            </li>
          )}

          <li className="flex items-center gap-4 p-5 min-w-0">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-lg text-brand-dark"
            >
              <i className="bi bi-clock-fill"></i>
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-sm text-ink-soft">Reply time</span>
              <span className="font-heading text-lg font-semibold text-ink">
                Within 24 hours
              </span>
            </span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-ink">
          What happens next
        </h2>

        <ol className="flex flex-col gap-5">
          {nextSteps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft font-heading text-sm font-bold text-brand-dark"
              >
                {index + 1}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-heading text-lg font-semibold text-ink">{step.title}</h3>
                <p className="text-ink-soft">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

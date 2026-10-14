// Services page, section 2: one block for ONE service.
// ServicesList.jsx creates one of these for every service in data/services.js.

import Button from "../../components/Button.jsx";
import Container from "../../components/Container.jsx";

export default function ServiceDetail({ service, isWhite }) {
  return (
    // "scroll-mt-24" leaves space for the sticky navbar when jumping to this service.
    <section
      id={service.slug}
      className={`scroll-mt-24 py-16 sm:py-20 ${isWhite ? "border-y border-line bg-white" : ""}`}
    >
      <Container data-reveal className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        {/* Left: name, what it is, and the button */}
        <div className="flex flex-col items-start gap-5 lg:w-2/5">
          <span
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-xl text-brand-dark"
          >
            <i className={`bi ${service.icon}`}></i>
          </span>

          <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {service.title}
          </h2>

          <p className="text-lg text-ink-soft">{service.what}</p>

          {/* The service name is sent in the link. The contact form uses it to pre-select the service. */}
          <Button to={`/contact?service=${service.slug}`}>Start a Project</Button>
        </div>

        {/* Right: problem, what is included, why it matters */}
        <div
          className={`flex flex-col rounded-2xl border border-line lg:w-3/5 ${
            isWhite ? "bg-paper" : "bg-white"
          }`}
        >
          <div className="flex flex-col gap-2 border-b border-line p-6 sm:p-8">
            <h3 className="font-heading text-lg font-semibold text-ink">
              The problem it solves
            </h3>
            <p className="text-ink-soft">{service.problem}</p>
          </div>

          <div className="flex flex-col gap-3 border-b border-line p-6 sm:p-8">
            <h3 className="font-heading text-lg font-semibold text-ink">What is included</h3>
            <ul className="flex flex-col gap-3">
              {service.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm text-brand-dark"
                  >
                    <i className="bi bi-check2"></i>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2 p-6 sm:p-8">
            <h3 className="font-heading text-lg font-semibold text-ink">Why it matters</h3>
            <p className="text-ink-soft">{service.why}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

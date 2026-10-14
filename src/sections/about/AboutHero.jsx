// About page, section 1: Introduction. Contains the page <h1>.

import Button from "../../components/Button.jsx";
import Container from "../../components/Container.jsx";

// The three rows in the "One team, one goal" picture
const teamRows = [
  { icon: "bi-palette", label: "Design", text: "Clear, modern websites" },
  { icon: "bi-code-slash", label: "Development", text: "Fast, secure and easy to grow" },
  { icon: "bi-graph-up-arrow", label: "Marketing", text: "Reach the right customers" },
];

export default function AboutHero() {
  return (
    <section className="overflow-hidden pb-20 pt-8 sm:pb-24 sm:pt-10 lg:pt-12">
      <Container className="flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex flex-col items-start gap-6 lg:w-1/2">
          <h1 data-hero className="font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            We help businesses build a stronger digital presence.
          </h1>
          <p data-hero className="max-w-xl text-lg text-ink-soft sm:text-xl">
            Zelvique is a website design and digital marketing agency. We bring
            design, development and marketing together in one team, so your
            business looks professional online and gets more from its website.
          </p>
          <div data-hero><Button to="/contact">Start a Project</Button></div>
        </div>

        {/* "One team, one goal" picture (decorative) */}
        <div data-hero className="lg:w-1/2">
          <div
            aria-hidden="true"
            className="flex flex-col gap-3 rounded-3xl bg-navy p-6 sm:p-8"
          >
            <p className="pb-2 font-heading text-xl font-semibold text-white">
              One team, one goal
            </p>

            {teamRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center gap-4 rounded-xl bg-white/10 p-4"
              >
                <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand text-lg text-white">
                  <i className={`bi ${row.icon}`}></i>
                </span>
                <span className="flex flex-col">
                  <span className="font-heading font-semibold text-white">{row.label}</span>
                  <span className="text-sm text-white/70">{row.text}</span>
                </span>
              </div>
            ))}

            {/* Final row: the result for the client */}
            <div className="flex items-center gap-4 rounded-xl bg-accent p-4 text-ink">
              <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-lg">
                <i className="bi bi-check2"></i>
              </span>
              <span className="font-heading font-semibold">A stronger business online</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

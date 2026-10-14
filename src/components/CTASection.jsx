// The big dark "call to action" block. Used at the bottom of most pages.
// You can change the text for each page:
//   <CTASection title="..." text="..." buttonLabel="..." buttonTo="/work" />

import Container from "./Container.jsx";
import Button from "./Button.jsx";

export default function CTASection({
  title = "Let's build something that grows your business.",
  text = "Tell us about your business and goals. We reply within 24 hours with clear next steps.",
  buttonLabel = "Start a Project",
  buttonTo = "/contact",
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div data-reveal className="relative flex flex-col items-start gap-8 overflow-hidden rounded-3xl bg-navy p-8 sm:p-12 lg:p-16">
          {/* Decorative blue ring in the corner */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border-[48px] border-brand/25"
          ></span>

          <div className="relative flex max-w-2xl flex-col gap-4">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="text-lg text-white/70">{text}</p>
          </div>

          <div data-magnetic className="relative">
            <Button to={buttonTo} variant="accent">
              {buttonLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

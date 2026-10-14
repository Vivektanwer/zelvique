// Home page, section 6: Our Process.
// Numbered because the steps really happen in this order.

import Container from "../../components/Container.jsx";
import SectionHeading from "../../components/SectionHeading.jsx";
import { processSteps } from "../../data/home.js";

export default function ProcessSection() {
  return (
    <section className="border-b border-line bg-white py-20 sm:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          data-reveal
          eyebrow="Our process"
          title="A simple path from idea to launch"
          text="Four clear steps, so you always know what is happening and what comes next."
        />

        <ol className="flex flex-col gap-8 lg:flex-row lg:gap-6">
          {processSteps.map((step, index) => (
            <li
              key={step.title}
              data-reveal
              className="flex flex-col gap-3 border-t-2 border-brand pt-6 lg:flex-1"
            >
              <span className="font-heading text-sm font-semibold text-brand-dark">
                Step {index + 1}
              </span>
              <h3 className="font-heading text-xl font-semibold tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

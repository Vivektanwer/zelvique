// Home page, section 3: About Zelvique (short version).

import { Link } from "react-router";
import Container from "../../components/Container.jsx";
import SectionHeading from "../../components/SectionHeading.jsx";
import { aboutPoints } from "../../data/home.js";

export default function AboutSection() {
  return (
    <section className="py-20 sm:py-24">
      <Container className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
        {/* Left: heading and link */}
        <div className="flex flex-col items-start gap-6 lg:w-1/2">
          <SectionHeading
            eyebrow="About Zelvique"
            title="One team for your website and your marketing"
            text="Zelvique is a digital agency that helps businesses improve their online presence. We design and build websites, then support them with digital marketing, so everything works together instead of in pieces."
          />
          <Link
            to="/about"
            className="font-heading font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark"
          >
            More about Zelvique
          </Link>
        </div>

        {/* Right: three short facts */}
        <dl className="flex flex-col rounded-2xl border border-line bg-white lg:w-1/2">
          {aboutPoints.map((point) => (
            <div
              key={point.label}
              className="flex flex-col gap-1 border-b border-line p-6 last:border-b-0"
            >
              <dt className="font-heading text-lg font-semibold text-ink">{point.label}</dt>
              <dd className="text-ink-soft">{point.text}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

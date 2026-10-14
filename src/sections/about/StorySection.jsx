// About page, section 2: Our story.

import { Link } from "react-router";
import Container from "../../components/Container.jsx";
import SectionHeading from "../../components/SectionHeading.jsx";
import { storyParagraphs } from "../../data/about.js";

// Same style for the small text links
const textLinkClasses =
  "font-heading font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark";

export default function StorySection() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        <div className="lg:w-2/5">
          <SectionHeading
            data-reveal
            eyebrow="Our story"
            title="Why we started Zelvique"
            text="Every business deserves a website and a marketing plan that actually works together, not two separate projects handled by two separate teams."
          />
        </div>

        <div className="flex flex-col gap-5 lg:w-3/5">
          {storyParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg text-ink-soft">
              {paragraph}
            </p>
          ))}

          {/* Internal links to other pages */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
            <Link to="/services" className={textLinkClasses}>
              See our services
            </Link>
            <Link to="/work" className={textLinkClasses}>
              View our work
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

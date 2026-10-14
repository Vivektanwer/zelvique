// About page, section 3: Mission and Vision.

import Container from "../../components/Container.jsx";
import { mission, vision } from "../../data/about.js";

export default function MissionVisionSection() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container className="flex flex-col gap-6 md:flex-row">
        {/* Mission (dark card) */}
        <div data-reveal className="flex flex-col gap-4 rounded-3xl bg-navy p-8 sm:p-10 md:flex-1">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-white">
            Our mission
          </h2>
          <p className="text-lg text-white/85">{mission}</p>
        </div>

        {/* Vision (light card) */}
        <div data-reveal className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-8 sm:p-10 md:flex-1">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink">
            Our vision
          </h2>
          <p className="text-lg text-ink-soft">{vision}</p>
        </div>
      </Container>
    </section>
  );
}

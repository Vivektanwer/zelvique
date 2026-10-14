// Home page, section 4: Services.
// Cards use Flexbox (flex-wrap): phone = 1 per row, tablet = 2, laptop = 4.
// (The "_" inside calc() means a space. Tailwind needs it written this way.)

import Button from "../../components/Button.jsx";
import Container from "../../components/Container.jsx";
import SectionHeading from "../../components/SectionHeading.jsx";
import ServiceCard from "../../components/ServiceCard.jsx";
import { services } from "../../data/services.js";

export default function ServicesSection() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          data-reveal
          eyebrow="Services"
          title="Everything your website needs to bring in customers"
          text="Design, development and marketing from one team, so every part works towards the same goal."
        />

        <ul className="flex flex-col gap-6 md:flex-row md:flex-wrap">
          {services.map((service) => (
            <li
              key={service.slug}
              data-reveal
              className="flex md:w-[calc(50%_-_0.75rem)] lg:w-[calc(25%_-_1.125rem)]"
            >
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>

        <div>
          <Button to="/services" variant="secondary">
            See All Services
          </Button>
        </div>
      </Container>
    </section>
  );
}

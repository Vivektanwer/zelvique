// Home page, section 9: Testimonials.
// To add a testimonial, add it in data/testimonials.js. Nothing to change here.

import Container from "../../components/Container.jsx";
import SectionHeading from "../../components/SectionHeading.jsx";
import TestimonialCard from "../../components/TestimonialCard.jsx";
import { testimonials } from "../../data/testimonials.js";

export default function TestimonialsSection() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading data-reveal eyebrow="Testimonials" title="What our clients say" />

        <ul className="flex flex-col gap-6 lg:flex-row">
          {testimonials.map((item) => (
            <li key={item.name} data-reveal className="flex lg:flex-1">
              <TestimonialCard
                name={item.name}
                role={item.role}
                business={item.business}
                quote={item.quote}
                photo={item.photo}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

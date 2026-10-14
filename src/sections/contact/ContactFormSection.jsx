// Contact page, section 2: contact details (left) + the form (right).
// Figures out the pre-selected service from the URL (for example /contact?service=website-design)
// and passes it down to ContactForm.

import { useSearchParams } from "react-router";
import Container from "../../components/Container.jsx";
import ContactDetails from "./ContactDetails.jsx";
import ContactForm from "./ContactForm.jsx";
import { services } from "../../data/services.js";

export default function ContactFormSection() {
  // Links from the Services page look like /contact?service=website-design.
  // If the service name is valid, we pre-select it in the form.
  const [searchParams] = useSearchParams();
  const serviceFromLink = searchParams.get("service");
  const validServices = [...services.map((service) => service.slug), "not-sure"];
  const startingService = validServices.includes(serviceFromLink) ? serviceFromLink : "";

  return (
    <section className="pb-20 sm:pb-24">
      <Container className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-14">
        <ContactDetails />
        <ContactForm startingService={startingService} />
      </Container>
    </section>
  );
}

// Contact page, section 3: FAQ.
// The heading sits full width on top, then the questions are split into two even columns
// below it — so both sides always match, instead of a short heading next to a long list.

import { useState } from "react";
import Container from "../../components/Container.jsx";
import SectionHeading from "../../components/SectionHeading.jsx";
import FAQItem from "../../components/FAQItem.jsx";
import { faqs } from "../../data/faqs.js";

// Splits the FAQ list into two even halves, so two matching columns replace one long list
function splitInHalf(list) {
  const middle = Math.ceil(list.length / 2);
  return [list.slice(0, middle), list.slice(middle)];
}

export default function ContactFAQSection() {
  const [openFaq, setOpenFaq] = useState(0);
  const [leftFaqs, rightFaqs] = splitInHalf(faqs);

  return (
    <section className="border-y border-line bg-white py-20 sm:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          data-reveal
          eyebrow="FAQ"
          title="Before you get in touch"
          text="Quick answers to the questions we hear most often."
        />

        <div className="flex flex-col border-t border-line md:flex-row">
          {[leftFaqs, rightFaqs].map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`flex flex-col md:w-1/2 ${columnIndex === 1 ? "md:border-l md:border-line md:pl-12" : "md:pr-12"}`}
            >
              {column.map((item) => {
                const index = columnIndex === 0 ? column.indexOf(item) : leftFaqs.length + column.indexOf(item);
                return (
                  <FAQItem
                    key={item.question}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openFaq === index}
                    onToggle={() => setOpenFaq(openFaq === index ? null : index)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

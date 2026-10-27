// Contact page: the form itself (the RIGHT side of section 2).
// Used by ContactFormSection.jsx.
//
// How it works:
//   1. The visitor fills the form and clicks "Send Message".
//   2. We check the values in the browser (validateContactForm).
//   3. If something is wrong, we show a simple message under that field.
//   4. If everything is fine, we send the data to the server (sendContactForm).
//   5. On success we go to the Thank You page (src/pages/ThankYouPage.jsx).
//      On failure we show a friendly error message right here instead.

import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/Button.jsx";
import FormField, { getInputClasses } from "../../components/FormField.jsx";
import { site } from "../../data/site.js";
import { services } from "../../data/services.js";
import { validateContactForm } from "../../utils/validateContactForm.js";
import { sendContactForm } from "../../utils/sendContactForm.js";

// The values of an empty form.
// "website" is a hidden trap field: real visitors never see it, but spam bots fill it in.
const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  message: "",
  website: "",
};

// The order of the fields (used to focus the first field with an error)
const fieldOrder = ["name", "email", "phone", "company", "service", "message"];

// The real options in the "Service Interested In" dropdown, used to check the chosen value
const validServices = [...services.map((service) => service.slug), "not-sure"];

export default function ContactForm({ startingService }) {
  const navigate = useNavigate();

  // What the visitor has typed
  const [values, setValues] = useState({ ...emptyForm, service: startingService });
  // Error messages under the fields, for example { email: "Please enter a valid email address." }
  const [errors, setErrors] = useState({});
  // "idle" = waiting, "submitting" = sending, "error" = the server had a problem.
  // (There is no "success" state here — on success we navigate to the Thank You page instead.)
  const [status, setStatus] = useState("idle");
  // The message shown when the server has a problem
  const [errorMessage, setErrorMessage] = useState("");

  // Runs every time the visitor types in a field
  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });

    // Remove the error of this field as soon as the visitor starts fixing it
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  }

  // Runs when the visitor clicks "Send Message"
  async function handleSubmit(event) {
    event.preventDefault(); // stop the page from reloading
    if (status === "submitting") return;

    // Step 1: check the values
    const validationErrors = validateContactForm(values, validServices);
    setErrors(validationErrors);
    setErrorMessage("");

    if (Object.keys(validationErrors).length > 0) {
      // Move the cursor to the first field with a problem
      const firstField = fieldOrder.find((field) => validationErrors[field]);
      document.getElementById(`contact-${firstField}`)?.focus();
      return;
    }

    // Step 2: send to the server
    setStatus("submitting");
    const result = await sendContactForm(values);

    // Step 3: show the result
    if (result.ok) {
      navigate("/thank-you");
    } else {
      setStatus("error");
      setErrorMessage(result.message);
      if (result.fieldErrors) setErrors(result.fieldErrors);
    }
  }

  // Helper: props that connect an input to its error message (for screen readers)
  function errorProps(field) {
    return {
      "aria-invalid": errors[field] ? "true" : "false",
      "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    };
  }

  return (
    <div data-hero className="rounded-2xl border border-line bg-white p-6 sm:p-8 lg:w-3/5">
      {/* "noValidate" turns off the browser's own pop-up messages,
          so we can show our own simple messages instead. */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-ink">
          Send us a message
        </h2>

        {/* Name + Email */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField id="contact-name" label="Name" required error={errors.name} className="md:flex-1">
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={100}
              value={values.name}
              onChange={handleChange}
              placeholder="Your full name"
              className={getInputClasses(errors.name)}
              {...errorProps("name")}
            />
          </FormField>

          <FormField id="contact-email" label="Email" required error={errors.email} className="md:flex-1">
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              value={values.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={getInputClasses(errors.email)}
              {...errorProps("email")}
            />
          </FormField>
        </div>

        {/* Phone + Company */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField id="contact-phone" label="Phone" required error={errors.phone} className="md:flex-1">
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={25}
              value={values.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className={getInputClasses(errors.phone)}
              {...errorProps("phone")}
            />
          </FormField>

          <FormField
            id="contact-company"
            label="Company / Business Name"
            error={errors.company}
            className="md:flex-1"
          >
            <input
              id="contact-company"
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={100}
              value={values.company}
              onChange={handleChange}
              placeholder="Your business name"
              className={getInputClasses(errors.company)}
              {...errorProps("company")}
            />
          </FormField>
        </div>

        {/* Service */}
        <FormField id="contact-service" label="Service Interested In" required error={errors.service}>
          <select
            id="contact-service"
            name="service"
            value={values.service}
            onChange={handleChange}
            className={getInputClasses(errors.service)}
            {...errorProps("service")}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
            <option value="not-sure">Not sure yet</option>
          </select>
        </FormField>

        {/* Message (optional, no length limit — any amount of text is fine) */}
        <FormField id="contact-message" label="Message" error={errors.message}>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={handleChange}
            placeholder="Tell us about your business and what you would like to achieve."
            className={getInputClasses(errors.message)}
            {...errorProps("message")}
          ></textarea>
        </FormField>

        {/* Spam trap: hidden from real visitors and screen readers */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="contact-website">Leave this field empty</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={handleChange}
          />
        </div>

        {/* Error from the server or the network */}
        {status === "error" && errorMessage && (
          <p
            role="alert"
            className="rounded-xl border border-danger bg-paper p-4 font-medium text-danger"
          >
            {errorMessage} You can also email us at {site.email}.
          </p>
        )}

        <div className="flex flex-col items-start gap-3">
          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Send Message"}
          </Button>
          <p className="text-sm text-ink-soft">
            We only use your details to reply to your enquiry.
          </p>
        </div>
      </form>
    </div>
  );
}

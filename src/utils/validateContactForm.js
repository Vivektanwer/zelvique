// Checks the contact form values and returns error messages.
// It returns an object like { email: "Please enter a valid email address." }.
// An EMPTY object {} means everything is valid.
//
// This file uses no browser code, so the server (Phase 8) can use the same rules.
// The server MUST check again, because anyone can send fake data straight to the server.

import { countries, defaultCountryCode } from "../data/countries.js";

// "validServices" is an optional list of allowed service values (for example the service
// slugs from data/services.js, plus "not-sure"). Pass it so a stranger cannot send the
// server a made-up service name. If you do not pass it, only "is something selected?" is checked.
export function validateContactForm(values, validServices) {
  const errors = {};

  // Turn every value into trimmed text so missing values do not crash the checks
  const name = String(values.name ?? "").trim();
  const email = String(values.email ?? "").trim();
  const phone = String(values.phone ?? "").trim();
  const company = String(values.company ?? "").trim();
  const service = String(values.service ?? "").trim();
  const message = String(values.message ?? "").trim();

  // Name
  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < 2) {
    errors.name = "Your name should have at least 2 characters.";
  } else if (name.length > 100) {
    errors.name = "Your name is too long. Please shorten it.";
  }

  // Email: something@something.something
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
    errors.email = "Please enter a valid email address.";
  }

  // Phone: the visitor picks a country code and types the number WITHOUT it.
  // The rules for each country live in data/countries.js. For India they are:
  //   1. Exactly 10 digits — not fewer, not more
  //   2. The first digit must be 6, 7, 8 or 9 (numbers starting with 0-5 are not valid)
  // If no country is sent we use the default one, so an older form still works.
  const country = countries.find((item) => item.code === (values.country || defaultCountryCode));

  if (!country) {
    errors.phone = "Please choose a country code.";
  } else if (!phone) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^\d+$/.test(phone)) {
    errors.phone = `Please enter digits only. No spaces, dashes or ${country.dial} (it is already added).`;
  } else if (!country.firstDigits && phone.startsWith("0")) {
    errors.phone = "Please enter the number without the leading 0.";
  } else if (phone.length < country.minDigits || phone.length > country.maxDigits) {
    const lengthText =
      country.minDigits === country.maxDigits
        ? `exactly ${country.maxDigits} digits`
        : `between ${country.minDigits} and ${country.maxDigits} digits`;
    errors.phone = `Phone number must be ${lengthText}.`;
  } else if (country.firstDigits && !country.firstDigits.includes(phone[0])) {
    // "6789" -> "6, 7, 8 or 9"
    const allowed = country.firstDigits.split("").join(", ").replace(/, (\d)$/, " or $1");
    errors.phone = `Phone number must start with ${allowed}.`;
  }

  // Company is optional, but not too long
  if (company.length > 100) {
    errors.company = "The company name is too long. Please shorten it.";
  }

  // Service: required, and (when we were given the list) must be one of the real options
  if (!service) {
    errors.service = "Please choose a service.";
  } else if (validServices && !validServices.includes(service)) {
    errors.service = "Please choose a service from the list.";
  }

  // Message is optional, with no length limit — any amount of text is accepted,
  // including leaving it empty.

  return errors;
}

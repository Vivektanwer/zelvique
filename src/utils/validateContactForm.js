// Checks the contact form values and returns error messages.
// It returns an object like { email: "Please enter a valid email address." }.
// An EMPTY object {} means everything is valid.
//
// This file uses no browser code, so the server (Phase 8) can use the same rules.
// The server MUST check again, because anyone can send fake data straight to the server.

export function validateContactForm(values) {
  const errors = {};

  // Turn every value into trimmed text so missing values do not crash the checks
  const name = String(values.name ?? "").trim();
  const email = String(values.email ?? "").trim();
  const phone = String(values.phone ?? "").trim();
  const company = String(values.company ?? "").trim();
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

  // Phone: numbers, spaces, + - ( ) are allowed. Between 7 and 15 digits.
  const phoneDigits = phone.replace(/\D/g, "");
  if (!phone) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^[+0-9\s\-()]+$/.test(phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = "Please enter a valid phone number.";
  }

  // Company is optional, but not too long
  if (company.length > 100) {
    errors.company = "The company name is too long. Please shorten it.";
  }

  // Message
  if (!message) {
    errors.message = "Please tell us about your project.";
  } else if (message.length < 10) {
    errors.message = "Please write at least a few words (10 characters) about your project.";
  } else if (message.length > 2000) {
    errors.message = "Your message is too long. Please keep it under 2000 characters.";
  }

  return errors;
}

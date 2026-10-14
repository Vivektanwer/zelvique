// Shown right after the contact form is sent successfully.
// It automatically goes back to the Home page after a few seconds, but also gives
// the visitor a button in case they want to leave sooner (or their browser blocks
// the automatic redirect, which some do).
//
// This page is set to "noindex" (see src/data/seo.js) because it has no content of
// its own — it should never show up in a Google search.

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button.jsx";
import Container from "../components/Container.jsx";

// How long to wait before leaving automatically
const REDIRECT_SECONDS = 5;

export default function ThankYouPage() {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  // Move the keyboard focus to the heading, the same way a page announces itself to
  // screen reader users after a full page navigation
  const headingRef = useRef(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    // Counts down once a second, purely for the "Redirecting in Ns..." text
    const countdown = setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    // The actual redirect, timed independently of the interval above so it fires
    // exactly once, on time, even if the interval above were ever removed
    const redirect = setTimeout(() => {
      navigate("/");
    }, REDIRECT_SECONDS * 1000);

    // If the visitor leaves this page by hand before the timer finishes, cancel both
    return () => {
      clearInterval(countdown);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span
          aria-hidden="true"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-3xl text-white"
        >
          <i className="bi bi-check2"></i>
        </span>

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="font-heading text-3xl font-bold tracking-tight text-ink outline-none sm:text-4xl"
        >
          Submitted successfully! Thank you for contacting Zelvique.
        </h1>

        <p className="max-w-xl text-lg text-ink-soft">
          We have received your enquiry and will get back to you soon. You should
          also receive a confirmation email shortly.
        </p>

        {/* aria-live announces the changing number to screen readers as it counts down */}
        <p aria-live="polite" className="text-sm text-ink-soft">
          Taking you back to the home page in {secondsLeft}{" "}
          {secondsLeft === 1 ? "second" : "seconds"}...
        </p>

        <Button to="/">Go to Home Now</Button>
      </Container>
    </section>
  );
}

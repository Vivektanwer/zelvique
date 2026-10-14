// Home page, section 1: Hero.
// The <h1> is here. There must be only ONE <h1> per page.
// The small floating cards use text instead of icons (no SVG anywhere).

import Button from "../../components/Button.jsx";
import Container from "../../components/Container.jsx";

export default function HeroSection() {
  return (
    <section className="overflow-hidden pb-20 pt-12 sm:pb-24 sm:pt-16 lg:pt-20">
      <Container className="flex flex-col items-center gap-14 lg:flex-row lg:gap-10">
        {/* Text side */}
        <div className="flex flex-col items-start gap-6 lg:w-[52%]">
          <h1 data-hero className="font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            A website that works as hard as you do.
          </h1>

          <p data-hero className="max-w-xl text-lg text-ink-soft sm:text-xl">
            Zelvique designs and builds fast, mobile-friendly websites, then
            helps you get found and chosen with digital marketing. A simple
            process, clear results and no jargon.
          </p>

          <div data-hero className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <span data-magnetic className="inline-flex"><Button to="/contact">Start a Project <i aria-hidden="true" className="bi bi-arrow-right ml-1"></i></Button></span>
            <Button to="/work" variant="secondary">
              View Our Work
            </Button>
          </div>

          <p data-hero className="text-sm text-ink-soft">
            Free consultation. We reply within 24 hours.
          </p>
        </div>

        {/* Picture side: a drawing of a website made with Tailwind (decorative) */}
        <div data-hero className="w-full lg:w-[48%]">
          <div
            aria-hidden="true"
            className="relative mx-auto w-full max-w-lg pb-8 pt-6 lg:max-w-none"
          >
            {/* The website window */}
            <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-xl">
              {/* Top bar of the window */}
              <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-line"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-line"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-line"></span>
                <span className="ml-3 rounded-md bg-paper px-3 py-1 text-xs text-ink-soft">
                  yourbusiness.com
                </span>
              </div>

              <div className="flex flex-col gap-4 p-4 sm:p-5">
                {/* Big banner of the website */}
                <div className="flex flex-col gap-3 rounded-xl bg-linear-to-br from-brand to-navy p-5 sm:p-7">
                  <span className="h-3.5 w-3/4 rounded-full bg-white"></span>
                  <span className="h-3.5 w-1/2 rounded-full bg-white"></span>
                  <span className="mt-2 h-2 w-2/3 rounded-full bg-white/50"></span>
                  <span className="mt-3 h-9 w-28 rounded-lg bg-accent"></span>
                </div>

                {/* Three small content cards */}
                <div className="flex gap-3">
                  <div className="flex flex-1 flex-col gap-2 rounded-lg bg-brand-soft p-3">
                    <span className="h-6 w-6 rounded-md bg-brand"></span>
                    <span className="h-2 w-full rounded-full bg-brand/30"></span>
                    <span className="h-2 w-2/3 rounded-full bg-brand/30"></span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 rounded-lg bg-brand-soft p-3">
                    <span className="h-6 w-6 rounded-md bg-brand"></span>
                    <span className="h-2 w-full rounded-full bg-brand/30"></span>
                    <span className="h-2 w-2/3 rounded-full bg-brand/30"></span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 rounded-lg bg-brand-soft p-3">
                    <span className="h-6 w-6 rounded-md bg-brand"></span>
                    <span className="h-2 w-full rounded-full bg-brand/30"></span>
                    <span className="h-2 w-2/3 rounded-full bg-brand/30"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card: new enquiry (top right) */}
            <div data-float className="absolute right-0 top-0 flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-lg sm:-right-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-heading text-sm font-bold text-ink">
                1
              </span>
              <span className="flex flex-col text-left">
                <span className="font-heading text-sm font-semibold text-ink">New enquiry</span>
                <span className="text-xs text-ink-soft">Website redesign</span>
              </span>
            </div>

            {/* Floating card: mobile ready (bottom left) */}
            <div data-float className="absolute bottom-0 left-0 flex items-center gap-3 rounded-xl bg-navy px-4 py-3 shadow-lg sm:-left-4">
              <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-base text-white">
                <i className="bi bi-phone-fill"></i>
              </span>
              <span className="flex flex-col text-left">
                <span className="font-heading text-sm font-semibold text-white">Mobile ready</span>
                <span className="text-xs text-white/70">Fast on every screen</span>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

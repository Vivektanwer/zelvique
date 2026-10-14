// One client testimonial.
// A real photo is optional: pass a "photo" prop (path in the "public" folder) to show it.
// Without one, a round badge with the person's initials is shown instead — both look fine.
//
// Usage: <TestimonialCard name="..." role="..." business="..." quote="..." photo="/images/testimonials/priya.jpg" />

export default function TestimonialCard({ name, role, business, quote, photo }) {
  // Initials for the fallback badge, for example "Priya Sharma" -> "PS"
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <figure className="flex w-full flex-col justify-between gap-8 rounded-2xl border border-line bg-white p-6 sm:p-8">
      <blockquote className="text-lg text-ink">&ldquo;{quote}&rdquo;</blockquote>

      <figcaption className="flex items-center gap-4">
        {photo ? (
          <img
            src={photo}
            alt={name}
            width="44"
            height="44"
            loading="lazy"
            decoding="async"
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft font-heading font-semibold text-brand-dark"
          >
            {initials}
          </span>
        )}
        <span className="flex flex-col">
          <span className="font-heading font-semibold text-ink">{name}</span>
          <span className="text-sm text-ink-soft">
            {role}, {business}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

// The small label + big title + short text that starts most sections.
// Uses <h2> because each page has its own <h1> in its hero.
// Use light={true} when the section has a dark background.

export default function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
  className = "",
}) {
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${className}`}>
      {eyebrow && (
        <p
          className={`flex items-center gap-3 text-sm font-medium ${
            light ? "text-white/85" : "text-ink-soft"
          }`}
        >
          {/* small blue line before the label */}
          <span aria-hidden="true" className="h-0.5 w-7 bg-brand"></span>
          {eyebrow}
        </p>
      )}

      <h2
        className={`font-heading text-3xl font-semibold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>

      {text && (
        <p className={`text-lg ${light ? "text-white/85" : "text-ink-soft"}`}>
          {text}
        </p>
      )}
    </div>
  );
}

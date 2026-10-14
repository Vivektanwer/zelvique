// Small helpers for animations. They contain no GSAP code, so they are safe to run anywhere.

// True if the visitor asked their device for less motion (a setting for people who get dizzy or
// distracted by animations). When it is true we do NOT start any animation or smooth scrolling.
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false; // on the server
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Splits a statistic like "50+" or "40%" or "24h" into its parts, so we can count up to it.
//   parseCountText("50+")  -> { prefix: "", number: 50, decimals: 0, suffix: "+", original: "50+" }
// Returns null if the text has no number.
export function parseCountText(text) {
  const match = String(text).trim().match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;

  const [, prefix, numberText, suffix] = match;
  const decimals = numberText.includes(".") ? numberText.split(".")[1].length : 0;

  return {
    prefix,
    number: Number(numberText),
    decimals,
    suffix,
    original: String(text).trim(),
  };
}

// Builds the text shown while counting, for example 37 -> "37%"
export function formatCount(value, parsed) {
  return `${parsed.prefix}${value.toFixed(parsed.decimals)}${parsed.suffix}`;
}

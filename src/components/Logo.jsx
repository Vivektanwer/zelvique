// The Zelvique logo: "Zel" in dark text + "vique" in brand blue.
// Use light={true} on dark backgrounds (like the footer).

import { Link } from "react-router";

export default function Logo({ light = false }) {
  const textColor = light
    ? "text-white focus-visible:outline-accent"
    : "text-ink focus-visible:outline-brand-dark";

  return (
    <Link
      to="/"
      aria-label="Zelvique home"
      className={`font-heading text-2xl font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 ${textColor}`}
    >
      Zel<span className="text-brand">vique</span>
    </Link>
  );
}

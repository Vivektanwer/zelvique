// One button used everywhere on the website.
//
// Examples:
//   <Button to="/contact">Start a Project</Button>                    (blue, goes to a page)
//   <Button to="/work" variant="secondary">View Our Work</Button>      (white with border)
//   <Button to="/contact" variant="accent">Get a Free Consultation</Button>  (amber, use sparingly)
//   <Button type="submit">Send Message</Button>                        (a normal form button)

import { Link } from "react-router";

// Styles every button shares
const baseStyles =
  "inline-flex items-center justify-center rounded-xl font-heading font-semibold transition duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2";

// Colors for each variant
const variants = {
  primary: "bg-brand text-white hover:bg-brand-dark focus-visible:outline-brand-dark",
  secondary: "border border-line bg-white text-ink hover:border-ink focus-visible:outline-brand-dark",
  accent: "bg-accent text-ink hover:bg-accent-dark focus-visible:outline-white",
};

// Sizes
const sizes = {
  md: "px-6 py-3.5 text-base",
  sm: "px-5 py-2.5 text-[15px]",
};

export default function Button({
  to,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}) {
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  // If "to" is given, it is a link to another page
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  // Otherwise it is a normal button (for example a form submit button)
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

// A label + form control + error message, used for every field in the contact form.
//
// Usage:
//   <FormField id="contact-name" label="Name" required error={errors.name}>
//     <input id="contact-name" className={getInputClasses(errors.name)} ... />
//   </FormField>
//
// The error message gets the id "<id>-error", so the input can point to it with aria-describedby.

// Tailwind classes shared by every input, select and textarea
export function getInputClasses(hasError) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-ink-soft/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark ${
    hasError ? "border-danger" : "border-line hover:border-ink-soft"
  }`;
}

export default function FormField({ id, label, required = false, error, className = "", children }) {
  return (
    <div className={`flex min-w-0 flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="font-heading text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-danger">
            {" "}
            *
          </span>
        ) : (
          <span className="font-body font-normal text-ink-soft"> (optional)</span>
        )}
      </label>

      {children}

      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

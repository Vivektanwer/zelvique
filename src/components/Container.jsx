// Keeps page content centered with a maximum width and side spacing.
// Wrap the content of every section in this.

export default function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

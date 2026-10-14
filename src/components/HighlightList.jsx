// A small card with 2-4 icon + title + text rows.
// Used to fill empty side space next to a short intro (see ServicesIntro, WorkIntro, ContactIntro).
//
// Usage:
//   <HighlightList
//     title="Why work with us"
//     items={[{ icon: "bi-lightning-charge-fill", title: "Fast replies", text: "..." }]}
//   />

export default function HighlightList({ title, items }) {
  return (
    <div data-reveal="image" className="flex flex-col gap-1 rounded-2xl border border-line bg-white p-2">
      {title && (
        <p className="px-4 pt-3 font-heading text-sm font-semibold text-ink-soft">{title}</p>
      )}
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item.title} className="flex items-start gap-4 border-t border-line p-4 first:border-t-0">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-lg text-brand-dark"
            >
              <i className={`bi ${item.icon}`}></i>
            </span>
            <span className="flex flex-col gap-0.5 pt-1.5">
              <span className="font-heading font-semibold text-ink">{item.title}</span>
              <span className="text-sm text-ink-soft">{item.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

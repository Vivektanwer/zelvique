// The picture of a project.
// - If the project has an "image" in data/projects.js, a real screenshot is shown.
// - If not, a simple drawing made with Tailwind is shown (no image file needed).
//
// Usage: <ProjectPreview project={project} />
//        <ProjectPreview project={project} className="h-64" />   (change the height)

// Colors of the drawing for each "tone" (set in data/projects.js)
const tones = {
  blue: { background: "bg-brand", window: "bg-white", bar: "bg-line", block: "bg-brand-soft" },
  navy: { background: "bg-navy", window: "bg-white/10", bar: "bg-white/30", block: "bg-white/15" },
  soft: { background: "bg-brand-soft", window: "bg-white", bar: "bg-line", block: "bg-brand" },
};

export default function ProjectPreview({ project, className = "h-48" }) {
  // Real screenshot. "loading=lazy" means it only downloads when the visitor scrolls near it.
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.imageAlt || `${project.name} website preview`}
        width="1200"
        height="750"
        loading="lazy"
        decoding="async"
        className={`w-full rounded-xl object-cover ${className}`}
      />
    );
  }

  // Drawing (decorative, so screen readers skip it)
  const colors = tones[project.tone] || tones.blue;

  return (
    <div
      aria-hidden="true"
      className={`flex items-stretch justify-center overflow-hidden rounded-xl px-6 pt-6 ${colors.background} ${className}`}
    >
      <div className={`flex w-full flex-col gap-3 rounded-t-lg p-4 ${colors.window}`}>
        <span className={`h-3 w-2/3 shrink-0 rounded-full ${colors.bar}`}></span>
        <span className={`h-2 w-1/2 shrink-0 rounded-full ${colors.bar}`}></span>
        <span className="h-5 w-16 shrink-0 rounded-md bg-accent"></span>
        {/* This row grows taller when the picture is taller */}
        <div className="flex min-h-12 flex-1 gap-2 pt-1">
          <span className={`flex-1 rounded-md ${colors.block}`}></span>
          <span className={`flex-1 rounded-md ${colors.block}`}></span>
          <span className={`flex-1 rounded-md ${colors.block}`}></span>
        </div>
      </div>
    </div>
  );
}

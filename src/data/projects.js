// Portfolio projects. Used on the Home page (first 3) and on the Work page (all of them).
// To add a project: copy one item, change the text, and add it to the list.
//
// Fields:
//   slug          = short name used in links (/work#brightside-dental). Letters, numbers and dashes only.
//   name          = project name
//   businessType  = what kind of business it is
//   tone          = color of the drawing when there is no screenshot: "blue", "navy" or "soft"
//   summary       = one short sentence (shown on cards)
//   problem / solution / result = the case study text
//   services      = services we provided
//   technologies  = tools used to build it
//   image         = OPTIONAL real screenshot. Put the file in the "public/images/work" folder and write
//                   "/images/work/your-file.jpg". Use a JPG or WebP about 1200 x 750 pixels.
//   imageAlt      = OPTIONAL description of the screenshot for screen readers and Google
//
// IMPORTANT: these are SAMPLE projects so the design can be built.
// TODO: replace them with your real projects before launching.

export const projects = [
  {
    slug: "brightside-dental",
    name: "Brightside Dental",
    businessType: "Dental clinic",
    tone: "blue",
    summary: "A calm, clear website that makes booking an appointment easy.",
    problem:
      "The old website was slow, hard to use on phones and hid the booking button.",
    solution:
      "We redesigned the site with simple pages, clear treatment information and a booking form on every page.",
    services: ["Website Redesign", "Responsive Design", "Performance Optimization"],
    result: "More online booking requests and much faster page loads.",
    technologies: ["React", "Tailwind CSS", "Node.js"],
  },
  {
    slug: "cedar-and-stone-interiors",
    name: "Cedar & Stone Interiors",
    businessType: "Interior design studio",
    tone: "navy",
    summary: "A portfolio-first website that shows the work and invites enquiries.",
    problem:
      "The studio's work was beautiful, but the website did not show it well and rarely led to enquiries.",
    solution:
      "We built large project pages, a clean layout and a simple enquiry form that guides visitors to get in touch.",
    services: ["Website Design", "Website Development", "UI/UX Improvement"],
    result: "A stronger first impression and better quality enquiries.",
    technologies: ["React", "Tailwind CSS", "GSAP"],
  },
  {
    slug: "fieldnote-coaching",
    name: "Fieldnote Coaching",
    businessType: "Online coaching",
    tone: "soft",
    summary: "A trusted home on the web, backed by a social media plan.",
    problem:
      "The coach only had social media profiles, which made it hard to build trust with new clients.",
    solution:
      "We created a focused website and a social media plan that sends the right people to it.",
    services: ["Website Design", "Digital Marketing", "Social Media Marketing"],
    result: "A professional online presence and a steady flow of new leads.",
    technologies: ["React", "Tailwind CSS", "Node.js"],
  },
];

// Home page, section 7: Featured Work. Shows the first 3 projects from data/projects.js.

import Button from "../../components/Button.jsx";
import Container from "../../components/Container.jsx";
import SectionHeading from "../../components/SectionHeading.jsx";
import ProjectCard from "../../components/ProjectCard.jsx";
import { projects } from "../../data/projects.js";

export default function FeaturedWorkSection() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="py-20 sm:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          data-reveal
          eyebrow="Featured work"
          title="Websites built to get results"
          text="A few projects where better design and clearer messaging helped businesses win more customers."
        />

        <ul className="flex flex-col gap-6 md:flex-row md:flex-wrap">
          {featuredProjects.map((project) => (
            <li
              key={project.slug}
              data-reveal
              className="flex md:w-[calc(50%_-_0.75rem)] lg:w-[calc(33.333%_-_1rem)]"
            >
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>

        <div>
          <Button to="/work" variant="secondary">
            View All Work
          </Button>
        </div>
      </Container>
    </section>
  );
}

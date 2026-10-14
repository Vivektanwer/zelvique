// Work page, section 2 (all of them): the case studies, one after another.
// Created automatically from data/projects.js. To add a project, add it to that file —
// you do not need to touch this component, and the layout keeps looking good with any number of projects.
// Backgrounds alternate (paper / white) to separate the projects.

import CaseStudy from "./CaseStudy.jsx";
import { projects } from "../../data/projects.js";

export default function CaseStudyList() {
  return (
    <>
      {projects.map((project, index) => (
        <CaseStudy key={project.slug} project={project} isWhite={index % 2 === 1} />
      ))}
    </>
  );
}

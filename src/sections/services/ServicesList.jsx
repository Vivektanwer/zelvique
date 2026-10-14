// Services page, section 2 (all of them): the 8 services, one after another.
// Created automatically from data/services.js. To add, remove or edit a service,
// change that file — you do not need to touch this component.
// Backgrounds alternate (paper / white) to separate the services.

import ServiceDetail from "./ServiceDetail.jsx";
import { services } from "../../data/services.js";

export default function ServicesList() {
  return (
    <>
      {services.map((service, index) => (
        <ServiceDetail key={service.slug} service={service} isWhite={index % 2 === 1} />
      ))}
    </>
  );
}

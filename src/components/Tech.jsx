import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { useEffect } from "react";
import { useState } from "react";

const client = sanityClient({
  projectId: 'oz0oe4vn',
  dataset: 'production',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

const Tech = () => {

  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "technologies"]|order(orderRank){
      name,
      icon,
    }`
      )
      .then(async (data) => {
        await setTechnologies(data)
      })
      .catch(console.error);
  }, []);

  return (
    <section className="sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0">
      <span className="hash-span" id="">&nbsp;</span>
      <div className='flex flex-row flex-wrap justify-center gap-10'>
        {technologies.map((technology) => (
          <div className='w-28 h-28' key={technology.name}>
            <BallCanvas icon={builder.image(technology.icon).url()} />
          </div>
        ))} 
        {/* {technologies.map((technology) => (
          <div className='w-28 h-28' key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))} */}
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, "");
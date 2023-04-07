import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <section className="sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0">
      <span className="hash-span" id="">&nbsp;</span>
      <div className='flex flex-row flex-wrap justify-center gap-10'> 
        {technologies.map((technology) => (
          <div className='w-28 h-28' key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, "");
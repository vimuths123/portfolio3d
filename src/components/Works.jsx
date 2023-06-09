import React, { useEffect, useState } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
  projectId: 'oz0oe4vn',
  dataset: 'production',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

const ProjectCard = ({
  index,
  name,
  description,
  // tags,
  image,
  link,
  // source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        {/* {console.log("image -" + image)} */}
        <div className='relative w-full h-[230px]'>
          <img
            src={builder.image(image).url()}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div
              onClick={() => window.open(link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-5 mb-2'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>
        {/* <a className="cursor-pointer" href={link}>Read More..</a> */}

        {/* <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div> */}
      </Tilt>
    </motion.div>
  );
};

const Works = () => {

  const [projectsItems, setProjectsItems] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "projects"]|order(orderRank){
      name,
      description,
      link,
      image
    }`
      )
      .then(async (data) => {
        await setProjectsItems(data)
        // console.log(await setProjectsItems)
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projectsItems.map((project, index) => (
          <ProjectCard key={index} index={index} {...project} />
        ))}
        {/* {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))} */}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
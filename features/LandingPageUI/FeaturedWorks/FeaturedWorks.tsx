import Image from "next/image";
import React from "react";
import WaveForm from "../components/AboutMe/components/WaveForm";
import TimerDisplay from "../components/AboutMe/components/TimerDisplay";

import Box from "./components/Box";
import WorkHeader from "./components/WorkHeader";

const FeaturedWorks = () => {
  return (
    <section className="py-32 px-16 border-x border-light-border border-b">
      <h4 className="font-satoshi text-[22px] text-primary  mb-1 italic">
        // Featured works
      </h4>
      <h3 className="font-satoshi  text-[36px] font-bold text-[#3d3d3d] text-justify  mb-8">
        These are ones that taught me the most
      </h3>
      <WorkHeader />
      <div className="grid grid-cols-2 gap-6 ">
        <Box />
        <Box />
      </div>
    </section>
  );
};

export default FeaturedWorks;

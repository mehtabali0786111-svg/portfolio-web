import AboutMe from "@/features/LandingPageUI/components/AboutMe/AboutMe";
import HeroSection from "@/features/LandingPageUI/components/HeroSection";
import { div } from "motion/react-client";
import React from "react";

function Main() {
  return (
    <div className="max-w-[980px]  mx-auto w-full h-min ">
      <HeroSection />
      <AboutMe />
    </div>
  );
}

export default Main;

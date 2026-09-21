import AboutMe from "@/features/LandingPageUI/components/AboutMe/AboutMe";
import HeroSection from "@/features/LandingPageUI/components/HeroSection";
import FeaturedWorks from "@/features/LandingPageUI/FeaturedWorks/FeaturedWorks";
import { div } from "motion/react-client";
import React from "react";

function Main() {
  return (
    <div className="max-w-[980px]  mx-auto w-full h-min ">
      <HeroSection />
      <AboutMe />
      <FeaturedWorks />
    </div>
  );
}

export default Main;

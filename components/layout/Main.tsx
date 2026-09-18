import HeroSection from "@/features/LandingPageUI/HeroSection";
import { div } from "motion/react-client";
import React from "react";

function Main() {
  return (
    <div className="max-w-[980px] border-x border-gray-100 mx-auto w-full h-min ">
      <HeroSection />
    </div>
  );
}

export default Main;

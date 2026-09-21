import AboutMe from "@/features/LandingPageUI/components/AboutMe/AboutMe";
import HeroSection from "@/features/LandingPageUI/components/HeroSection";
import Experience from "@/features/LandingPageUI/Experience/Experience";
import ExperienceTimeline from "@/features/LandingPageUI/ExperienceTimeline/ExperienceTimeline";
import FeaturedWorks from "@/features/LandingPageUI/FeaturedWorks/FeaturedWorks";
import Service from "@/features/LandingPageUI/Service/Service";
import React from "react";

function Main() {
  return (
    <div className="mx-auto h-min w-full max-w-[980px] px-4 pb-24 md:px-6 md:pb-0 lg:px-0">
      <HeroSection />
      <AboutMe />
      <FeaturedWorks />
      <Experience />
      <ExperienceTimeline />
      <Service />
    </div>
  );
}

export default Main;

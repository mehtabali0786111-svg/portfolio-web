import AboutMe from "@/features/LandingPageUI/components/AboutMe/AboutMe";
import HeroSection from "@/features/LandingPageUI/components/HeroSection";
import ChooseService from "@/features/LandingPageUI/ChooseService/ChooseService";
import Experience from "@/features/LandingPageUI/Experience/Experience";
import ExperienceTimeline from "@/features/LandingPageUI/ExperienceTimeline/ExperienceTimeline";
import FeaturedWorks from "@/features/LandingPageUI/FeaturedWorks/FeaturedWorks";
import Footer from "@/features/LandingPageUI/Footer.tsx/Footer";
import HowItWorks from "@/features/LandingPageUI/HowItWorks/HowItWorks";
import Service from "@/features/LandingPageUI/Service/Service";
import UserReview from "@/features/LandingPageUI/UserReview/UserReview";
import React from "react";
import HangingCard from "@/components/common/HangingCard";
function Main() {
  return (
    <div className="mx-auto h-min w-full max-w-[980px] px-4  md:px-6 md:pb-0 lg:px-0">
      <HeroSection />

      <AboutMe />
      <FeaturedWorks />
      <Experience />
      <ExperienceTimeline />
      <Service />
      <ChooseService />
      <UserReview />
      <HowItWorks />
      <Footer footerInDetail={false} />
    </div>
  );
}

export default Main;

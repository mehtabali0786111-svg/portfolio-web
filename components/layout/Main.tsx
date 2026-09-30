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
import ScrollReveal from "@/components/common/ScrollReveal";
import SmoothScroll from "@/components/common/SmoothScroll";
function Main() {
  return (
    <SmoothScroll>
      <div className="relative mx-auto h-min w-full max-w-[980px] px-4 md:px-6 md:pb-0 lg:px-0">
      <ScrollReveal>
        <HeroSection />
      </ScrollReveal>

      <ScrollReveal>
        <AboutMe />
      </ScrollReveal>
      <ScrollReveal>
        <FeaturedWorks />
      </ScrollReveal>
      <ScrollReveal>
        <Experience />
      </ScrollReveal>
      <ScrollReveal>
        <ExperienceTimeline />
      </ScrollReveal>
      <ScrollReveal>
        <Service />
      </ScrollReveal>
      <ScrollReveal>
        <ChooseService />
      </ScrollReveal>
      <ScrollReveal>
        <UserReview />
      </ScrollReveal>
      <ScrollReveal>
        <HowItWorks />
      </ScrollReveal>
      <ScrollReveal>
        <Footer footerInDetail={false} />
      </ScrollReveal>
      </div>
    </SmoothScroll>
  );
}

export default Main;

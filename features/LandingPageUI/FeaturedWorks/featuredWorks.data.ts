export interface FeaturedWork {
  id: string;
  title: string;
  description: string;
  duration: string;
  year: string;
  company: string;
  role: string;
  logoSrc: string;
  imageSrc: string;
  imageAlt: string;
}

export const featuredWorks: FeaturedWork[] = [
  {
    id: "lumio-design-system",
    title: "Building a Perfect Design System from Zero",
    description:
      "Joined the team when every single screen was built in complete isolation and there were no tokens, no components, no consistency.",
    duration: "4 Months",
    year: "2026",
    company: "Lumio",
    role: "Designer",
    logoSrc: "/images/comp_logo2.png",
    imageSrc: "/images/bannerImage1.jpg",
    imageAlt: "Lumio design system case study",
  },
  {
    id: "trackflow-dashboard",
    title: "Redesigning the Core Dashboard of a SaaS Product",
    description:
      "The old dashboard had 11 years of visual debt. I stripped it back, rebuilt every component in React, and shipped a version that cut user drop-off by 40%.",
    duration: "4 Months",
    year: "2026",
    company: "Trackflow HQ",
    role: "Frontend + designer",
    logoSrc: "/images/comp_logo1.png",
    imageSrc: "/images/work2.jpg",
    imageAlt: "Trackflow dashboard redesign case study",
  },
  {
    id: "orion-marketing-site",
    title: "Launching a Marketing Site in 5 Days",
    description:
      "Startup needed a launch site before their funding announcement. I designed and built the entire thing in Framer - live in 5 days, no handoff needed.",
    duration: "1 week",
    year: "2025",
    company: "Orion Labs",
    role: "Design engineer",
    logoSrc: "/images/comp_logo3.png",
    imageSrc: "/images/work2.jpg",
    imageAlt: "Orion Labs marketing site case study",
  },
  {
    id: "stackwise-onboarding",
    title: "Prototyping an Onboarding Flow That Actually Converts",
    description:
      "The original onboarding had a 60% drop-off at step two. I redesigned the flow in Framer and handed devs production-ready specs.",
    duration: "3 Weeks",
    year: "2025",
    company: "Stackwise app",
    role: "Designer",
    logoSrc: "/images/comp_logo4.png",
    imageSrc: "/images/bannerImage2.jpg",
    imageAlt: "Stackwise onboarding flow case study",
  },
];

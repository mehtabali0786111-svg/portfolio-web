"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaAward, FaBullhorn, FaCalendarAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    number: "01",
    company: "Lumio",
    role: "Design Engineer",
    periodStart: "2025",
    periodEnd: "Present",
    current: true,
    logoSrc: "/images/comp_logo2.png",
    tags: ["React", "Figma", "Design system", "Tailwind"],
    highlight:
      "Built a design system adopted by 4 product teams within 30 days",
    description:
      "Joined as the first design engineer on the team. Owned the entire design-to-code pipeline, built the product's design system from scratch, shipped new features weekly, and made sure nothing got lost between Figma and production.",
  },
  {
    number: "02",
    company: "TrackFlow",
    role: "Frontend Engineer + Designer",
    periodStart: "2023",
    periodEnd: "2024",
    logoSrc: "/images/comp_logo1.png",
    tags: ["React", "Next.js", "TypeScript", "Components"],
    highlight: "Rebuilt the core dashboard and reduced user drop-off by 40%",
    description:
      "Worked closely with product and engineering teams to replace years of visual debt with reusable UI patterns, stronger frontend structure, and cleaner product workflows.",
  },
  {
    number: "03",
    company: "Orion Labs",
    role: "Freelance Design Engineer",
    periodStart: "2023",
    periodEnd: "5 Months",
    logoSrc: "/images/comp_logo3.png",
    tags: ["Motion", "Visual design", "Framer"],
    highlight: "Designed and shipped a launch site in under a week",
    description:
      "Brought strategy, visual design, interaction, and frontend implementation into one workflow so the team could launch before their funding announcement.",
  },
  {
    number: "04",
    company: "Self-Initiated",
    role: "Side Projects & Open Source",
    periodStart: "2022",
    periodEnd: "Ongoing",
    logoSrc: "/images/work_logo1.png",
    tags: ["React", "Next.js", "Open source"],
    highlight:
      "Built public experiments, component libraries, and real products",
    description:
      "Used independent projects to explore new technologies, sharpen product instincts, and practice shipping polished interfaces without waiting for permission.",
  },
];

const ExperienceTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLElement[]>([]);
  const numbersRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const progress = progressRef.current;

    if (!section || !progress) return;

    const ctx = gsap.context(() => {
      gsap.set(progress, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      gsap.to(progress, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "bottom 95%",
          scrub: 1.21,
        },
      });

      itemsRef.current.forEach((item, index) => {
        const number = numbersRef.current[index];
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 30%",
            scrub: 1.2,
          },
        });

        timeline.fromTo(
          item,
          {
            opacity: 0,
            y: 8,
            filter: "blur(1px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power3.out",
          },
        );

        timeline.to(item, {
          opacity: 0,
          y: -24,
          filter: "blur(2px)",
          duration: 0.34,
          ease: "power2.in",
        });

        if (number) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: item,
                start: "top 95%",
                end: "top 2%",
                scrub: 1.15,
              },
            })
            .fromTo(
              number,
              { color: "#7a7a7a", opacity: 0.8, scale: 0.94 },
              {
                color: "#ff5c00",
                opacity: 1,
                scale: 1.06,
                duration: 0.2,
                ease: "power2.out",
              },
            )
            .to(number, {
              color: "#ff5c00",
              opacity: 1,
              scale: 1.06,
              duration: 0.32,
              ease: "none",
            })
            .to(number, {
              color: "#7a7a7a",
              opacity: 0.45,
              scale: 0.94,
              duration: 0.34,
              ease: "power2.in",
            });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-x border-b border-light-border px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-32"
    >
      <h4 className="mb-1 font-satoshi text-[18px] italic text-primary sm:text-[22px]">
        {"// Experience timeline"}
      </h4>
      <h3 className="mb-10 font-satoshi text-[28px] font-bold leading-tight text-[#3d3d3d] sm:text-[36px] sm:text-justify">
        The path that shaped how I build
      </h3>

      <div className="relative [--timeline-row:520px] sm:[--timeline-row:430px]">
        <div
          className="absolute left-[24px] w-[3px] bg-light-border sm:left-[34px]"
          style={{ top: "36px", bottom: "calc(var(--timeline-row) - 36px)" }}
        >
          <div
            ref={progressRef}
            className="absolute left-0 top-0 h-full w-full origin-top bg-primary"
          />
        </div>

        <div className="flex flex-col">
          {experiences.map((experience, index) => (
            <article
              key={experience.number}
              ref={(element) => {
                if (element) itemsRef.current[index] = element;
              }}
              className="grid min-h-[var(--timeline-row)] grid-cols-[58px_1fr] gap-4 opacity-0 sm:grid-cols-[88px_1fr] sm:gap-12"
            >
              <div className="relative z-10 pt-4">
                <div
                  ref={(element) => {
                    if (element) numbersRef.current[index] = element;
                  }}
                  className="flex h-10 w-12 items-center justify-center rounded-lg border border-light-border bg-light-box font-satoshi text-[22px] font-medium italic leading-none text-dark-text sm:w-[68px] sm:text-[28px]"
                >
                  {experience.number}
                </div>
              </div>

              <div className="max-w-[580px]">
                <div className="mb-7 flex items-start gap-3 sm:mb-9">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-light shadow-sm sm:h-[68px] sm:w-[68px]">
                    <Image
                      src={experience.logoSrc}
                      width={42}
                      height={42}
                      alt={`${experience.company} logo`}
                      className="object-contain"
                    />
                  </div>

                  <div className="-mt-1">
                    <p className="font-satoshi text-[15px] leading-tight text-secondary sm:text-[16px]">
                      {experience.company}
                    </p>
                    <h5 className="font-satoshi text-[23px] font-semibold leading-tight text-dark-text sm:text-[26px]">
                      {experience.role}
                    </h5>
                  </div>
                </div>

                <div className="mb-5 flex flex-wrap items-center gap-3 font-satoshi text-[15px] text-dark-text sm:text-[16px]">
                  <FaCalendarAlt className="text-primary" size={18} />
                  <span>{experience.periodStart}</span>
                  <span className="text-secondary">-</span>
                  {experience.current ? (
                    <span className="text-[#1f9f4b]">
                      {experience.periodEnd}
                    </span>
                  ) : (
                    <span className="text-secondary">
                      {experience.periodEnd}
                    </span>
                  )}
                </div>

                <div className="mb-5 flex items-start gap-3">
                  <FaAward className="shrink-0 text-primary" size={18} />
                  <div className="flex flex-wrap gap-2">
                    {experience.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-light-box px-3 py-1 font-satoshi text-[12px] text-light-theme-text/75"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4 flex items-start gap-3">
                  <FaBullhorn
                    className="mt-1 shrink-0 text-primary"
                    size={18}
                  />
                  <p className="font-satoshi text-[16px] font-medium leading-snug text-dark-text">
                    {experience.highlight}
                  </p>
                </div>

                <p className="ml-[30px] max-w-[720px] font-satoshi text-[15px] leading-7 text-secondary sm:text-[16px] sm:leading-8">
                  {experience.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;

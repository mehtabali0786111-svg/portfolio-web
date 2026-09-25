"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  FaAngular,
  FaCloudflare,
  FaCss3Alt,
  FaFigma,
  FaGithub,
  FaHtml5,
  FaJs,
  FaReact,
  FaVuejs,
} from "react-icons/fa6";
import {
  SiDjango,
  SiFramer,
  SiGreensock,
  SiNextdotjs,
  SiRadixui,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

const CONTRIBUTION_COLS = 30;
const CONTRIBUTION_ROWS = 6;
const FIRST_CONTRIBUTION_DATE = new Date("2026-01-05T00:00:00");

const contributionCells = Array.from(
  { length: CONTRIBUTION_COLS * CONTRIBUTION_ROWS },
  (_, index) => {
    const seed = (index * 5 + Math.floor(index / CONTRIBUTION_COLS) * 23) % 11;

    if (seed <= 2) return 0;
    if (seed <= 5) return 1;
    if (seed <= 8) return 2;
    return 3;
  },
);

const contributionColors = [
  "bg-[var(--contribution-empty)]",
  "bg-[var(--contribution-low)]",
  "bg-[var(--contribution-medium)]",
  "bg-[var(--contribution-high)]",
  "bg-[var(--contribution-peak)]",
];

const techIcons = [
  FaHtml5,
  SiTailwindcss,
  FaCloudflare,
  SiGreensock,
  FaJs,
  FaAngular,
  FaVuejs,
  FaGithub,
  SiDjango,
  FaReact,
  FaFigma,
  SiFramer,
  SiNextdotjs,
  FaCss3Alt,
  SiTypescript,
  SiRadixui,
  SiVercel,
];

const iconRows = [techIcons, [...techIcons.slice(9), ...techIcons.slice(0, 9)]];

interface HoveredCell {
  index: number;
  contributions: number;
  date: string;
}

const getContributionDate = (index: number) => {
  const date = new Date(FIRST_CONTRIBUTION_DATE);
  date.setDate(date.getDate() + index);

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(date);
};

const Grid = () => {
  const cardRef = useRef<HTMLElement>(null);
  const trackRefs = useRef<HTMLDivElement[]>([]);
  const [hoveredCell, setHoveredCell] = useState<HoveredCell | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      trackRefs.current.forEach((track, index) => {
        const distance = track.scrollWidth / 2;
        const isReverse = index % 2 === 1;

        gsap.fromTo(
          track,
          { x: isReverse ? -distance : 0 },
          {
            x: isReverse ? 0 : -distance,
            duration: distance / 22,
            ease: "none",
            repeat: -1,
            yoyo: true,
          },
        );
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={cardRef}
      className="rounded-2xl border border-light-border bg-light shadow-lg"
    >
      <div className="px-5 pt-6 pb-6 sm:px-8 sm:pt-8 sm:pb-7">
        <div className="font-satoshi text-[16px] font-bold text-dark-text sm:text-[18px]">
          @mehtab_ali
        </div>
        <p className="mb-7 font-satoshi text-[12px] text-secondary sm:text-[14px]">
          879 contributions in the template timeline
        </p>

        <div className="relative w-full pb-8">
          {/* SCROLLING AREA */}
          <div className="overflow-x-hidden">
            <div
              className="relative grid min-w-[680px] gap-1.5"
              style={{
                gridTemplateColumns: `repeat(${CONTRIBUTION_COLS}, minmax(0, 1fr))`,
              }}
            >
              {contributionCells.map((level, index) => (
                <div
                  key={index}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();

                    setHoveredCell({
                      index,
                      contributions: Math.floor(Math.random() * 18),
                      date: getContributionDate(index),

                      // Position relative to viewport
                      x: rect.left + rect.width / 2,
                      y: rect.top,
                    });
                  }}
                  onMouseLeave={() => setHoveredCell(null)}
                  className={`relative aspect-square rounded-[3px] transition-transform duration-150 hover:z-20 hover:scale-110 ${contributionColors[level]}`}
                />
              ))}
            </div>
          </div>

          {/* TOOLTIP IS OUTSIDE THE SCROLL CONTAINER */}
          {hoveredCell && (
            <div
              className="
        pointer-events-none
        fixed
        z-[9999]
        w-max
        -translate-x-1/2
        -translate-y-full
        rounded-md
        bg-[#77777c]
        px-3
        py-2
        font-satoshi
        text-[12px]
        font-bold
        text-light
        shadow-lg
      "
              style={{
                left: hoveredCell.x,
                top: hoveredCell.y - 10,
              }}
            >
              {hoveredCell.contributions}{" "}
              {hoveredCell.contributions === 1
                ? "contribution"
                : "contributions"}{" "}
              on {hoveredCell.date}
              {/* Arrow */}
              <span
                className="
          absolute
          left-1/2
          top-full
          h-2
          w-2
          -translate-x-1/2
          -translate-y-1/2
          rotate-45
          bg-[#77777c]
        "
              />
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-light-border py-6">
        <div
          className="space-y-5 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          {iconRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex overflow-hidden">
              <div
                ref={(node) => {
                  if (node) trackRefs.current[rowIndex] = node;
                }}
                className="flex min-w-max will-change-transform"
              >
                {[0, 1].map((copyIndex) => (
                  <div
                    key={copyIndex}
                    className="flex shrink-0 gap-5 pr-5"
                    aria-hidden={copyIndex === 1}
                  >
                    {row.map((Icon, iconIndex) => (
                      <div
                        key={`${copyIndex}-${rowIndex}-${iconIndex}`}
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-light-box text-dark-text opacity-80 shadow-sm grayscale-[0.2] transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-16 sm:w-16"
                      >
                        <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Grid;

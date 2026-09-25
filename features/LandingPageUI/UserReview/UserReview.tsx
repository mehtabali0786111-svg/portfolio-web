"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from "react-icons/fa6";

// =======================================================
// TYPES
// =======================================================

type Direction = "next" | "previous";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

// =======================================================
// TESTIMONIAL DATA
// =======================================================

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Product Designer",
    quote:
      "The team transformed our entire digital experience. Every interaction feels thoughtful and refined.",
    image: "/images/person1.jpg",
  },
  {
    id: 2,
    name: "James Anderson",
    role: "Creative Director",
    quote:
      "Their attention to detail and ability to turn complex ideas into simple experiences was impressive.",
    image: "/images/person2.jpg",
  },
  {
    id: 3,
    name: "Emily Carter",
    role: "Marketing Manager",
    quote:
      "A smooth and collaborative process from beginning to end. The final product exceeded our expectations.",
    image: "/images/person3.jpg",
  },
  {
    id: 4,
    name: "Daniel Wilson",
    role: "Founder",
    quote:
      "They understood our vision immediately and created something that felt unique to our brand.",
    image: "/images/personal.png",
  },
  {
    id: 5,
    name: "Olivia Thompson",
    role: "Brand Strategist",
    quote:
      "The design feels elegant, purposeful, and incredibly easy to use. We loved working with the team.",
    image: "/images/person_pic.jpg",
  },
];

// =======================================================
// CENTER COLUMN
// =======================================================

const CENTER_CELL_SIZE = 76;
const CENTER_GAP = 8;

const ROW_COUNT = 11;

const IMAGE_ROWS = [2, 4, 6, 8, 10];

const CENTER_STEP = CENTER_CELL_SIZE + CENTER_GAP;

const CENTER_TRACK_HEIGHT =
  ROW_COUNT * CENTER_CELL_SIZE + (ROW_COUNT - 1) * CENTER_GAP;

// =======================================================
// LEFT COLUMN
// All cells are >= CENTER_CELL_SIZE
// =======================================================

const LEFT_CELL_WIDTH = 76;

const LEFT_GAP = 8;

const LEFT_HEIGHTS = [88, 108, 76, 94, 82, 116, 78, 104, 86];

const LEFT_ROW_COUNT = LEFT_HEIGHTS.length;

// =======================================================
// RIGHT COLUMN
// All cells are >= CENTER_CELL_SIZE
// =======================================================

const RIGHT_CELL_WIDTH = 76;

const RIGHT_GAP = 8;

const RIGHT_HEIGHTS = [106, 78, 112, 86, 120, 76, 98, 84, 110, 80, 104];

const RIGHT_ROW_COUNT = RIGHT_HEIGHTS.length;

// =======================================================
// VIEWPORT
// =======================================================

const VIEWPORT_HEIGHT = CENTER_CELL_SIZE + CENTER_STEP;

// Center of the visible grid
const VIEWPORT_CENTER = VIEWPORT_HEIGHT / 2;

// =======================================================
// ALIGNMENT HELPERS
// =======================================================

/**
 * Calculates the Y position required to place
 * the selected cell's center at the viewport center.
 *
 * Supports irregular cell heights.
 */
const getIrregularMiddleAlignedY = (
  heights: number[],
  gap: number,
  middleIndex: number,
) => {
  const middleCellHeight = heights[middleIndex];

  let heightBeforeMiddle = 0;

  for (let i = 0; i < middleIndex; i++) {
    heightBeforeMiddle += heights[i] + gap;
  }

  return VIEWPORT_CENTER - heightBeforeMiddle - middleCellHeight / 2;
};

// =======================================================
// MIDDLE INDICES
// =======================================================

const LEFT_MIDDLE_INDEX = Math.floor(LEFT_ROW_COUNT / 2);

const CENTER_MIDDLE_INDEX = Math.floor(ROW_COUNT / 2);

const RIGHT_MIDDLE_INDEX = Math.floor(RIGHT_ROW_COUNT / 2);

// =======================================================
// BASE POSITIONS
// =======================================================

const LEFT_BASE_Y = getIrregularMiddleAlignedY(
  LEFT_HEIGHTS,
  LEFT_GAP,
  LEFT_MIDDLE_INDEX,
);

const RIGHT_BASE_Y = getIrregularMiddleAlignedY(
  RIGHT_HEIGHTS,
  RIGHT_GAP,
  RIGHT_MIDDLE_INDEX,
);

// Center base alignment
const CENTER_BASE_Y =
  VIEWPORT_CENTER - CENTER_MIDDLE_INDEX * CENTER_STEP - CENTER_CELL_SIZE / 2;

// =======================================================
// CENTER POSITION
// =======================================================

const getCenterY = (index: number) => {
  const imageRow = IMAGE_ROWS[index];

  return CENTER_BASE_Y - (imageRow - CENTER_MIDDLE_INDEX) * CENTER_STEP;
};

// =======================================================
// COMPONENT
// =======================================================

export default function TestimonialGrid() {
  const [activeIndex, setActiveIndex] = useState(0);

  const [isAnimating, setIsAnimating] = useState(false);

  const centerColumnRef = useRef<HTMLDivElement | null>(null);

  const leftColumnRef = useRef<HTMLDivElement | null>(null);

  const rightColumnRef = useRef<HTMLDivElement | null>(null);

  const activeTestimonial = testimonials[activeIndex];

  // =====================================================
  // NAVIGATION STATE
  // =====================================================

  const isFirstTestimonial = activeIndex === 0;

  const isLastTestimonial = activeIndex === testimonials.length - 1;

  const canGoPrevious = !isFirstTestimonial && !isAnimating;

  const canGoNext = !isLastTestimonial && !isAnimating;

  // =====================================================
  // ANIMATION
  // =====================================================

  const animateColumns = useCallback(
    (nextIndex: number) => {
      if (
        !centerColumnRef.current ||
        !leftColumnRef.current ||
        !rightColumnRef.current
      ) {
        return;
      }

      const currentCenterY = getCenterY(activeIndex);

      const nextCenterY = getCenterY(nextIndex);

      const centerMovementDirection = nextCenterY < currentCenterY ? -1 : 1;

      const oppositeMovement = centerMovementDirection === -1 ? 1 : -1;

      // Side columns move outward during the transition.
      const sideTravel = CENTER_STEP * 3;

      const leftStartY = LEFT_BASE_Y + oppositeMovement * sideTravel;

      const rightStartY = RIGHT_BASE_Y + oppositeMovement * sideTravel;

      const timeline = gsap.timeline({
        onStart: () => {
          setIsAnimating(true);
        },

        onComplete: () => {
          setIsAnimating(false);
        },

        onInterrupt: () => {
          setIsAnimating(false);
        },
      });

      // =================================================
      // CENTER COLUMN
      // =================================================

      timeline.to(
        centerColumnRef.current,
        {
          y: nextCenterY,
          duration: 0.85,
          ease: "power3.inOut",
        },
        0,
      );

      // =================================================
      // LEFT COLUMN
      // =================================================

      timeline.fromTo(
        leftColumnRef.current,
        {
          y: LEFT_BASE_Y,
        },
        {
          y: leftStartY,
          duration: 0.38,
          ease: "power2.out",
        },
        0,
      );

      timeline.to(
        leftColumnRef.current,
        {
          y: LEFT_BASE_Y,
          duration: 0.47,
          ease: "power3.inOut",
        },
        0.38,
      );

      // =================================================
      // RIGHT COLUMN
      // =================================================

      timeline.fromTo(
        rightColumnRef.current,
        {
          y: RIGHT_BASE_Y,
        },
        {
          y: rightStartY,
          duration: 0.38,
          ease: "power2.out",
        },
        0,
      );

      timeline.to(
        rightColumnRef.current,
        {
          y: RIGHT_BASE_Y,
          duration: 0.47,
          ease: "power3.inOut",
        },
        0.38,
      );
    },
    [activeIndex],
  );

  // =====================================================
  // SAFE NAVIGATION
  // =====================================================

  const handleNavigation = useCallback(
    (direction: Direction) => {
      if (isAnimating) return;

      if (direction === "previous" && activeIndex === 0) {
        return;
      }

      if (direction === "next" && activeIndex === testimonials.length - 1) {
        return;
      }

      const nextIndex =
        direction === "next" ? activeIndex + 1 : activeIndex - 1;

      if (nextIndex < 0 || nextIndex >= testimonials.length) {
        return;
      }

      animateColumns(nextIndex);

      setActiveIndex(nextIndex);
    },
    [activeIndex, animateColumns, isAnimating],
  );

  // =====================================================
  // INITIAL POSITIONS
  // =====================================================

  useEffect(() => {
    if (
      !centerColumnRef.current ||
      !leftColumnRef.current ||
      !rightColumnRef.current
    ) {
      return;
    }

    gsap.set(centerColumnRef.current, {
      y: getCenterY(0),
    });

    gsap.set(leftColumnRef.current, {
      y: LEFT_BASE_Y,
    });

    gsap.set(rightColumnRef.current, {
      y: RIGHT_BASE_Y,
    });
  }, []);

  // =====================================================
  // KEYBOARD NAVIGATION
  // =====================================================

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't intercept arrow keys while typing in a form.
      const target = event.target as HTMLElement | null;

      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;

      if (isTyping) return;

      if (event.key === "ArrowRight") {
        handleNavigation("next");
      }

      if (event.key === "ArrowLeft") {
        handleNavigation("previous");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNavigation]);

  // =====================================================
  // CLEANUP
  // =====================================================

  useEffect(() => {
    return () => {
      if (centerColumnRef.current) {
        gsap.killTweensOf(centerColumnRef.current);
      }

      if (leftColumnRef.current) {
        gsap.killTweensOf(leftColumnRef.current);
      }

      if (rightColumnRef.current) {
        gsap.killTweensOf(rightColumnRef.current);
      }
    };
  }, []);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section className="border-x border-b border-light-border px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-32">
      <h4 className="mb-1 font-satoshi text-[18px] italic text-primary sm:text-[22px]">
        {"// Featured works"}
      </h4>
      <h3 className="mb-8 font-satoshi text-[28px] font-bold leading-tight text-[#3d3d3d] sm:text-[36px] sm:text-justify">
        These are ones that taught me the most
      </h3>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        {/* =================================================
            GRID CONTAINER
        ================================================= */}

        <div
          className="relative shrink-0"
          style={{
            width: `${
              LEFT_CELL_WIDTH +
              CENTER_CELL_SIZE +
              RIGHT_CELL_WIDTH +
              CENTER_GAP * 2
            }px`,
            height: `${VIEWPORT_HEIGHT}px`,
          }}
        >
          {/* =================================================
              GRID FADE MASK
          ================================================= */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-12"
            style={{
              background:
                "linear-gradient(to bottom, #23222233, rgb(177 177 177 / 0%))",
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-12"
            style={{
              background:
                "linear-gradient(to top, #23222233, rgb(177 177 177 / 0%))",
            }}
          />

          {/* =================================================
              COLUMNS
          ================================================= */}

          <div
            className="absolute inset-0 flex items-start justify-center"
            style={{
              gap: `${CENTER_GAP}px`,
            }}
          >
            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div
              className="relative overflow-hidden"
              style={{
                width: `${LEFT_CELL_WIDTH}px`,
                height: `${VIEWPORT_HEIGHT}px`,
              }}
            >
              <div
                ref={leftColumnRef}
                className="absolute left-0 top-0 flex flex-col"
                style={{
                  gap: `${LEFT_GAP}px`,
                }}
              >
                {LEFT_HEIGHTS.map((height, index) => (
                  <div
                    key={`left-cell-${index}`}
                    className="shrink-0 rounded-[8px] border border-[#e8e5df] bg-[#f7f6f3]"
                    style={{
                      width: `${LEFT_CELL_WIDTH}px`,
                      height: `${height}px`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* =================================================
                CENTER COLUMN
            ================================================= */}

            <div
              className="relative overflow-hidden"
              style={{
                width: `${CENTER_CELL_SIZE}px`,
                height: `${VIEWPORT_HEIGHT}px`,
              }}
            >
              <div
                ref={centerColumnRef}
                className="absolute left-0 top-0 flex flex-col"
                style={{
                  gap: `${CENTER_GAP}px`,
                }}
              >
                {Array.from({
                  length: ROW_COUNT,
                }).map((_, index) => {
                  const imageIndex = IMAGE_ROWS.indexOf(index);

                  const hasImage = imageIndex !== -1;

                  return (
                    <div
                      key={`center-cell-${index}`}
                      className="relative shrink-0 overflow-hidden rounded-[8px] border border-[#e8e5df] bg-[#f7f6f3]"
                      style={{
                        width: `${CENTER_CELL_SIZE}px`,
                        height: `${CENTER_CELL_SIZE}px`,
                      }}
                    >
                      {hasImage && (
                        <Image
                          src={testimonials[imageIndex].image}
                          alt={testimonials[imageIndex].name}
                          fill
                          sizes={`${CENTER_CELL_SIZE}px`}
                          className="object-cover"
                          priority={imageIndex === 0}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =================================================
                RIGHT COLUMN
            ================================================= */}

            <div
              className="relative overflow-hidden"
              style={{
                width: `${RIGHT_CELL_WIDTH}px`,
                height: `${VIEWPORT_HEIGHT}px`,
              }}
            >
              <div
                ref={rightColumnRef}
                className="absolute left-0 top-0 flex flex-col"
                style={{
                  gap: `${RIGHT_GAP}px`,
                }}
              >
                {RIGHT_HEIGHTS.map((height, index) => (
                  <div
                    key={`right-cell-${index}`}
                    className="shrink-0 rounded-[8px] border border-[#e8e5df] bg-[#f7f6f3]"
                    style={{
                      width: `${RIGHT_CELL_WIDTH}px`,
                      height: `${height}px`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            TESTIMONIAL CONTENT
        ================================================= */}

        <div className="flex w-full max-w-xl flex-col">
          {/* QUOTE ICON */}

          <div className="mb-5">
            <FaQuoteLeft size={52} className="text-primary" />
          </div>

          {/* QUOTE */}

          <div
            key={activeTestimonial.id}
            className="animate-[fadeIn_0.5s_ease-in-out]"
          >
            <blockquote className="max-w-lg text-2xl font-satoshi leading-[1.2] tracking-tight text-dark-text sm:text-3xl lg:text-[32px]">
              {activeTestimonial.quote}
            </blockquote>

            {/* AUTHOR */}

            <div className="mt-7">
              <p className="text-sm font-medium text-neutral-900">
                {activeTestimonial.name}
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                {activeTestimonial.role}
              </p>
            </div>
          </div>

          {/* =================================================
              CONTROLS
          ================================================= */}

          <div className="mt-8 flex items-center gap-2">
            {/* PREVIOUS */}

            <button
              type="button"
              aria-label="Previous testimonial"
              aria-disabled={!canGoPrevious}
              disabled={!canGoPrevious}
              onClick={() => handleNavigation("previous")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dedbd5] text-sm text-neutral-700 transition-all duration-300 text-primary hover:border-primary disabled:pointer-events-none disabled:opacity-35"
            >
              <FaArrowLeft />
            </button>

            {/* NEXT */}

            <button
              type="button"
              aria-label="Next testimonial"
              aria-disabled={!canGoNext}
              disabled={!canGoNext}
              onClick={() => handleNavigation("next")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dedbd5] text-sm text-neutral-700 transition-all duration-300 text-primary hover:border-primary disabled:pointer-events-none disabled:opacity-35"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* =================================================
          ANIMATION
      ================================================= */}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1023px) {
          /* Keep the grid and content comfortably sized on mobile. */
        }
      `}</style>
    </section>
  );
}

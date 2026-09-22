"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from "react-icons/fa6";
import gsap from "gsap";

type Direction = "next" | "prev";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marcus Reid",
    role: "Co-founder",
    company: "Orion Labs",
    text: "Working with Zolt was a different experience. He didn't just deliver designs he delivered a working product.",
    image: "/images/person1.jpg",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    role: "Product Manager",
    company: "Nova Studio",
    text: "The attention to detail and commitment to quality made the entire project feel effortless. The final result exceeded our expectations.",
    image: "/images/person2.jpg",
  },
  {
    id: 3,
    name: "Daniel Cooper",
    role: "Founder",
    company: "Pixel Works",
    text: "From the first conversation to the final delivery, everything was thoughtful, professional, and focused on building something meaningful.",
    image: "/images/person3.jpg",
  },
  {
    id: 4,
    name: "Emily Carter",
    role: "Creative Director",
    company: "North Studio",
    text: "A rare combination of creativity and technical execution. Every decision was made with the user experience in mind.",
    image: "/images/person_pic.jpg",
  },
];

const ROWS = 5;

/*
|--------------------------------------------------------------------------
| Grid animation values
|--------------------------------------------------------------------------
|
| Center column:
|   base  = -24
|   pulse = -38
|
| Side columns:
|   base  = +24
|   pulse = +38
|
| Image cell:
|   base  = +24
|   pulse = +38
|
| This means:
|
| Center column       -24
| Image cell inside   +24
| -------------------------
| Net image movement    0
|
| So the image stays physically centered.
|--------------------------------------------------------------------------
*/

const CENTER_BASE_Y = -24;
const CENTER_PULSE_Y = -38;

const SIDE_BASE_Y = 24;
const SIDE_PULSE_Y = 38;

const IMAGE_BASE_Y = 24;
const IMAGE_PULSE_Y = 38;

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTestimonial = testimonials[activeIndex];

  /*
  |--------------------------------------------------------------------------
  | Refs
  |--------------------------------------------------------------------------
  */

  const sectionRef = useRef<HTMLElement>(null);

  const leftColumnRef = useRef<HTMLDivElement>(null);
  const centerColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  const imageCellRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);

  /*
  |--------------------------------------------------------------------------
  | State refs
  |--------------------------------------------------------------------------
  */

  const directionRef = useRef<Direction>("next");

  const isAnimatingRef = useRef(false);

  const firstRenderRef = useRef(true);

  /*
  |--------------------------------------------------------------------------
  | Initial grid position
  |--------------------------------------------------------------------------
  |
  | The center column moves upward.
  | The side columns move downward.
  | The image cell compensates for the center movement.
  |--------------------------------------------------------------------------
  */

  useLayoutEffect(() => {
    const left = leftColumnRef.current;
    const center = centerColumnRef.current;
    const right = rightColumnRef.current;
    const imageCell = imageCellRef.current;

    if (!left || !center || !right || !imageCell) {
      return;
    }

    const ctx = gsap.context(() => {
      /*
      ---------------------------------------------------------------
      Initial positions
      ---------------------------------------------------------------
      */

      gsap.set(center, {
        y: CENTER_BASE_Y,
      });

      gsap.set([left, right], {
        y: SIDE_BASE_Y,
      });

      gsap.set(imageCell, {
        y: IMAGE_BASE_Y,
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Testimonial content / image animation
  |--------------------------------------------------------------------------
  */

  useLayoutEffect(() => {
    const content = contentRef.current;
    const imageWrapper = imageWrapperRef.current;

    if (!content || !imageWrapper) {
      return;
    }

    const direction = directionRef.current;

    const enterX = direction === "next" ? 45 : -45;
    const enterY = direction === "next" ? 15 : -15;

    /*
    ----------------------------------------------------------------------
    First render
    ----------------------------------------------------------------------
    */

    if (firstRenderRef.current) {
      firstRenderRef.current = false;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          content,
          {
            opacity: 0,
            x: 35,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
          },
        );

        gsap.fromTo(
          imageWrapper,
          {
            opacity: 0,
            scale: 1.08,
            y: 12,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          },
        );
      }, sectionRef);

      return () => {
        ctx.revert();
      };
    }

    /*
    ----------------------------------------------------------------------
    Subsequent testimonial changes
    ----------------------------------------------------------------------
    */

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        {
          opacity: 0,
          x: enterX,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.55,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        imageWrapper,
        {
          opacity: 0,
          x: direction === "next" ? 15 : -15,
          y: enterY,
          scale: 1.08,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: "power3.out",
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        },
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [activeIndex]);

  /*
  |--------------------------------------------------------------------------
  | Grid pulse animation
  |--------------------------------------------------------------------------
  |
  | Every click produces a new visible movement.
  |
  | Center  : upward
  | Sides   : downward
  | Image   : downward compensation
  |--------------------------------------------------------------------------
  */

  const animateGrid = () => {
    const left = leftColumnRef.current;
    const center = centerColumnRef.current;
    const right = rightColumnRef.current;
    const imageCell = imageCellRef.current;

    if (!left || !center || !right || !imageCell) {
      return;
    }

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    /*
    ----------------------------------------------------------------------
    Move farther in opposite directions
    ----------------------------------------------------------------------
    */

    tl.to(
      center,
      {
        y: CENTER_PULSE_Y,
        duration: 0.22,
      },
      0,
    )
      .to(
        [left, right],
        {
          y: SIDE_PULSE_Y,
          duration: 0.22,
        },
        0,
      )
      .to(
        imageCell,
        {
          y: IMAGE_PULSE_Y,
          duration: 0.22,
        },
        0,
      );

    /*
    ----------------------------------------------------------------------
    Return to normal positions
    ----------------------------------------------------------------------
    */

    tl.to(
      center,
      {
        y: CENTER_BASE_Y,
        duration: 0.4,
        ease: "power3.inOut",
      },
      0.22,
    )
      .to(
        [left, right],
        {
          y: SIDE_BASE_Y,
          duration: 0.4,
          ease: "power3.inOut",
        },
        0.22,
      )
      .to(
        imageCell,
        {
          y: IMAGE_BASE_Y,
          duration: 0.4,
          ease: "power3.inOut",
        },
        0.22,
      );
  };

  /*
  |--------------------------------------------------------------------------
  | Change testimonial
  |--------------------------------------------------------------------------
  */

  const changeTestimonial = (direction: Direction) => {
    if (isAnimatingRef.current) {
      return;
    }

    const content = contentRef.current;
    const image = imageWrapperRef.current;

    if (!content || !image) {
      return;
    }

    isAnimatingRef.current = true;

    directionRef.current = direction;

    /*
    ----------------------------------------------------------------------
    Calculate new index
    ----------------------------------------------------------------------
    */

    const nextIndex =
      direction === "next"
        ? (activeIndex + 1) % testimonials.length
        : (activeIndex - 1 + testimonials.length) % testimonials.length;

    /*
    ----------------------------------------------------------------------
    Animate current content OUT
    ----------------------------------------------------------------------
    */

    const exitX = direction === "next" ? -45 : 45;
    const exitY = direction === "next" ? -10 : 10;

    const contentTimeline = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
      },
      onComplete: () => {
        /*
        ---------------------------------------------------------------
        Change React state only after the old content has left.
        ---------------------------------------------------------------
        */

        setActiveIndex(nextIndex);
      },
    });

    /*
    ----------------------------------------------------------------------
    Text exit
    ----------------------------------------------------------------------
    */

    contentTimeline.to(
      content,
      {
        opacity: 0,
        x: exitX,
        duration: 0.28,
      },
      0,
    );

    /*
    ----------------------------------------------------------------------
    Image exit
    ----------------------------------------------------------------------
    */

    contentTimeline.to(
      image,
      {
        opacity: 0,
        x: direction === "next" ? -12 : 12,
        y: exitY,
        scale: 0.96,
        duration: 0.28,
      },
      0,
    );

    /*
    ----------------------------------------------------------------------
    Grid moves at the same time
    ----------------------------------------------------------------------
    */

    animateGrid();
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <section
      ref={sectionRef}
      aria-label="Testimonials"
      className="relative w-full overflow-hidden bg-[#fafafa] px-6 py-20 sm:px-10 lg:px-16"
    >
      {/* Background dots */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(#d5d5d5 0.9px, transparent 0.9px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ========================================================== */}
        {/* HEADER */}
        {/* ========================================================== */}

        <header className="mb-16">
          <p className="mb-4 text-base font-medium italic text-orange-500 sm:text-lg">
            // good words
          </p>

          <h2 className="max-w-5xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-neutral-800 sm:text-4xl md:text-5xl lg:text-[48px]">
            some good words from people I&apos;ve worked with
          </h2>
        </header>

        {/* ========================================================== */}
        {/* MAIN */}
        {/* ========================================================== */}

        <div className="grid items-center gap-16 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-20 xl:grid-cols-[340px_minmax(0,1fr)]">
          {/* ======================================================== */}
          {/* IMAGE GRID */}
          {/* ======================================================== */}

          <div className="flex justify-center lg:justify-start">
            <div
              className="
                grid
                grid-cols-3
                gap-x-2
                sm:gap-x-3
              "
            >
              {/* ==================================================== */}
              {/* LEFT COLUMN */}
              {/* ==================================================== */}

              <div ref={leftColumnRef} className="flex flex-col gap-2 sm:gap-3">
                {Array.from({ length: ROWS }).map((_, index) => (
                  <GridCell key={`left-${index}`} />
                ))}
              </div>

              {/* ==================================================== */}
              {/* CENTER COLUMN */}
              {/* ==================================================== */}

              <div
                ref={centerColumnRef}
                className="flex flex-col gap-2 sm:gap-3"
              >
                {Array.from({ length: ROWS }).map((_, index) => {
                  const isImageCell = index === 2;

                  if (!isImageCell) {
                    return <GridCell key={`center-${index}`} />;
                  }

                  return (
                    <div
                      key={`center-image-${activeTestimonial.id}`}
                      ref={imageCellRef}
                      className="
                          relative
                          h-16
                          w-16
                          shrink-0
                          overflow-hidden
                          rounded-[10px]
                          border
                          border-neutral-200
                          bg-white
                          sm:h-20
                          sm:w-20
                        "
                    >
                      {/* ================================================= */}
                      {/* IMAGE */}
                      {/* ================================================= */}

                      <div
                        ref={imageWrapperRef}
                        className="absolute inset-0 overflow-hidden rounded-[9px]"
                      >
                        <Image
                          key={activeTestimonial.id}
                          src={activeTestimonial.image}
                          alt={`${activeTestimonial.name} profile`}
                          fill
                          priority={activeIndex === 0}
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ==================================================== */}
              {/* RIGHT COLUMN */}
              {/* ==================================================== */}

              <div
                ref={rightColumnRef}
                className="flex flex-col gap-2 sm:gap-3"
              >
                {Array.from({ length: ROWS }).map((_, index) => (
                  <GridCell key={`right-${index}`} />
                ))}
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* TESTIMONIAL CONTENT */}
          {/* ======================================================== */}

          <div className="min-w-0">
            <div ref={contentRef} className="max-w-3xl">
              {/* ==================================================== */}
              {/* QUOTE ICON */}
              {/* ==================================================== */}

              <FaQuoteLeft
                aria-hidden="true"
                className="mb-8 h-12 w-12 text-orange-500"
              />

              {/* ==================================================== */}
              {/* QUOTE */}
              {/* ==================================================== */}

              <blockquote
                key={`quote-${activeTestimonial.id}`}
                className="text-2xl font-medium leading-[1.32] tracking-[-0.03em] text-neutral-800 sm:text-3xl lg:text-[32px]"
              >
                {activeTestimonial.text}
              </blockquote>

              {/* ==================================================== */}
              {/* AUTHOR */}
              {/* ==================================================== */}

              <div key={`author-${activeTestimonial.id}`} className="mt-8">
                <p className="text-base font-medium text-neutral-600">
                  {activeTestimonial.name}
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  {activeTestimonial.role}, {activeTestimonial.company}
                </p>
              </div>
            </div>

            {/* ====================================================== */}
            {/* NAVIGATION */}
            {/* ====================================================== */}

            <div className="mt-8 flex items-center gap-3">
              {/* ==================================================== */}
              {/* PREVIOUS */}
              {/* ==================================================== */}

              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => changeTestimonial("prev")}
                className="
                  group
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-neutral-200
                  bg-white
                  transition-all
                  duration-300
                  hover:border-orange-300
                  hover:bg-orange-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-orange-400
                  focus:ring-offset-2
                "
              >
                <FaArrowLeft
                  className="
                    h-4
                    w-4
                    text-orange-300
                    transition-transform
                    duration-300
                    group-hover:-translate-x-0.5
                  "
                />
              </button>

              {/* ==================================================== */}
              {/* NEXT */}
              {/* ==================================================== */}

              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => changeTestimonial("next")}
                className="
                  group
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-neutral-200
                  bg-white
                  transition-all
                  duration-300
                  hover:border-orange-300
                  hover:bg-orange-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-orange-400
                  focus:ring-offset-2
                "
              >
                <FaArrowRight
                  className="
                    h-4
                    w-4
                    text-orange-500
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                  "
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
|--------------------------------------------------------------------------
| Decorative Grid Cell
|--------------------------------------------------------------------------
*/

function GridCell() {
  return (
    <div
      aria-hidden="true"
      className="
        h-16
        w-16
        shrink-0
        rounded-[10px]
        border
        border-neutral-200/70
        bg-white/20
        sm:h-20
        sm:w-20
      "
    />
  );
}

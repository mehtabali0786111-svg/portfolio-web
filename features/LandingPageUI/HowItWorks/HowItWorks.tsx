"use client";

import AvailableTag from "@/components/ui/AvaliableTag";
import Image from "next/image";
import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import { FaLocationDot } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const scrollCardRef = useRef<HTMLDivElement>(null);

  const [isFlipped, setIsFlipped] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const card = scrollCardRef.current;

      if (!card) return;

      /*
       * Scroll animation
       *
       * The card starts slightly rotated.
       * As the user scrolls through the section,
       * it smoothly rotates back to its normal position.
       */
      gsap.fromTo(
        card,
        {
          rotateZ: -8,
          rotateX: 5,
          y: 40,
        },
        {
          rotateZ: 0,
          rotateX: 0,
          y: 0,

          ease: "none",

          scrollTrigger: {
            trigger: card,

            // Animation starts when the card enters the viewport
            start: "top 85%",

            // Animation finishes when the card reaches this point
            end: "top 35%",

            scrub: 1,

            // markers: true,
          },
        },
      );
    }, scrollCardRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="border-x  border-light-border px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-32">
      {/* =========================================
          SECTION HEADING
      ========================================== */}

      <div className="mb-10">
        <h4 className="mb-1 font-satoshi text-[18px] italic text-primary sm:text-[22px]">
          // How it works
        </h4>

        <h3 className="font-satoshi text-[28px] font-bold leading-tight text-[#3d3d3d] sm:text-[36px]">
          No agencies - just me, fully in on your product
        </h3>
      </div>

      {/* =========================================
          MAIN CARDS
      ========================================== */}

      <div className="flex w-full flex-col gap-6 md:flex-row">
        {/* =========================================
            LEFT CARD
        ========================================== */}

        <div
          className="
            relative
            flex
            min-h-[470px]
            w-full
            flex-col
            justify-end
            rounded-[22px]
            border
            border-light-border
            px-5
            pb-6
            pt-[250px]
            min-w-[250px]
            md:w-[34%]
            sm:px-5
            lg:px-6
            
            
          "
        >
          {/* =========================================
              SCROLL ROTATION WRAPPER
          ========================================== */}

          <div
            ref={scrollCardRef}
            className="
              absolute
              left-1/2
              top-[14px]
              z-10
              
              max-w-[330px]
              -translate-x-1/2
              cursor-pointer
              perspective-[1200px]
              md:w-[330px]
                w-[300px]
             
            "
            onClick={() => setIsFlipped((prev) => !prev)}
          >
            {/* =========================================
                FLIP CONTAINER
            ========================================== */}

            <div
              className="
                relative
                h-[235px]
                w-full
                transition-transform
                duration-700
                ease-[cubic-bezier(0.4,0.2,0.2,1)]
              "
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* =========================================
                  FRONT SIDE
              ========================================== */}

              <div
                className="
                  absolute
                  inset-0
                  overflow-hidden
                  rounded-[18px]
                  bg-white
                  p-5
                  shadow-[0_5px_15px_rgba(0,0,0,0.08)]
                "
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <div className="flex h-full items-start gap-6">
                  {/* Profile */}
                  <div className="flex flex-col justify-center items-center">
                    <div className="relative mb-4 h-[105px] w-[105px] mb-8">
                      <Image
                        src="/images/zolt_pic.jpg"
                        width={105}
                        height={105}
                        alt="Zolt Mercer"
                        className="h-full w-full rounded-full object-cover"
                      />

                      {/* Star */}
                      <div
                        className="
                          absolute
                          -bottom-3
                          left-1/2
                          h-[33px]
                          w-[30px]
                          -translate-x-1/2
                          overflow-hidden
                        "
                      >
                        <Image
                          src="/images/star.png"
                          width={30}
                          height={33}
                          alt="Star"
                          className="block h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <h4 className="whitespace-nowrap font-satoshi text-[30px] font-bold leading-none text-[#3d3d3d]">
                      Zolt Mercer
                    </h4>

                    <div className="mt-2 flex items-center gap-1 justify-center">
                      <FaLocationDot />

                      <span className="font-satoshi text-[14px] text-[#777]">
                        Austin, USA
                      </span>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="ml-3 flex min-w-[70px] flex-col">
                    <div className="border-b border-[#d8d5d0] pb-2">
                      <p className="font-satoshi text-[24px] leading-none text-[#3d3d3d]">
                        163
                      </p>

                      <p className="mt-1 font-satoshi text-[12px] text-[#777]">
                        Total hours
                      </p>
                    </div>

                    <div className="border-b border-[#d8d5d0] py-2">
                      <p className="font-satoshi text-[24px] leading-none text-[#3d3d3d]">
                        4.82
                      </p>

                      <p className="mt-1 font-satoshi text-[12px] text-[#777]">
                        Rating
                      </p>
                    </div>

                    <div className="pt-2">
                      <p className="font-satoshi text-[24px] leading-none text-[#3d3d3d]">
                        81
                      </p>

                      <p className="mt-1 font-satoshi text-[12px] text-[#777]">
                        Total jobs
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* =========================================
                  BACK SIDE
              ========================================== */}

              <div
                className="
                  absolute
                  inset-0
                  overflow-hidden
                  rounded-[18px]
                  
                  bg-cover
                  bg-center
                  p-4
                  shadow-[0_5px_15px_rgba(0,0,0,0.15)]
                "
                style={{
                  backgroundImage: "url('/images/upworkBg.jpg')",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Back content */}
                <div className="relative z-10 flex h-full flex-col justify-between">
                  {/* Top */}
                  <div>
                    <p className="font-satoshi text-[13px] font-medium text-white">
                      Zolt Mercer
                    </p>

                    <p className="mt-1 font-satoshi text-[15px] font-bold text-white">
                      Verified since April 2019
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="flex items-end justify-between gap-4">
                    <p className="max-w-[205px] font-satoshi text-[15px] leading-[1.5] text-white">
                      I care about craft, details, and building things people
                      actually enjoy using.
                    </p>

                    <div className="relative h-[88px] w-[72px] shrink-0 overflow-hidden rounded-[12px]">
                      <Image
                        src="/images/zolt_pic.jpg"
                        width={72}
                        height={88}
                        alt="Zolt Mercer"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================
              LEFT BOTTOM CONTENT
          ========================================== */}

          <div>
            <AvailableTag />

            <h4 className="mt-3 font-satoshi text-[24px] leading-tight text-light-theme-text font-semibold">
              Hire me today
            </h4>

            <p className="mt-1 max-w-[280px] font-satoshi text-[16px] leading-6 text-secondary">
              I take on only a small number of projects at a time, so your work
              always gets my full focus.
            </p>
          </div>
        </div>

        {/* =========================================
            RIGHT CARD
        ========================================== */}

        <div
          className="
            flex
            min-h-[470px]
            w-full
            flex-col
            rounded-[22px]
            border
            border-light-border
            px-6
            py-6
            md:w-[66%]
            lg:px-7
            lg:py-7
          "
        >
          {/* Heading */}
          <div>
            <h4 className="font-satoshi text-[24px] leading-tight text-[#3d3d3d] sm:text-[24px] font-semibold">
              Monthly Retainer
            </h4>

            <p className="mt-2 max-w-[600px] font-satoshi text-[16px] leading-6 text-secondary">
              One design engineer dedicated to your product.
              <br />I design it, build it, and ship it - start to finish, no
              middleman.
            </p>
          </div>

          {/* Divider */}
          <div className="my-6 h-px w-full bg-light-border" />

          {/* Tag */}
          <div className="mb-5">
            <span className="inline-flex rounded-full bg-[#f0efec] px-3 py-1 font-satoshi text-[12px] text-[#777]">
              Pause or cancel anytime
            </span>
          </div>

          {/* Price */}
          <div className="mb-5">
            <div className="flex items-baseline">
              <span className="font-satoshi text-[42px] font-bold leading-none text-[#3d3d3d]">
                $1,900
              </span>

              <span className="font-satoshi text-[26px] text-[#777]">
                /month
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[13px]">●</span>
                <span className="font-satoshi text-[16px]">
                  One request at a time
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[13px]">●</span>
                <span className="font-satoshi text-[15px]">
                  Unlimited revisions
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[13px]">●</span>
                <span className="font-satoshi text-[15px]">
                  Up to 2 stakeholders
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[13px]">●</span>
                <span className="font-satoshi text-[15px]">
                  Avg. 48 hour turnaround
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[13px]">●</span>
                <span className="font-satoshi text-[15px]">
                  Design + code delivered
                </span>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="mt-auto pt-6">
            <Button buttonTxt="Let's connect" hasAnimation={true} />
          </div>
        </div>
      </div>
    </section>
  );
}

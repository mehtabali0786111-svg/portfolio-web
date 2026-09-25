"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";

import WaveForm from "./components/WaveForm";
import TimerDisplay from "./components/TimerDisplay";
import NotePad from "./components/NotePad";
import Wallet from "./components/Wallet";

function AboutMe() {
  const [isExpanded, setIsExpanded] = useState(false);

  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const handleImageClick = () => {
    if (!imageWrapperRef.current) return;

    const nextExpanded = !isExpanded;

    setIsExpanded(nextExpanded);

    gsap.to(imageWrapperRef.current, {
      clipPath: nextExpanded
        ? "circle(150% at 50% 50%)"
        : "circle(120px at 50% -12%)",

      duration: 0.7,
      ease: "power3.inOut",
    });
  };

  return (
    <section id="about" className="scroll-mt-8 border-x border-b border-light-border px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-32">
      {/* =========================
          SECTION HEADING
      ========================== */}

      <h4 className="mb-1 font-satoshi text-[18px] italic text-primary sm:text-[22px]">
        {"// About me"}
      </h4>

      <h3 className="mb-8 font-satoshi text-[28px] font-bold leading-tight text-[#3d3d3d] sm:text-[36px] sm:text-justify">
        The person behind the pixels
      </h3>

      {/* =========================
          MAIN GRID
      ========================== */}

      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-[350px_1fr] lg:grid-cols-[350px_1fr_1fr] lg:grid-rows-2">
        {/* =========================
            PERSON IMAGE
        ========================== */}

        <div className="relative min-h-[300px] overflow-hidden rounded-2xl md:col-span-2 md:min-h-[340px] lg:col-span-1 lg:row-span-2 lg:min-h-0 lg:min-w-[350px]">
          <Image
            src="/images/person_pic.jpg"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 350px"
            alt="Person photo"
            className="rounded-2xl object-cover object-center"
          />
        </div>

        {/* =========================
            TOP RIGHT CARDS
        ========================== */}

        <div className="grid sm:grid-cols-2 gap-3 grid-cols-1 md:col-span-2 lg:max-h-[230px]">
          {/* =========================
              TESTIMONIAL / MUSIC CARD
          ========================== */}

          <div className="relative min-h-[250px] overflow-hidden rounded-2xl bg-light-box s md:min-h-[190px] lg:min-h-[250px]">
            {/* IMAGE */}

            <div
              ref={imageWrapperRef}
              onClick={handleImageClick}
              className="absolute inset-0 z-30 cursor-pointer overflow-hidden"
              style={{
                clipPath: "circle(120px at 50% -12%)",
              }}
            >
              <Image
                src="/images/color_comp.jpg"
                alt="Rainbow"
                fill
                priority
                sizes="(max-width: 768px) 50vw, 432px"
                className="object-cover object-center"
              />
            </div>

            {/* CONTENT */}

            <div
              className={`
                absolute inset-0 z-10
                flex flex-col items-center justify-end pb-3
                transition-all duration-300 ease-out
                ${
                  isExpanded
                    ? "pointer-events-none scale-95 opacity-0 blur-md"
                    : "scale-100 opacity-100 blur-0"
                }
              `}
            >
              <WaveForm />

              <p className="font-satoshi text-[12px] text-light-theme-text/60">
                Tyler
              </p>

              <p className="mb-1 text-center font-satoshi text-[13px] text-light-theme-text sm:text-[16px]">
                See you again
              </p>

              <div className="mb-1 h-0.5 w-7 bg-dark-grey" />

              <TimerDisplay />
            </div>
          </div>

          {/* =========================
              WALLET CARD
          ========================== */}

          <div className="min-h-[250px]  rounded-2xl bg-light-box sm:min-h-[170px] md:min-h-[190px] lg:min-h-[250px]">
            <Wallet />
          </div>
        </div>

        {/* =========================
            NOTE PAD CARD
        ========================== */}

        <div className="isolate relative min-h-[210px] w-full min-w-0 overflow-hidden rounded-2xl bg-light-box p-2 md:col-span-2 md:min-h-[230px] lg:min-h-[250px]">
          <div className="absolute left-1/2 top-[20%] h-2 w-[60%] -translate-x-1/2 rounded-full bg-light" />

          <NotePad />

          <p className="absolute bottom-3 z-0 w-full text-center font-satoshi text-[18px] sm:text-[22px] lg:text-[24px]">
            I have a surprise for you :)
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;

"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Button from "@/components/ui/Button";
import AvaliableTag from "@/components/ui/AvaliableTag";
import HangingCard from "@/components/common/HangingCard";
import Image from "next/image";

const GREETINGS = ["Hello", "Hola", "Salut", "Hallo", "Ciao"];

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const [cardReady, setCardReady] = useState(false);

  /*
   * Greeting animation
   */
  useLayoutEffect(() => {
    if (!wordRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIndex((prev) => (prev + 1) % GREETINGS.length);
        },
      });

      tl.fromTo(
        wordRef.current,
        {
          yPercent: 100,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        },
      ).to(wordRef.current, {
        yPercent: -100,
        opacity: 0,
        duration: 0.4,
        delay: 1,
        ease: "power3.in",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [index]);

  /*
   * Prevent the HangingCard from being visible
   * until the browser has completed its initial
   * layout.
   */
  useLayoutEffect(() => {
    if (!cardWrapperRef.current) return;

    const wrapper = cardWrapperRef.current;

    // Force browser to calculate layout first.
    wrapper.getBoundingClientRect();

    // Reveal after initial layout.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setCardReady(true);
      });
    });
  }, []);

  return (
    <section
      id="top"
      className="
        relative
        isolate
        
        scroll-mt-8
        border-x
        border-b
        border-light-border
        px-5
        py-20
        sm:px-8
        sm:py-24
        lg:px-16
        lg:py-32
      "
    >
      {/* =====================================
          CONTENT
      ====================================== */}

      <div
        className="
          relative
          z-20
          max-w-full
          lg:max-w-[72%]
        "
      >
        <AvaliableTag />

        <div ref={containerRef} className="flex justify-start">
          <h1
            className="
              flex
              flex-wrap
              items-end
              gap-x-2
              gap-y-1
              font-satoshi
              text-[34px]
              font-bold
              leading-[1.05]
              text-dark-text
              sm:text-5xl
            "
          >
            {/* Greeting */}
            <span
              className="
                inline-block
                w-[118px]
                overflow-hidden
                sm:w-[175px]
              "
            >
              <span
                ref={wordRef}
                className="
                  inline-block
                  text-[44px]
                  sm:text-7xl
                "
              >
                {GREETINGS[index]}
              </span>
            </span>

            {/* Name */}
            <span className="inline-block self-end text-left">I am Mehtab</span>

            {/* Hi icon */}
            <Image
              src="/images/hi.png"
              width={50}
              height={50}
              alt="Hi icon"
              priority
              className="shrink-0"
            />
          </h1>
        </div>

        {/* Title */}
        <h4
          className="
            mb-5
            font-satoshi
            text-[20px]
            font-semibold
            text-secondary
            sm:mb-6
            sm:text-[24px]
          "
        >
          Design engineer
        </h4>

        {/* Description */}
        <p
          className="
            mb-8
            max-w-[600px]
            font-satoshi
            text-[15px]
            leading-relaxed
            tracking-normal
            text-secondary/80
            sm:text-base
            sm:text-justify
          "
        >
          Design engineer based in Austin. I don't just bridge design and
          engineering - I own the entire experience, from the first sketch to
          the final shipped product.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button hasAnimation={false} buttonTxt="Download CV" />

          <Button hasAnimation={true} buttonTxt="Let's connect" />
        </div>
      </div>

      {/* =====================================
          HANGING CARD
      ====================================== */}

      <div
        ref={cardWrapperRef}
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          left-[74px]
          top-[-70px]
          z-10
          h-[120vh]
          w-[150%]
          card-hide
          lg:left-[73px]
          xl:left-[73px]
          ${cardReady ? "opacity-100" : "opacity-0"}
        `}
        style={{
          transition: "none",
        }}
      >
        <HangingCard
          cardWidth={200}
          photo="/images/person1.jpg"
          cardHeight={280}
          ropeSections={6}
          ropeColor="#3a3a3a"
          ropeWidth={26}
          cardColor="#1a1a2e"
          cardAccent="#7c3aed"
        />
      </div>
    </section>
  );
}

export default HeroSection;

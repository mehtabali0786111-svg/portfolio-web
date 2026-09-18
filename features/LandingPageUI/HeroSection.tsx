"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PiHandWavingDuotone } from "react-icons/pi";

const GREETINGS = ["Hello", "Hola", "Salut", "Hallo", "Ciao"];

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: 0,
        onComplete: () => {
          setIndex((prev) => (prev + 1) % GREETINGS.length);
        },
      });

      // reset in-position, then animate in
      tl.fromTo(
        wordRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      )

        // animate out
        .to(wordRef.current, {
          yPercent: -100,
          opacity: 0,
          duration: 0.4,
          delay: 1,
          ease: "power3.in",
        });
    }, containerRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <section className="py-28 px-16">
      <div className="flex justify-start" ref={containerRef}>
        <h1 className="flex items-center gap-2 text-6xl font-satoshi font-bold text-dark-text">
          <span className="inline-block overflow-hidden w-[147px]">
            <span ref={wordRef} className="inline-block">
              {GREETINGS[index]}
            </span>
          </span>
          <span className="inline-block text-left">I am Mehtab</span>
          <PiHandWavingDuotone />
        </h1>
      </div>
    </section>
  );
}

export default HeroSection;

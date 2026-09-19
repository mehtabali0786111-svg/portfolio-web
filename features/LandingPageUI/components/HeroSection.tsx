"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PiHandWavingDuotone } from "react-icons/pi";
import Button from "@/components/ui/Button";
import AvaliableTag from "@/components/ui/AvaliableTag";

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
    <section className="py-32 px-16 border-x border-light-border border-b">
      <div className="max-w-[62%]">
        <AvaliableTag />
        <div className="flex justify-start" ref={containerRef}>
          <h1 className="flex items-end  gap-2 text-5xl font-satoshi font-bold text-dark-text">
            <span className="inline-block overflow-hidden w-[175px]">
              <span ref={wordRef} className="inline-block text-7xl">
                {GREETINGS[index]}
              </span>
            </span>
            <span className="inline-block text-left self-end">I am Mehtab</span>
            <PiHandWavingDuotone />
          </h1>
        </div>
        <h4 className="font-satoshi text-[24px] text-secondary font-semibold mb-6">
          Design engineer
        </h4>
        <p className="font-satoshi leading-relaxed text-secondary/80 text-justify tracking-normal mb-8">
          Design engineer based in Austin. I don't just bridge design and
          engineering — I own the entire experience, from the first sketch to
          the final shipped product.
        </p>

        <div className="flex gap-3">
          <Button hasAnimation={false} buttonTxt="Download CV" />
          <Button hasAnimation={true} buttonTxt="Let's connect" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

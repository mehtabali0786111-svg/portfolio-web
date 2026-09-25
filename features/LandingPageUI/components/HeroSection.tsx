"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PiHandWavingDuotone } from "react-icons/pi";
import Button from "@/components/ui/Button";
import AvaliableTag from "@/components/ui/AvaliableTag";
import HangingCard from "@/components/common/HangingCard";
import Image from "next/image";

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

      tl.fromTo(
        wordRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
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

  return (
    <>
      <section id="top" className="scroll-mt-8 border-x border-b border-light-border px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-32 overflow-hidden">
        <div className="max-w-full lg:max-w-[72%]">
          <AvaliableTag />
          <div className="flex justify-start" ref={containerRef}>
            <h1 className="flex flex-wrap items-end gap-x-2 gap-y-1 font-satoshi text-[34px] font-bold leading-[1.05] text-dark-text sm:text-5xl">
              <span className="inline-block w-[118px] overflow-hidden sm:w-[175px]">
                <span
                  ref={wordRef}
                  className="inline-block text-[44px] sm:text-7xl"
                >
                  {GREETINGS[index]}
                </span>
              </span>
              <span className="inline-block self-end text-left">
                I am Mehtab
              </span>
              <Image
                src="/images/hi.png"
                width={50}
                height={50}
                alt="hi icon"
              />
            </h1>
          </div>
          <h4 className="mb-5 font-satoshi text-[20px] font-semibold text-secondary sm:mb-6 sm:text-[24px]">
            Design engineer
          </h4>
          <p className="mb-8 font-satoshi text-[15px] leading-relaxed tracking-normal text-secondary/80 sm:text-base sm:text-justify max-w-[600px]">
            {"Design engineer based in Austin. I don't just bridge design and "}
            engineering - I own the entire experience, from the first sketch to
            the final shipped product.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button hasAnimation={false} buttonTxt="Download CV" />
            <Button hasAnimation={true} buttonTxt="Let's connect" />
          </div>
        </div>
      </section>

      <div className="h-[120vh] w-[150%] absolute -top-[70px] z-10 pointer-events-none card-hide lg:left-[73px] xl:left-[-73px] left-[74px]">
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
    </>
  );
}

export default HeroSection;

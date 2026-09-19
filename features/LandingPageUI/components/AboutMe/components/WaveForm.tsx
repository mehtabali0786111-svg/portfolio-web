"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { EasePack } from "gsap/all";

gsap.registerPlugin(useGSAP);

const BAR_COUNT = 5;

function WaveForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const bars = gsap.utils.toArray<HTMLDivElement>(".wave-bar");

      // Each bar gets its own independent, randomized bounce loop
      bars.forEach((bar) => {
        gsap.to(bar, {
          scaleY: () => gsap.utils.random(0.2, 3),
          duration: () => gsap.utils.random(0.2, 0.4),
          repeat: -1,
          yoyo: true,
          ease: "power3.inOut",
          transformOrigin: "center center",
          delay: () => gsap.utils.random(0.5, 0.15),
        });
      });
    },
    { scope: containerRef }, // limits gsap.utils.toArray("...") selectors to this DOM subtree
  );

  return (
    <div ref={containerRef} className="flex items-center gap-0.5 h-8">
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <div
          key={i}
          className="wave-bar w-[2px] h-2 rounded-sm bg-light-theme-text"
        />
      ))}
    </div>
  );
}

export default WaveForm;

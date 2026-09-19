"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/* ---------- Single animated digit (odometer slot) ---------- */
function AnimatedDigit({ value }: { value: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const currentRef = useRef<HTMLSpanElement>(null);
  const incomingRef = useRef<HTMLSpanElement>(null);
  const prevValue = useRef(value);
  const [displayValues, setDisplayValues] = useState({
    old: value,
    next: value,
  });

  useGSAP(
    () => {
      if (prevValue.current === value) return;

      setDisplayValues({ old: prevValue.current, next: value });
      prevValue.current = value;

      const tl = gsap.timeline();

      // reset incoming digit below view before animating
      gsap.set(incomingRef.current, { yPercent: 100, opacity: 0 });
      gsap.set(currentRef.current, { yPercent: 0, opacity: 1 });

      tl.to(
        currentRef.current,
        {
          yPercent: -100,
          opacity: 0,

          duration: 0.35,
          ease: "power2.in",
        },
        0,
      ).to(
        incomingRef.current,
        {
          yPercent: 0,
          opacity: 1,

          duration: 0.35,
          ease: "power2.out",
        },
        0,
      );
    },
    { dependencies: [value], scope: containerRef },
  );

  return (
    <span
      ref={containerRef}
      className="relative inline-block h-[1em] w-[0.6em] overflow-hidden align-bottom"
    >
      <span
        ref={currentRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {displayValues.old}
      </span>
      <span
        ref={incomingRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {displayValues.next}
      </span>
    </span>
  );
}

/* ---------- Timer display ---------- */
function TimerDisplay() {
  const [seconds, setSeconds] = useState(29);
  const totalSeconds = 3 * 60 + 1; // 3:01
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // limited duration: tick for 8 seconds then stop
    intervalRef.current = setInterval(() => {
      setSeconds((s) => (s + 1 <= 59 ? s + 1 : 0));
    }, 1000);

    const stopTimeout = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }, 8000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearTimeout(stopTimeout);
    };
  }, []);

  const secTens = String(Math.floor(seconds / 10));
  const secOnes = String(seconds % 10);

  const totalMin = Math.floor(totalSeconds / 60);
  const totalSec = String(totalSeconds % 60).padStart(2, "0");

  return (
    <div className="flex items-center  font-satoshi text-sm text-gray-400">
      <span>1</span>
      <span>:</span>
      <AnimatedDigit value={secTens} />
      <AnimatedDigit value={secOnes} />
      <span className=" text-gray-300">/</span>
      <span className="text-dark-text">
        {totalMin}:{totalSec}
      </span>
    </div>
  );
}

export default TimerDisplay;

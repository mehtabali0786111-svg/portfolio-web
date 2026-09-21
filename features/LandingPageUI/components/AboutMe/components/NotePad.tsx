// NotePad.tsx
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const messages = [
  "Hey, how's your day going?",
  "What are you working on?",
  "Did you eat something yet?",
  "I'll call you in a bit.",
  "That sounds really interesting to me.",
  "What do you think about it?",
  "Let's catch up sometime this week.",
  "I'm just taking a short break.",
  "Can you send that to me?",
  "See you again tomorrow morning.",
];

function NotePad() {
  const containerRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);

  const contentRef = useRef<HTMLSpanElement>(null);

  const currentPos = useRef({ x: 0, y: 0 });
  const currentMessageIndex = useRef<number | null>(null);

  useGSAP(
    () => {
      gsap.set(noteRef.current, {
        transformOrigin: "center center",
        force3D: true,
      });
    },
    { scope: containerRef },
  );

  const getNextOffset = () => {
    const container = containerRef.current;
    const note = noteRef.current;

    if (!container || !note) return { x: 0, y: 0 };

    const containerRect = container.getBoundingClientRect();
    const noteRect = note.getBoundingClientRect();

    const maxX = Math.max(0, (containerRect.width - noteRect.width) / 2);
    const maxY = Math.max(0, (containerRect.height - noteRect.height) / 2);

    let x = currentPos.current.x;
    let y = currentPos.current.y;
    const minDistance = Math.min(maxX, maxY) * 0.5;

    for (let i = 0; i < 10; i++) {
      const candidateX = gsap.utils.random(-maxX, maxX);
      const candidateY = gsap.utils.random(-maxY, maxY);
      const dist = Math.hypot(candidateX - x, candidateY - y);

      if (dist >= minDistance || (maxX === 0 && maxY === 0)) {
        x = candidateX;
        y = candidateY;
        break;
      }
      if (i === 9) {
        x = candidateX;
        y = candidateY;
      }
    }

    return { x, y };
  };

  // picks a random message index, different from the currently shown one
  const getNextMessageIndex = () => {
    if (messages.length <= 1) return 0;

    let next = currentMessageIndex.current;
    while (next === currentMessageIndex.current) {
      next = Math.floor(Math.random() * messages.length);
    }
    return next as number;
  };

  const handleNoteEnter = () => {
    const { x, y } = getNextOffset();
    currentPos.current = { x, y };
    const randomRotate = gsap.utils.random(-6, 6);

    gsap.to(noteRef.current, {
      x,
      y,
      rotate: randomRotate,
      scale: 1.03,
      duration: 0.9,
      ease: "power2.out",
      overwrite: true,
    });

    // fade current text out, swap it, fade the new text in
    const nextIndex = getNextMessageIndex();
    currentMessageIndex.current = nextIndex;

    gsap.to(contentRef.current, {
      opacity: 0,
      y: -4,
      duration: 0.2,
      ease: "power1.out",
      overwrite: true,
      onComplete: () => {
        if (contentRef.current) {
          contentRef.current.textContent = messages[nextIndex];
        }
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 4 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" },
        );
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative z-20 flex min-h-[176px] items-center justify-center overflow-hidden px-4 pb-8 pt-3 md:min-h-[196px] lg:min-h-[216px]"
    >
      <div
        ref={noteRef}
        className="relative w-[112px] cursor-pointer will-change-transform sm:w-[124px] lg:w-[136px]"
        onMouseEnter={handleNoteEnter}
      >
        <Image
          src="/images/note.png"
          width={136.7}
          height={136.7}
          alt="notepad Image"
          className="h-auto w-full object-cover"
        />

        <div className="absolute right-[9%] top-0 w-[17%]">
          <Image
            src="/images/pin.png"
            width={23}
            height={32}
            alt="pin Image"
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-3 pointer-events-none">
          <span
            ref={contentRef}
            className="text-center text-[10px] font-medium leading-snug text-neutral-700 sm:text-xs"
          >
            {"Hey, how's your day going?"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NotePad;

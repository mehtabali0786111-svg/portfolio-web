"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const smoother = ScrollSmoother.create({
      wrapper,
      content,
      smooth: 0.7,
      smoothTouch: 0,
      effects: false,
      normalizeScroll: false,
    });

    ScrollTrigger.refresh();
    return () => smoother.kill();
  }, []);

  return (
    <div ref={wrapperRef} className="smooth-scroll-wrapper">
      <div ref={contentRef} className="smooth-scroll-content">
        {children}
      </div>
    </div>
  );
}

"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

const REVEAL_SELECTOR =
  "h1, h2, h3, h4, h5, h6, p, a, button, img, blockquote, li, figure, article";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollReveal({
  children,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const candidates = Array.from(
      element.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );
    const items = candidates.filter(
      (item) => !item.parentElement?.closest(REVEAL_SELECTOR),
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(items, { clearProps: "all", autoAlpha: 1 });
      return;
    }

    const context = gsap.context(() => {
      gsap.set(items, {
        autoAlpha: 0,
        y: 18,
        scale: 0.96,
        filter: "blur(6px)",
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            gsap.to(entry.target, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.68,
              ease: "power2.out",
              overwrite: "auto",
            });
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -12% 0px" },
      );

      items.forEach((item) => observer.observe(item));
      return () => observer.disconnect();
    }, element);

    return () => context.revert();
  }, []);

  return (
    <div ref={ref} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  );
}

"use client";

import gsap from "gsap";
import Image from "next/image";
import React, { useRef, useState } from "react";

type ServiceItem = {
  id: string;
  title: string;
  duration: string;
  tools: string[];
  description: string;
  image: string;
};

const services: ServiceItem[] = [
  {
    id: "product-design",
    title: "UI & Product Design",
    duration: "1 TO 3 WEEKS",
    tools: ["FIGMA", "SPLINE", "ADOBE XD"],
    description:
      "I design interfaces that are clean, intuitive, and built around real user behavior. From the wireframe to the final pixel-perfect file.",
    image: "/images/bannerImage1.jpg",
  },
  {
    id: "design-engineering",
    title: "Design Engineering",
    duration: "2 TO 4 WEEKS",
    tools: ["REACT", "FRAMER", "TYPE SCRIPT", "TAILWIND"],
    description:
      "I take Figma files and build them in code myself with no handoff and no translation loss. What you see in the mockup is exactly what ships to production.",
    image: "/images/work2.jpg",
  },
  {
    id: "framer-development",
    title: "Framer Development",
    duration: "3 TO 7 DAYS",
    tools: ["FIGMA", "FRAMER"],
    description:
      "Need a site that looks alive? I design and build in Framer with custom interactions, animations, and CMS-ready pages ready to launch fast without sacrificing quality.",
    image: "/images/color_comp.jpg",
  },
  {
    id: "design-systems",
    title: "Design Systems",
    duration: "3 TO 6 WEEKS",
    tools: ["FIGMA", "STORYBOOK", "REACT", "ZEROHEIGHT"],
    description:
      "I build component libraries and design systems that scale across teams. Figma variables, design tokens, React components, and full documentation all connected.",
    image: "/images/note.png",
  },
  {
    id: "motion-design",
    title: "Interaction & Motion Design",
    duration: "1 TO 2 WEEKS",
    tools: ["GSAP", "FRAMER", "AFTER EFFECTS", "LOTTIE"],
    description:
      'Micro-interactions, scroll animations, page transitions, and motion details that feel purposeful and precise. The kind of detail that makes users stop and say "this just feels right."',
    image: "/images/bannerImage2.jpg",
  },
];

const randomRotation = () => Math.round(Math.random() * 18 - 9);

export default function Service() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState(services[0].image);
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const initializedRefs = useRef<Set<string>>(new Set());
  const previewRef = useRef<HTMLDivElement | null>(null);

  const isOpen = (id: string) => openItems.includes(id);

  const positionPreview = (event: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current || !previewRef.current) {
      return;
    }

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const previewRect = previewRef.current.getBoundingClientRect();
    const offset = -85;
    const x = Math.min(
      event.clientX - sectionRect.left + offset,
      sectionRect.width - previewRect.width - offset,
    );
    const y = Math.min(
      event.clientY - sectionRect.top + offset,
      sectionRect.height - previewRect.height - offset,
    );

    gsap.to(previewRef.current, {
      left: Math.max(offset, x),
      top: Math.max(offset, y),
      duration: 0.28,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const toggleService = (id: string) => {
    const content = contentRefs.current[id];

    if (!content) {
      return;
    }

    if (isOpen(id)) {
      setOpenItems((current) => current.filter((itemId) => itemId !== id));
      gsap.to(content, {
        height: 0,
        autoAlpha: 0,
        duration: 0.38,
        ease: "power3.inOut",
        overwrite: true,
      });
      return;
    }

    setOpenItems((current) => [...current, id]);
    gsap.killTweensOf(content);
    gsap.set(content, { height: "auto", autoAlpha: 1 });

    const contentHeight = content.offsetHeight;

    gsap.fromTo(
      content,
      { height: 0, autoAlpha: 0 },
      {
        height: contentHeight,
        autoAlpha: 1,
        duration: 0.46,
        ease: "power3.out",
        overwrite: true,
        onComplete: () => {
          gsap.set(content, { height: "auto" });
        },
      },
    );
  };

  const showPreview = (event: React.MouseEvent<HTMLElement>, image: string) => {
    setPreviewImage(image);
    positionPreview(event);

    if (!previewRef.current) {
      return;
    }

    gsap.fromTo(
      previewRef.current,
      { autoAlpha: 0, y: 18, rotate: 0, scale: 0.94 },
      {
        autoAlpha: 1,
        y: 0,
        rotate: randomRotation(),
        scale: 1,
        duration: 0.42,
        ease: "back.out(1.35)",
        overwrite: true,
      },
    );
  };

  const hidePreview = () => {
    if (!previewRef.current) {
      return;
    }

    gsap.to(previewRef.current, {
      autoAlpha: 0,
      y: 12,
      scale: 0.96,
      duration: 0.24,
      ease: "power2.out",
      overwrite: true,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-x border-b border-light-border px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-32"
    >
      <h4 className="mb-1 font-satoshi text-[22px] italic text-primary sm:text-[22px]">
        {"// Services i provide"}
      </h4>
      <h3 className="mb-8 font-satoshi text-[36px] font-bold leading-tight text-[#3d3d3d] sm:text-[36px] sm:text-justify">
        I can help you with these things
      </h3>

      <div
        ref={previewRef}
        className="pointer-events-none absolute -left-1/2 -top-1/2 z-20 hidden h-36 w-52 overflow-hidden rounded-md border border-light-border bg-light opacity-0 shadow-[0_18px_45px_rgba(10,10,10,0.16)] lg:block"
        aria-hidden="true"
      >
        <Image
          src={previewImage}
          alt=""
          fill
          sizes="208px"
          className="object-cover"
        />
      </div>

      <div onMouseLeave={hidePreview}>
        {services.map((service, index) => {
          const expanded = isOpen(service.id);

          return (
            <article
              key={service.id}
              className="group border-t border-light-border py-5 last:border-b"
              onMouseEnter={(event) => showPreview(event, service.image)}
              onMouseMove={positionPreview}
            >
              <button
                type="button"
                className="flex w-full items-start justify-between gap-5 text-left"
                aria-expanded={expanded}
                aria-controls={`${service.id}-content`}
                onClick={() => toggleService(service.id)}
              >
                <span className="font-satoshi text-[22px] font-medium leading-tight text-dark-text sm:text-[26px]">
                  {index + 1}. {service.title}
                </span>
                <span
                  className="relative mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-white text-primary shadow-sm"
                  aria-hidden="true"
                >
                  <span className="absolute h-[2px] w-2.5 rounded-full bg-primary" />
                  <span
                    className={`absolute h-2.5 w-[2px] rounded-full bg-primary transition-opacity duration-200 ${
                      expanded ? "opacity-0" : "opacity-100"
                    }`}
                  />
                </span>
              </button>

              <div
                id={`${service.id}-content`}
                ref={(element) => {
                  contentRefs.current[service.id] = element;
                  if (element && !initializedRefs.current.has(service.id)) {
                    initializedRefs.current.add(service.id);
                    gsap.set(element, {
                      height: 0,
                      autoAlpha: 0,
                    });
                  }
                }}
                className="overflow-hidden"
              >
                <div className="max-w-[760px] pt-5 font-satoshi">
                  <p className="mb-4 text-[12px] font-bold leading-none text-dark-text">
                    {service.duration}
                  </p>
                  <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                    {service.tools.map((tool, toolIndex) => (
                      <React.Fragment key={tool}>
                        <span className="text-[11px] font-medium leading-none text-dark-text">
                          {tool}
                        </span>
                        {toolIndex < service.tools.length - 1 ? (
                          <span
                            className="text-[13px] font-bold leading-none text-primary"
                            aria-hidden="true"
                          >
                            +
                          </span>
                        ) : null}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="max-w-[720px] text-[13px] leading-relaxed text-secondary">
                    {service.description}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

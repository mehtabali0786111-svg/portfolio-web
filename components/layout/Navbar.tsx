"use client";

import { useCallback, useEffect, useState } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { CiBadgeDollar } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import {
  MdDarkMode,
  MdLightMode,
  MdMiscellaneousServices,
} from "react-icons/md";
import { PiRocketLaunch } from "react-icons/pi";

const navItems = [
  { icon: GoPerson, label: "About", target: "about" },
  { icon: PiRocketLaunch, label: "Work", target: "work" },
  { icon: MdMiscellaneousServices, label: "Services", target: "services" },
  { icon: CiBadgeDollar, label: "Pricing", target: "pricing" },
] as const;

const THEME_KEY = "portfolio-theme";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_KEY);
    const useDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", useDark);
    const syncThemeState = window.setTimeout(() => setIsDark(useDark), 0);
    return () => window.clearTimeout(syncThemeState);
  }, []);

  useEffect(() => {
    const triggers = navItems.flatMap(({ target }) => {
      const section = document.getElementById(target);
      if (!section) return [];

      return [
        ScrollTrigger.create({
          trigger: section,
          start: "top 38%",
          end: "bottom 38%",
          onEnter: () => setActiveSection(target),
          onEnterBack: () => setActiveSection(target),
        }),
      ];
    });

    ScrollTrigger.refresh();
    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);

  const scrollToSection = useCallback((target: string) => {
    const section = document.getElementById(target);
    if (!section) return;

    const smoother = ScrollSmoother.get();
    console.log(smoother);
    if (smoother) {
      smoother.scrollTo(section, true, "top 32px");
    } else {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setActiveSection(target);
    window.history.replaceState(null, "", `#${target}`);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    document.documentElement.classList.toggle("dark", nextTheme);
    window.localStorage.setItem(THEME_KEY, nextTheme ? "dark" : "light");
    setIsDark(nextTheme);
  };

  return (
    <nav
      aria-label="Page navigation"
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-light-border bg-light/95 py-1.5 pl-2 shadow-lg backdrop-blur md:left-6 md:top-1/2 md:bottom-auto md:-translate-x-0 md:-translate-y-1/2"
    >
      <div className="group flex gap-1 overflow-hidden md:w-10 md:flex-col md:hover:w-30">
        {navItems.map(({ icon: Icon, label, target }) => {
          const isActive = activeSection === target;
          return (
            <button
              key={target}
              type="button"
              aria-label={`Jump to ${label}`}
              aria-current={isActive ? "location" : undefined}
              onClick={() => scrollToSection(target)}
              className={`flex h-10 items-center gap-2 rounded-lg px-2 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:w-26 ${isActive ? "bg-primary text-white shadow-sm" : "text-secondary hover:bg-light-box hover:text-dark-text"}`}
            >
              <span className="flex w-6 shrink-0 items-center justify-center">
                <Icon size={21} aria-hidden="true" />
              </span>
              <span className="hidden whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:inline">
                {label}
              </span>
            </button>
          );
        })}
        <button
          type="button"
          aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          aria-pressed={isDark}
          onClick={toggleTheme}
          className="flex h-10 items-center gap-2 rounded-lg px-2 text-secondary transition-colors duration-200 hover:bg-light-box hover:text-dark-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:w-26"
        >
          <span className="flex w-6 shrink-0 items-center justify-center">
            {isDark ? (
              <MdLightMode size={21} aria-hidden="true" />
            ) : (
              <MdDarkMode size={21} aria-hidden="true" />
            )}
          </span>
          <span className="hidden whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:inline">
            {isDark ? "Mode" : "Mode"}
          </span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

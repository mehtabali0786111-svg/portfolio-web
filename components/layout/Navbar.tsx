import React from "react";
import { CiBadgeDollar } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { MdMiscellaneousServices, MdOutlineLightMode } from "react-icons/md";
import { PiRocketLaunch } from "react-icons/pi";

const navItems = [
  { icon: GoPerson, label: "About" },
  { icon: PiRocketLaunch, label: "Work" },
  { icon: MdMiscellaneousServices, label: "Services" },
  { icon: CiBadgeDollar, label: "Pricing" },
  { icon: MdOutlineLightMode, label: "Mode" },
];

function Navbar() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-light-border bg-light/90 p-3 shadow-lg backdrop-blur md:left-6 md:top-1/2 md:bottom-auto md:-translate-x-0 md:-translate-y-1/2">
      <div
        className="
          group flex cursor-pointer gap-4
          overflow-hidden
          transition-all duration-300
          md:w-6 md:flex-col md:hover:w-22
        "
      >
        {navItems.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="flex w-6 flex-shrink-0 items-center justify-center">
              <Icon size={22} />
            </span>
            <span className="hidden whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:inline">
              {label}
            </span>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;

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
    <nav className="fixed rounded-xl border border-light-border bg-bg-light p-3 top-1/2 -translate-y-1/2 left-6 ">
      <div
        className="
          group flex w-6 cursor-pointer flex-col gap-4
          overflow-hidden
          transition-all duration-300
          hover:w-22
        "
      >
        {navItems.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="flex w-6 flex-shrink-0 items-center justify-center">
              <Icon size={22} />
            </span>
            <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {label}
            </span>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;

import Main from "@/components/layout/Main";
import Navbar from "@/components/layout/Navbar";
import React from "react";

function page() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 z-0 [background-size:22px_22px] opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-dot) 0.75px, transparent 0.75px)",
        }}
        aria-hidden="true"
      />
      <div
        className="
    pointer-events-none
    fixed inset-x-0 top-0 z-50
    h-20
    backdrop-blur-[1px]
    [mask-image:linear-gradient(to_top,transparent_0%,#3d4448_50%,black_100%)]
    [-webkit-mask-image:linear-gradient(to_top,transparent_0%,#3d4448_50%,black_100%]
  "
      />
      <div
        className="pointer-events-none absolute inset-0 [background-size:22px_22px] opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-dot) 0.75px, transparent 0.75px)",
        }}
        aria-hidden="true"
      />
      {/* Bottom blur */}
      <div
        className="
    pointer-events-none
    fixed inset-x-0 bottom-0 z-50
    h-20
    backdrop-blur-[1px]
    [mask-image:linear-gradient(to_bottom,transparent_0%,#6b767c_50%,#3d4448_100%]
    [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#6b767c_50%,#3d4448_100%]
  "
      />

      <Navbar />

      <Main />
    </div>
  );
}

export default page;

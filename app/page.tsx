import Main from "@/components/layout/Main";
import Navbar from "@/components/layout/Navbar";
import React from "react";

function page() {
  return (
    <div className="relative min-h-screen ">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, #474747fa 0.1px, transparent 1px)",
          backgroundSize: "25px 25px",
          maskImage:
            "radial-gradient(ellipse at center, transparent 0%, transparent 30%, black 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, transparent 0%, transparent 30%, black 80%)",
        }}
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

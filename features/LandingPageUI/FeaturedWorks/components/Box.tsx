import Image from "next/image";
import React from "react";

const Box = () => {
  return (
    <section className="rounded-2xl border border-light-border shadow-md overflow-hidden ">
      <Image
        src="/images/work2.jpg"
        width={200}
        height={100}
        alt="Work image"
        className="w-full h-auto"
      />

      <div className="flex flex-col gap-2.5 px-4 py-3 ">
        <h5 className="font-satoshi text-[26px] font-bold leading-tight">
          Redesigning the Core Dashboard of saas product
        </h5>
        <div className=""></div>

        <p className="text-[14px] text-light-theme-text/60 font-satoshi">
          The old dashboard had 11 years of visual debt. I stripped it back,
          rebuilt every component in React, and shipped a version that cut user
          drop-off by 40%.
        </p>

        <div className="flex justify-between ">
          <div className="flex gap-2">
            <Image src="/images/" width={25} height={20} alt="icon" />

            <div className="flex flex-col gap-1.5 ">
              <p>Trackflow HQ</p>
              <p className="text-[12px] text-light-theme-text/60 font-satoshi">
                Frontend + designer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Box;

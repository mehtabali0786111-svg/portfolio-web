import { div } from "motion/react-client";
import Image from "next/image";
import React from "react";

const icons: string[] = [
  "/images/github.jpg",
  "/images/gmail.jpg",
  "/images/linkdin.jpg",
  "/images/twitter.jpg",
];

export default function Footer() {
  return (
    <>
      <div className="flex gap-3 flex-start w-full items-center">
        <div className=" flex-1 bg-light-border h-[1px]"></div>
        <div className="flex gap-2  ">
          {icons.map((url, indx) => (
            <div
              key={indx}
              className="p-1.5 border border-light-border rounded-md "
            >
              <Image
                src={url}
                width={16}
                height={16}
                alt="social icon"
                className="hover:scale-105 cursor-pointer will-change-transform transition-transform"
              />
            </div>
          ))}
        </div>
        <div className=" flex-1 bg-light-border h-[1px]"></div>
      </div>

      <section className="relative overflow-hidden border-x border-b -top-4 border-light-border px-5 py-4 sm:px-8  md:py-14 lg:px-16 lg:pt-22 ">
        <div className="flex justify-center items-center w-full gap-5 mb-14">
          <span className="font-satoshi text-light-theme-text tracking-wide hidden md:inline">
            Thank you, for visiting here
          </span>
          <Image
            src="/images/stamp.png"
            width={110}
            height={110}
            alt="social icon"
            className="hidden md:inline"
          />
          <span className="font-satoshi text-light-theme-text tracking-wide hidden md:inline">
            Let's create something beautiful
          </span>
        </div>

        <div className="flex flex-col justify-center items-center gap-5">
          <Image
            src="/images/sign.png"
            width={147}
            height={70}
            alt="sign icon"
          />
          <span className="text-xs text-light-theme-text/70 font-satoshi">
            @apexita 2026
          </span>
        </div>
      </section>
    </>
  );
}

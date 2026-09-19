import Button from "@/components/ui/Button";
import Image from "next/image";
import React from "react";
import { PiHandWavingDuotone } from "react-icons/pi";
import WaveForm from "./components/WaveForm";
import TimerDisplay from "./components/TimerDisplay";
import NotePad from "./components/NotePad";
import Wallet from "./components/Wallet";

function AboutMe() {
  return (
    <section className="py-32 px-16 border-x border-light-border border-b">
      <h4 className="font-satoshi text-[22px] text-primary  mb-1 italic">
        // About me
      </h4>
      <h3 className="font-satoshi  text-[36px] font-bold text-[#3d3d3d] text-justify  mb-8">
        The person behind the pixels
      </h3>
      <div className="grid grid-cols-[350px_1fr_1fr] grid-rows-2 gap-3 w-full min-h-auto ">
        {/* Left image — spans both rows */}
        <div className="row-span-2 relative  h-full min-w-[350px] ">
          <Image
            src="/images/person_pic.jpg"
            width={300}
            height={100}
            alt="person photo"
            className="rounded-2xl object-cover h-[stretch] w-full"
          />
        </div>

        {/* Top-right: two boxes */}
        <div className="col-span-2 flex gap-3 max-h-[270px]">
          <div className="flex-1 bg-light-box rounded-2xl group overflow-hidden relative">
            <div className="flex h-full flex-col  p-1">
              <Image
                src="/images/color_comp.jpg"
                width={100}
                height={100}
                alt="Rainbow"
                className="-translate-y-[50%] rounded-full h-stretch! w-full object-cover cursor-pointer transition-transform duration-300 hover:scale-110 "
                style={{ height: "stretch" }}
              />

              <div className="flex flex-col -gap-2 h-full items-center relative -top-1/3">
                <WaveForm />
                <p className="text-[12px] font-satoshi text-light-theme-text/60">
                  Tyler
                </p>
                <p className="text-[16px] font-satoshi text-light-theme-text mb-1">
                  See you again
                </p>

                <div className="w-7 h-0.5 flex justify-center bg-dark-grey mb-1"></div>

                <TimerDisplay />
              </div>
            </div>
          </div>

          <div className="flex-1 bg-light-box rounded-2xl">
            <Wallet />
          </div>
        </div>

        {/* Bottom-right: one box spanning both columns */}
        <div className="col-span-2 bg-light-box min-w-0 rounded-2xl w-full relative p-2">
          <div className="w-[60%] h-2 absolute top-[20%] left-1/2 -translate-x-1/2 rounded-full bg-light "></div>
          <NotePad />

          <p className=" absolute bottom-3 text-[24px] font-satoshi -z-0 w-full text-center">
            I have a surprise for you 🙃
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;

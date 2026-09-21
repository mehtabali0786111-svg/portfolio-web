import Image from "next/image";
import WaveForm from "./components/WaveForm";
import TimerDisplay from "./components/TimerDisplay";
import NotePad from "./components/NotePad";
import Wallet from "./components/Wallet";

function AboutMe() {
  return (
    <section className="border-x border-b border-light-border px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-32">
      <h4 className="mb-1 font-satoshi text-[18px] italic text-primary sm:text-[22px]">
        {"// About me"}
      </h4>
      <h3 className="mb-8 font-satoshi text-[28px] font-bold leading-tight text-[#3d3d3d] sm:text-[36px] sm:text-justify">
        The person behind the pixels
      </h3>

      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-[350px_1fr_1fr] lg:grid-rows-2">
        <div className="relative min-h-[300px] overflow-hidden rounded-2xl md:col-span-2 md:min-h-[340px] lg:col-span-1 lg:row-span-2 lg:min-h-0 lg:min-w-[350px]">
          <Image
            src="/images/person_pic.jpg"
            width={300}
            height={100}
            alt="person photo"
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 md:col-span-2 lg:max-h-[230px]">
          <div className="group relative min-h-[150px] overflow-hidden rounded-2xl bg-light-box sm:min-h-[170px] md:min-h-[190px] lg:min-h-[220px]">
            <div className="flex h-full flex-col p-1">
              <Image
                src="/images/color_comp.jpg"
                width={100}
                height={100}
                alt="Rainbow"
                className="h-full w-full -translate-y-[50%] cursor-pointer rounded-full object-cover transition-transform duration-300 hover:scale-110"
              />

              <div className="relative -top-1/3 flex h-full flex-col -gap-2 items-center">
                <WaveForm />
                <p className="font-satoshi text-[12px] text-light-theme-text/60">
                  Tyler
                </p>
                <p className="mb-1 text-center font-satoshi text-[13px] text-light-theme-text sm:text-[16px]">
                  See you again
                </p>

                <div className="mb-1 flex h-0.5 w-7 justify-center bg-dark-grey" />

                <TimerDisplay />
              </div>
            </div>
          </div>

          <div className="min-h-[150px] rounded-2xl bg-light-box sm:min-h-[170px] md:min-h-[190px] lg:min-h-[220px]">
            <Wallet />
          </div>
        </div>

        <div className="isolate relative min-h-[210px] w-full min-w-0 overflow-hidden rounded-2xl bg-light-box p-2 md:col-span-2 md:min-h-[230px] lg:min-h-[250px]">
          <div className="absolute top-[20%] left-1/2 h-2 w-[60%] -translate-x-1/2 rounded-full bg-light" />
          <NotePad />

          <p className="absolute bottom-3 z-0 w-full text-center font-satoshi text-[18px] sm:text-[22px] lg:text-[24px]">
            I have a surprise for you :)
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;

import Image from "next/image";
import React from "react";

function Wallet() {
  return (
    <div className="flex h-full min-h-[150px] items-center justify-center sm:min-h-[170px] md:min-h-[190px] lg:min-h-[220px]">
      <div className="h-[92px] w-[78%] max-w-[160px] rounded-xl border border-b-0 border-light-border sm:h-[108px] md:h-[118px]">
        <div></div>

        <div className="relative">
          <Image
            src="/images/light_texture.jpg"
            width={165}
            height={100}
            alt="light texture"
            className="aspect-[1.65] w-full rounded-xl object-cover"
          />

          <div className="w-[95%] h-0.5 bg-light-border absolute bottom-[10%] -translate-x-1/2 left-1/2 rounded-md"></div>
          <div className="w-[95%] h-0.5 bg-light-border absolute bottom-[15%] -translate-x-1/2 left-1/2 rounded-md"></div>

          <Image
            src="/images/flagIcon.png"
            width={68}
            height={45}
            alt="flag"
            className="absolute top-3 right-2 w-[42%] rotate-[22deg] rounded-xl object-cover"
          />

          <Image
            src="/images/bullIcon.png"
            width={55}
            height={46}
            alt="bull"
            className="absolute bottom-5 w-[34%] rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Wallet;

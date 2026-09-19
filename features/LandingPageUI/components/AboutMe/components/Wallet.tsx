import Image from "next/image";
import React from "react";

function Wallet() {
  return (
    <div className="flex items-center justify-center h-[stretch]">
      <div className="border border-light-border rounded-xl   w-[80%] h-[120px] border-b-[0px]">
        <div></div>

        <div className="relative">
          <Image
            src="/images/light_texture.jpg"
            width={165}
            height={100}
            alt="light texture"
            className="object-cover aspect-auto rounded-xl "
          />

          <div className="w-[95%] h-0.5 bg-light-border absolute bottom-[10%] -translate-x-1/2 left-1/2 rounded-md"></div>
          <div className="w-[95%] h-0.5 bg-light-border absolute bottom-[15%] -translate-x-1/2 left-1/2 rounded-md"></div>

          <Image
            src="/images/flagIcon.png"
            width={68}
            height={45}
            alt="flag"
            className="object-cover aspect-auto rounded-xl absolute top-3 right-2 rotate-[22deg]"
          />

          <Image
            src="/images/bullIcon.png"
            width={55}
            height={46}
            alt="bull"
            className="object-cover aspect-auto rounded-xl  absolute bottom-5"
          />
        </div>
      </div>
    </div>
  );
}

export default Wallet;

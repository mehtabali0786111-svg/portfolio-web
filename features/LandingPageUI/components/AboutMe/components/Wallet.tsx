"use client";

import Image from "next/image";
import React, { useCallback, useState } from "react";

interface Photo {
  src: string;
  alt: string;
}

interface WalletProps {
  photos?: Photo[];
  title?: string;
  photoCount?: number;
  className?: string;
}

const DEFAULT_PHOTOS: Photo[] = [
  {
    src: "/images/person1.jpg",
    alt: "Spain travel photo 1",
  },
  {
    src: "/images/person2.jpg",
    alt: "Spain travel photo 2",
  },
  {
    src: "/images/person3.jpg",
    alt: "Spain travel photo 3",
  },
];

function Wallet({
  photos = DEFAULT_PHOTOS,
  title = "Spain trip",
  photoCount = 76,
  className = "",
}: WalletProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div
      className={`wallet-container relative mx-auto w-full max-w-[320px] ${className}`}
      style={{
        containerType: "inline-size",
        fontSize: "clamp(7px, 6.25cqw, 16px)",
      }}
    >
      <div className="relative aspect-[1/0.84] w-full">
        <button
          type="button"
          aria-label={`${title}, ${photoCount} photos. ${
            isOpen ? "Collapse" : "Expand"
          } photo stack`}
          className="
            absolute
            inset-0
            m-0
            flex
            h-full
            w-full
            
            flex-col
            items-center
            rounded-[1.5em]
            border-0
            bg-transparent
            p-0
            outline-none
            touch-manipulation
            select-none
            focus-visible:ring-2
            focus-visible:ring-neutral-400
            focus-visible:ring-offset-2
          "
        >
          {/* ================================
              PHOTO STACK
          ================================= */}
          <div
            className="
              absolute
              left-1/2
              top-[1.25em]
              z-20
              h-[6.5625em]
              w-[5.9375em]
              -translate-x-1/2
            "
          >
            {photos.slice(0, 3).map((photo, index) => {
              let closedTransform = "";
              let openTransform = "";

              if (index === 0) {
                closedTransform = "translate-y-[0.25em] rotate-[-3deg]";

                openTransform =
                  "translate-x-[-4.125em] translate-y-[0.1875em] rotate-[-7deg]";
              }

              if (index === 1) {
                closedTransform = "translate-y-[0.125em] rotate-[0deg]";

                openTransform =
                  "translate-x-[-0.125em] translate-y-[-0.3125em] rotate-[0deg]";
              }

              if (index === 2) {
                closedTransform = "translate-y-[0.375em] rotate-[4deg]";

                openTransform =
                  "translate-x-[4.125em] translate-y-0 rotate-[6deg]";
              }

              const zIndex =
                index === 2 ? "z-30" : index === 1 ? "z-20" : "z-10";

              return (
                <div
                  key={`${photo.src}-${index}`}
                  className={`
                    absolute
                    left-0
                    top-0
                    h-[6.25em]
                    w-[5.9375em]
                    overflow-hidden
                    rounded-[0.4375em]
                    border-[0.1875em]
                    border-white
                    bg-white
                    shadow-[0_0.125em_0.4375em_rgba(0,0,0,0.18)]
                    transition-transform
                    duration-500
                    ease-[cubic-bezier(.22,1,.36,1)]
                    ${zIndex}
                    ${isOpen ? openTransform : closedTransform}
                  `}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="96px"
                    className="object-cover"
                    priority={index === 1}
                  />
                </div>
              );
            })}
          </div>

          {/* ================================
              BACK WALLET
          ================================= */}
          <div
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-[2em]
              z-0
              h-[3.125em]
              w-[9.375em]
              -translate-x-1/2
              rounded-t-[0.8125em]
              border
              border-[#dedbd5]
              bg-[#e5e4e1]
            "
          />

          {/* ================================
              MAIN WALLET
          ================================= */}
          <div
            onClick={toggleOpen}
            aria-expanded={isOpen}
            className="
              absolute cursor-pointer
              left-1/2
              top-[4.0625em]
              z-40
              h-[7.5em]
              w-[10em]
              -translate-x-1/2
              overflow-hidden
              rounded-[0.8125em]
              bg-[#dededc]
              shadow-[0_0.125em_0.1875em_rgba(0,0,0,0.08)]
            "
          >
            {/* Texture */}
            <Image
              src="/images/light_texture.jpg"
              alt=""
              aria-hidden="true"
              fill
              sizes="160px"
              className="object-cover opacity-90"
            />

            {/* Gray Overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[#d8d8d6]/40"
            />

            {/* ================================
                SPAIN FLAG
            ================================= */}
            <Image
              src="/images/flagIcon.png"
              width={68}
              height={45}
              alt="Spain flag"
              className="
                absolute
                left-[0.4375em]
                top-[0.5em]
                z-10
                h-auto
                w-[4em]
                rotate-[-3deg]
                object-contain
                drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]
              "
            />

            {/* ================================
                BULL STICKER
            ================================= */}
            <Image
              src="/images/bullIcon.png"
              width={65}
              height={55}
              alt="Flamenco dancer sticker"
              className="
                absolute
                right-[0.875em]
                top-[2.875em]
                z-10
                h-auto
                w-[2.875em]
                rotate-[2deg]
                object-contain
                drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]
              "
            />

            {/* ================================
                WALLET LINES
            ================================= */}
            <div
              aria-hidden="true"
              className="
                absolute
                bottom-[0.875em]
                left-1/2
                z-20
                h-[0.125em]
                w-[94%]
                -translate-x-1/2
                rounded-full
                bg-[#c9c9c7]
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute
                bottom-[0.5em]
                left-1/2
                z-20
                h-[0.125em]
                w-[94%]
                -translate-x-1/2
                rounded-full
                bg-[#c9c9c7]
              "
            />
          </div>

          {/* ================================
              TITLE + PHOTO COUNT
          ================================= */}
          <div
            className="
              relative  
              lg:bottom-[-205px]
              bottom-[-205px]
              left-[111px]
              left-1/2
              z-50
              flex
              w-[11.875em]
              max-w-[calc(100%-1em)]
              -translate-x-1/2
              items-center
              justify-center
              gap-[0.5em]
              px-[0.25em]
            "
          >
            <span
              className="
                min-w-0
                truncate
                text-[1.5em]
                font-medium
                leading-none
                tracking-[-0.03125em]
                text-[#3d3d3d]
              "
            >
              {title}
            </span>

            <span
              className="
                shrink-0
                whitespace-nowrap
                rounded-[0.25em]
                bg-white
                px-[0.3125em]
                py-[0.125em]
                text-[0.6875em]
                leading-none
                text-[#999]
                shadow-[0_1px_2px_rgba(0,0,0,0.04)]
              "
            >
              {photoCount} photos
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Wallet;

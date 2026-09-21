import Image from "next/image";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";

interface companyInfoProps {
  company: string;
  role: string;
  imageUrl: string;
}

const CompanyInfo = ({ company, role, imageUrl }: companyInfoProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <div className="rounded-lg p-1.5 bg-light-box ">
          <Image
            src={`/images/${imageUrl}`}
            width={36}
            height={36}
            alt="icon"
            className="object-cover "
          />
        </div>

        <div className="flex flex-col ">
          <p className="font-satoshi ">{company}</p>
          <p className="text-[12px] text-light-theme-text/60 font-satoshi">
            {role}
          </p>
        </div>
      </div>


<div className="" ></div>


      <button
        className="
    group
    flex items-center justify-center
    rounded-full
    border border-light-border
    cursor-pointer
    duration-400
    transition-[transform]
    shadow-sm
    text-light
    h-[45px]
    p-[4px_10px] 

  "
      >
        <span
          className="
      relative
      flex h-6 w-6
      items-center justify-center
      overflow-hidden
      rounded-full
      bg-primary
    "
        >
          {/* First arrow */}
          <GoArrowUpRight
            size={16}
            className="
        absolute
        transition-transform
        duration-300
        ease-out
        group-hover:translate-x-full
        group-hover:-translate-y-full
      "
          />

          {/* Second arrow */}
          <GoArrowUpRight
            size={16}
            className="
        absolute
        -translate-x-full
        translate-y-full
        transition-transform
        duration-300
        ease-out
        group-hover:translate-x-0
        group-hover:translate-y-0
      "
          />
        </span>
      </button>
    </div>
  );
};

export default CompanyInfo;

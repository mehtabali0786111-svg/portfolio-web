import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";

interface CompanyInfoProps {
  company: string;
  role: string;
  logoSrc: string;
}

const CompanyInfo = ({ company, role, logoSrc }: CompanyInfoProps) => {
  return (
    <div className="relative flex items-center justify-between gap-3 px-5 pb-6 sm:pl-6 sm:pr-4 sm:pb-8">
      <div className="w-[90%] bg-light-text h-0.5 absolute -translate-x-1/2 left-1/2 rounded-lg -top-[10%]  "></div>
      <div className="flex min-w-0 gap-2 pt-3">
        <div className="rounded-lg bg-light-box p-1.5">
          <Image
            src={logoSrc}
            width={36}
            height={36}
            alt={`${company} logo`}
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-col">
          <p className="truncate font-satoshi">{company}</p>
          <p className="font-satoshi text-[12px] text-light-theme-text/60">
            {role}
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label={`View ${company} case study`}
        className="
          group flex h-[45px] cursor-pointer items-center justify-center
          rounded-full border border-light-border p-[4px_10px] text-light
          shadow-sm transition-[transform] duration-400
        "
      >
        <span
          className="
            relative flex h-6 w-6 items-center justify-center overflow-hidden
            rounded-full bg-primary
          "
        >
          <GoArrowUpRight
            size={16}
            className="
              absolute transition-transform duration-300 ease-out
              group-hover:translate-x-full group-hover:-translate-y-full
            "
          />
          <GoArrowUpRight
            size={16}
            className="
              absolute -translate-x-full translate-y-full transition-transform
              duration-300 ease-out group-hover:translate-x-0
              group-hover:translate-y-0
            "
          />
        </span>
      </button>
    </div>
  );
};

export default CompanyInfo;

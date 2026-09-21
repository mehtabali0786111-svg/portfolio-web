import React from "react";
import TimeBox from "./TimeBox";
import CompanyInfo from "./CompanyInfo";

interface contentBoxProps {
  title: string;
  description: string;
}

const companyData = {
  company: "Lumio",
  role: "Designer",
  imageUrl: "comp_logo2.png",
};
const ContentBox = ({ title, description }: contentBoxProps) => {
  return (
    <div className="flex flex-col gap-2.5 pl-6 pr-4 py-8 ">
      <h5 className="font-satoshi text-[26px] font-bold leading-tight">
        {title}
      </h5>

      <div className="flex gap-4">
        <TimeBox time="4 Months" />
        <TimeBox time="2026" />
      </div>

      <p className="text-[16px] text-light-theme-text/60 font-satoshi">
        {description}
      </p>

      <CompanyInfo {...companyData} />
    </div>
  );
};

export default ContentBox;

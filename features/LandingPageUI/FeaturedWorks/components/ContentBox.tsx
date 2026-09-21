import React from "react";

interface ContentBoxProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const ContentBox = ({ title, description, children }: ContentBoxProps) => {
  return (
    <div className="flex flex-col gap-2.5 px-5 pt-6 pb-4 sm:pl-6 sm:pr-4 sm:pt-8">
      <h5 className="font-satoshi text-[22px] font-bold leading-tight sm:text-[26px]">
        {title}
      </h5>

      {children ? <div className="flex flex-wrap gap-4">{children}</div> : null}

      <p className="font-satoshi text-[15px] text-light-theme-text/60 sm:text-[16px]">
        {description}
      </p>
    </div>
  );
};

export default ContentBox;

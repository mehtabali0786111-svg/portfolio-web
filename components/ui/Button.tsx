import React from "react";

import { FaArrowRightLong } from "react-icons/fa6";

interface ButtonProps {
  buttonTxt: string;
  hasAnimation?: boolean;
}

function Button({ buttonTxt, hasAnimation }: ButtonProps) {
  return (
    <button
      className={`group flex items-center space-x-2 rounded-full border border-light-border px-4  py-2.5 transition-colors duration-200 hover:text-primary cursor-pointer font-satoshi ${hasAnimation ? "shadow-md bg-white" : "bg-transparent"}`}
    >
      {hasAnimation ? (
        <>
          <span className="relative inline-flex h-3 w-3 group-hover:w-6 group-hover:h-6 shrink-0 items-center justify-center transition-all duration-300 overflow-hidden rounded-full bg-primary">
            <FaArrowRightLong
              className="h-3.5 w-3.5 -translate-x-2 text-white opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
              strokeWidth={1}
            />
          </span>
          <span>{buttonTxt}</span>
        </>
      ) : (
        <span>{buttonTxt}</span>
      )}
    </button>
  );
}

export default Button;

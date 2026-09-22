import React from "react";

function AvailableTag() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-light-border bg-white px-2 py-1 text-[10px] font-satoshi text-green-700 shadow-sm mb-3">
      <span className="relative flex h-1w-1">
        <span className="absolute inline h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
        <span className="relative inline h-1 w-1 rounded-full bg-green-500"></span>
      </span>
      <span className="text-[11px] font-satoshi font-light">Available</span>
    </div>
  );
}

export default AvailableTag;

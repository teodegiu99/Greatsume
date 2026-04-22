import React from "react";

const Logo = () => {
  return (
    <div className="flex flex-col items-start leading-none select-none font-['DM_Sans',_sans-serif]">
      {/* Parte Superiore: Greatsume */}
      <div className="text-3xl tracking-tight primary">
        <span className="font-normal ">G</span>
		 <span className="font-bold underline ml-[1px]">
          re
        </span>
		 <span className="font-normal ">at</span>
        <span className="font-bold underline ml-[1px]">
          sume
        </span>
      </div>

      {/* Parte Inferiore: Motto */}
      <div className="text-[10px] uppercase tracking-[0.15em] accent mt-1 font-medium pl-[52px]">
        Build, Style, Share. Effortlessly.
      </div>
    </div>
  );
};

export default Logo;
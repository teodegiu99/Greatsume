import React from "react";
import TopBar from "../components/left/LeftBar";
import CvHandler from "../components/center/CvHandler";

const ResumePage = () => {
  return (
    <div className="grid grid-cols-6 gap-4 h-[100dvh]">
      <div className="col-span-2 shadow-2xl overflow-auto scrollbar-hide">
        <TopBar />
      </div>
      <div className="col-span-3 customBtnCol">
        <CvHandler />
      </div>
      <div className="col-span-1 ">dghh</div>
    </div>
  );
};

export default ResumePage;

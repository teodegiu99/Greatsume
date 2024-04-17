"use client"
import React from "react";
import TopBar from "../components/left/LeftBar";
import CvHandler from "../components/center/CvHandler";
import TemplateCarousel from "../components/right/TemplateCarousel";
import { Provider } from "react-redux";
import { store } from "../../state/store";

const ResumePage = () => {
  return (
    <Provider store={store}>
    <div className="grid grid-cols-6 gap-4 h-full">
      <div className="col-span-2 shadow-2xl overflow-auto scrollbar-hide">
        <TopBar />
      </div>
      <div className="col-span-3 overflow-auto scrollbar-hide text-white">
        <CvHandler />
      </div>
      <div className="col-span-1 overflow-auto scrollbar-hide shadow-2xl">
        <TemplateCarousel />
      </div>
    </div>
    </Provider>
  );
};

export default ResumePage;

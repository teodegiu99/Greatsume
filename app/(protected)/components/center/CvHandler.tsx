"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";

import ClassicBlue from "../template/ClassicBlue";
import ElegantBlack from "../template/ElegantBlack";
import Tech from "../template/Tech";
import Anglo from "../template/Anglo";
import { Suspense } from "react";
import Loader from "@/components/Loader";

const templateArray = [ClassicBlue, ElegantBlack, Tech, Anglo];

const CvHandler = () => {
  const loaderTemplate = useSelector(
    (state: RootState) => state.loaderTemplate
  );
  const loaderCvData = useSelector((state: RootState) => state.loaderCvData);

  const template = useSelector((state: RootState) => state.template.value);
  const indexcomponent = Math.min(
    Math.max(template, 0),
    templateArray.length - 1
  );

  const ComponenteScelto = templateArray[indexcomponent];
  console.log("loaderTemplate:", loaderTemplate);
  console.log("loaderCvData", loaderCvData);
  return (
    <>
      {loaderTemplate.template && loaderCvData.cvdata && (
        <div className="w-full h-full">
          {ComponenteScelto && <ComponenteScelto />}
        </div>
      )}
      {(loaderTemplate.template == false || loaderCvData.cvdata == false)  && (
        <div className="flex w-full h-full justify-center items-center ">
         { <Loader />}
        </div>
      )}
    </>
  );
};

export default CvHandler;

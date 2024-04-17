"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";

import ClassicBlue from "../template/ClassicBlue";
import ElegantBlack from "../template/ElegantBlack";
import Tech from "../template/Tech";
import Anglo from "../template/Anglo"

const templateArray = [ClassicBlue, ElegantBlack, Tech, Anglo];

const CvHandler =  () => {
  const template = useSelector((state: RootState) => state.template.value); 
  const indexcomponent = Math.min(Math.max(template, 0), templateArray.length - 1);

  const ComponenteScelto = templateArray[indexcomponent];

  return (
    <div className="h-full flex justify-center items-center ">
 {ComponenteScelto && <ComponenteScelto />}
    </div>
  );
};

export default CvHandler;

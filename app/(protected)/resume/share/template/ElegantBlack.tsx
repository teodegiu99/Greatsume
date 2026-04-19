"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { ElegantBlackBase } from "@/components/templateBase/ElegantBlackBase";

const ElegantBlack = () => {
  const cvData = useSelector((state: RootState) => state.updateValues);
  const showHideOptions = useSelector((state: RootState) => state.showHide); // Passa ShowHide (con template)

  return <ElegantBlackBase data={cvData} showHide={showHideOptions} />;
};
export default ElegantBlack;
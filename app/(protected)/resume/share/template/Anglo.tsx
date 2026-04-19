"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { AngloBase } from "@/components/templateBase/AngloBase";

const Anglo = () => {
  const cvData = useSelector((state: RootState) => state.updateValues);
  const showHideOptions = useSelector((state: RootState) => state.showHide); // Passa ShowHide (con template)

  return <AngloBase data={cvData} showHide={showHideOptions} />;
};
export default Anglo;
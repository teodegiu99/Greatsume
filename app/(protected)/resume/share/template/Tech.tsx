"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { TechBase } from "@/components/template/templateBase/TechBase";

const Tech = () => {
    const cvData = useSelector((state: RootState) => state.updateValues);
    const showHideOptions = useSelector((state: RootState) => state.showHide); // Passa ShowHide (con template)

    return <TechBase data={cvData} showHide={showHideOptions} />;
};
export default Tech;

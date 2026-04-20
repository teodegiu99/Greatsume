"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { ClassicBlueBase } from "@/components/template/templateBase/ClassicBlueBase";

const ClassicBlue = () => {
    const cvData = useSelector((state: RootState) => state.updateValues);
    const showHideOptions = useSelector((state: RootState) => state.showHide); // Passa ShowHide (con template)

    return <ClassicBlueBase data={cvData} showHide={showHideOptions} />;
};
export default ClassicBlue;

"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { TechBase } from "@/components/template/templateBase/TechBase";

const Tech = () => {
    // 1. Prendi i dati dallo stato (assicurati che lo slice sia quello giusto)
    const cvData = useSelector((state: RootState) => state.updateValues);
    const showHideOptions = useSelector((state: RootState) => state.showHide);

    // 2. Passa i dati usando la prop "data" e "showHide"
    return <TechBase data={cvData} showHide={showHideOptions} />;
};

export default Tech;

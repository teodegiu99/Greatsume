"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { AngloBase } from "@/components/template/templateBase/AngloBase";

const Anglo = () => {
    // 1. Prendi i dati dallo stato (assicurati che lo slice sia quello giusto)
    const cvData = useSelector((state: RootState) => state.updateValues);
    const showHideOptions = useSelector((state: RootState) => state.showHide);

    // 2. Passa i dati usando la prop "data" e "showHide"
    return <AngloBase data={cvData} showHide={showHideOptions} />;
};

export default Anglo;

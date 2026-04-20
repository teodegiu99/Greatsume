"use client";
import { TemplateBaseProps } from "@/types/template";
import { ElegantBlackBase } from "@/components/template/templateBase/ElegantBlackBase";

export default function ElegantBlack({ data, showHide }: TemplateBaseProps) {
    // Ora TypeScript è felice perché l'interfaccia in ElegantBlackBase accetta il template come opzionale!
    return <ElegantBlackBase data={data} showHide={showHide} />;
}

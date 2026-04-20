"use client";
import { TemplateBaseProps } from "@/types/template";
import { TechBase } from "@/components/template/templateBase/TechBase";

export default function Tech({ data, showHide }: TemplateBaseProps) {
    // Ora TypeScript è felice perché l'interfaccia in TechBase accetta il template come opzionale!
    return <TechBase data={data} showHide={showHide} />;
}

"use client";
import { TemplateBaseProps } from "@/types/template";
import { AngloBase } from "@/components/templateBase/AngloBase";

export default function Anglo({ data, showHide }: TemplateBaseProps) {
  // Ora TypeScript è felice perché l'interfaccia in ElegantBlackBase accetta il template come opzionale!
  return <AngloBase data={data} showHide={showHide} />;
};



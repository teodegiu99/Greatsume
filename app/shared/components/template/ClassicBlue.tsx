"use client";
import { TemplateBaseProps } from "@/types/template";
import { ClassicBlueBase } from "@/components/templateBase/ClassicBlueBase";

export default function ClassicBlue	({ data, showHide }: TemplateBaseProps) {
  // Ora TypeScript è felice perché l'interfaccia in ClassicBlueBase accetta il template come opzionale!
  return <ClassicBlueBase data={data} showHide={showHide} />;
};



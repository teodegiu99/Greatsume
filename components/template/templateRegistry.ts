// components/templates/core/templateRegistry.ts
import React from "react";
import { TemplateBaseProps } from "@/types/template";

// Importa qui tutti i tuoi template base
import { AngloBase } from "./templateBase/AngloBase";
import { ElegantBlackBase } from "./templateBase/ElegantBlackBase";
import { ClassicBlueBase } from "./templateBase/ClassicBlueBase";
import { TechBase } from "./templateBase/TechBase";
// ... in futuro aggiungerai: import { MinimalBase } from "./MinimalBase";

// Crea ed esporta il dizionario dei template. 
// Usiamo TemplateBaseProps così TypeScript è felice e sicuro!
export const templateRegistry: Record<string, React.FC<TemplateBaseProps >| undefined> = {
  Anglo: AngloBase,
  ElegantBlack: ElegantBlackBase,
  ClassicBlue: ClassicBlueBase,
  Tech: TechBase,
  // Minimal: MinimalBase, <-- Basterà aggiungere una riga qui in futuro
};

// Bonus: Esportiamo anche la lista dei nomi, utile se in futuro 
// vuoi generare i bottoni del carosello dei template dinamicamente!
export const availableTemplates = Object.keys(templateRegistry);
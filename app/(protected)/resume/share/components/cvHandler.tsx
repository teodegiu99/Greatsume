"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";

import ClassicBlue from "../template/ClassicBlue";
import ElegantBlack from "../template/ElegantBlack";
import Tech from "../template/Tech";
import Anglo from "../template/Anglo";

interface TemplateComponents {
  [key: string]: React.ComponentType<any>;
}

// Oggetto che mappa i nomi dei componenti ai loro riferimenti
const templateComponents: TemplateComponents = {
  ClassicBlue,
  ElegantBlack,
  Tech,
  Anglo,
};

const CvHandler = () => {
  // Ottieni il nome del template dallo stato
  const selectedTemplate = useSelector(
    (state: RootState) => state.showHide.template
  );

  // Ottieni il componente corrispondente al nome dal mapping
  const ComponenteScelto = templateComponents[selectedTemplate];

  return (
    <div className="h-full flex justify-center items-center">
      {ComponenteScelto && <ComponenteScelto />}
    </div>
  );
};

export default CvHandler;

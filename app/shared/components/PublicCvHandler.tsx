"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";

import ClassicBlue from "./template/ClassicBlue";
import ElegantBlack from "./template/ElegantBlack";
import Tech from "./template/Tech";
import Anglo from "./template/Anglo";

interface TemplateComponents {
  [key: string]: React.ComponentType<any>;
}
interface PublicCvHandlerProps {
  selectedTemplate: string;
  publicLink: string;

}
// Oggetto che mappa i nomi dei componenti ai loro riferimenti
const templateComponents: TemplateComponents = {
  ClassicBlue,
  ElegantBlack,
  Tech,
  Anglo,
};

const PublicCvHandler: React.FC<PublicCvHandlerProps> = ({
  selectedTemplate, publicLink
}) => {

  const ComponenteScelto = templateComponents[selectedTemplate];

  return (
    <div className="h-full flex justify-center items-center">
      {ComponenteScelto && <ComponenteScelto publicLink={publicLink} />}
    </div>
  );
};

export default PublicCvHandler;

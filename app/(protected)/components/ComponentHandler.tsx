"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import TopBar from "../components/left/LeftBar";
import CvHandler from "../components/center/CvHandler";
import TemplateCarousel from "../components/right/TemplateCarousel";

interface Components {
  [key: string]: React.ComponentType<any>;
}

// Oggetto che mappa i nomi dei componenti ai loro riferimenti
const ComponentsList: Components = {
	TopBar,
	CvHandler,
	TemplateCarousel,
};

const ComponentHandler = () => {
  // Ottieni il nome del template dallo stato
  const selectedcomponent = useSelector(
    (state: RootState) => state.mobile.value
  );


  // Ottieni il componente corrispondente al nome dal mapping
  const ComponenteScelto = ComponentsList[selectedcomponent];

  return (
    <div className="h-full flex justify-center items-center overflow-auto scrollbar-hide ">
      {ComponenteScelto && <ComponenteScelto />}
    </div>
  );
};

export default ComponentHandler;

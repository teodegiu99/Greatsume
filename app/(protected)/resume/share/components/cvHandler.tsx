"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import * as z from "zod"

import ClassicBlue from "../template/ClassicBlue";
import ElegantBlack from "../template/ElegantBlack";
import Tech from "../template/Tech";
import Anglo from "../template/Anglo";
import { ResumeSchema } from "@/schemas";
import { useEffect, useState } from "react";
import { getInitialData } from "@/data/InitialData";

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
    const [object, setObject] = useState<Partial<z.infer<typeof ResumeSchema>>>(); // Definisci lo stato per object


  useEffect(() => {
    const fetchPublicValues = async () => {
        try {
            const data = await getInitialData();
            if (data) {
             
              setObject(data);
                
            }
            console.log(data)
        
        } catch (error) {
            console.error("Error connecting to db ", error);
        }
    };

    fetchPublicValues();
}, []);





  // Ottieni il nome del template dallo stato
  const selectedTemplate = useSelector(
    (state: RootState) => state.showHide.template
  );

  // Ottieni il componente corrispondente al nome dal mapping
  const ComponenteScelto = templateComponents[selectedTemplate];

  return (
    <div className="h-full flex justify-center items-center">
      {ComponenteScelto && <ComponenteScelto resume={object}/>}
    </div>
  );
};

export default CvHandler;

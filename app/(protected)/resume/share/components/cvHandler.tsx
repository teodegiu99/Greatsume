// "use client";
// import { useSelector } from "react-redux";
// import { RootState } from "@/app/state/store";
// import * as z from "zod";

// import ClassicBlue from "../template/ClassicBlue";
// import ElegantBlack from "../template/ElegantBlack";
// import Tech from "../template/Tech";
// import Anglo from "../template/Anglo";
// import { ResumeSchema } from "@/schemas";
// import { useEffect, useState } from "react";
// import { getInitialData } from "@/data/InitialData";

// // 1. IMPORTA IL WRAPPER
// // (Assicurati che il percorso sia corretto rispetto a dove hai salvato PaginationWrapper.tsx)
// import PaginationWrapper from "@/app/(protected)/components/center/PaginationWrapper";
// // import PaginationWrapper from "./PaginationWrapper"; 

// interface TemplateComponents {
//   [key: string]: React.ComponentType<any>;
// }

// // Oggetto che mappa i nomi dei componenti ai loro riferimenti
// const templateComponents: TemplateComponents = {
//   ClassicBlue,
//   ElegantBlack,
//   Tech,
//   Anglo,
// };
// interface CvHandlerProps {
//   publicLink?: string; // Aggiungi questa riga
// }
// const CvHandler = ({ publicLink }: CvHandlerProps) => {
//     const [object, setObject] = useState<Partial<z.infer<typeof ResumeSchema>>>();

//   useEffect(() => {
//     const fetchPublicValues = async () => {
//         try {
//             const data = await getInitialData();
//             if (data) {
//               setObject(data);
//             }
//             console.log(data);
//         } catch (error) {
//             console.error("Error connecting to db ", error);
//         }
//     };

//     fetchPublicValues();
//   }, []);

//   // Ottieni il nome del template dallo stato
//   const selectedTemplate = useSelector(
//     (state: RootState) => state.showHide.template
//   );

//   // Ottieni il componente corrispondente al nome dal mapping
//   const ComponenteScelto = templateComponents[selectedTemplate];

//   return (
//     // 2. Togli flex, justify-center e items-center da qui. Li gestisce il Wrapper.
//     <div className="w-full h-full"> 
//       {/* Assicuriamoci che i dati (object) siano stati caricati prima di renderizzare l'impaginazione */}
//       {ComponenteScelto && object ? (
        
//         // 3. AVVOLGI IL TUO TEMPLATE QUI
//         <PaginationWrapper>
//             <ComponenteScelto resume={object} publicLink={publicLink}/>
//         </PaginationWrapper>

//       ) : (
//         // Mostra un piccolo testo di caricamento mentre il DB restituisce i dati
//         <div className="flex h-full justify-center items-center text-slate-500">
//            Caricamento del curriculum in corso...
//         </div>
//       )}
//     </div>
//   );
// };

// export default CvHandler;
"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { useEffect, useState } from "react";
import { getInitialData } from "@/data/InitialData";
import PaginationWrapper from "@/app/(protected)/components/center/PaginationWrapper";
import { templateRegistry } from "@/components/template/templateRegistry";

// IMPORTA L'INTERFACCIA DA QUI
import { CvData } from "@/types/template"; 

const CvHandler = ({ publicLink }: { publicLink?: string }) => {
  // Ora usi CvData importato
  const [object, setObject] = useState<CvData | null>(null);

  useEffect(() => {
    const fetchPublicValues = async () => {
        try {
            const data = await getInitialData();
            if (data) {
              setObject(data as unknown as CvData);
            }
        } catch (error) {
            console.error("Error connecting to db ", error);
        }
    };
    fetchPublicValues();
  }, []);

  const showHideOptions = useSelector((state: RootState) => state.showHide);
  const selectedTemplate = showHideOptions.template || "ClassicBlue";
  const ComponenteScelto = templateRegistry[selectedTemplate];

  return (
    <div className="w-full h-full"> 
      {ComponenteScelto && object ? (
        <PaginationWrapper>
            <ComponenteScelto data={object} showHide={showHideOptions} />
        </PaginationWrapper>
      ) : (
        <div className="flex h-full justify-center items-center text-slate-500">
           Caricamento del curriculum in corso...
        </div>
      )}
    </div>
  );
};

export default CvHandler;
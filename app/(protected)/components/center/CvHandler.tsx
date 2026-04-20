// "use client";
// import { useSelector } from "react-redux";
// import { RootState } from "@/app/state/store";
// import PaginationWrapper from "./PaginationWrapper"; 
// import ClassicBlue from "../template/ClassicBlue";
// import ElegantBlack from "../template/ElegantBlack";
// import Tech from "../template/Tech";
// import Anglo from "../template/Anglo";
// import { Suspense } from "react";
// import Loader from "@/components/Loader";
// import { templateRegistry } from "@/components/template/templateRegistry";


// const templateArray = [ClassicBlue, ElegantBlack, Tech, Anglo];

// const CvHandler = () => {
//   const loaderTemplate = useSelector(
//     (state: RootState) => state.loaderTemplate
//   );
//   const loaderCvData = useSelector((state: RootState) => state.loaderCvData);

//   const template = useSelector((state: RootState) => state.template.value);
//   const indexcomponent = Math.min(
//     Math.max(template, 0),
//     templateArray.length - 1
//   );

//   const ComponenteScelto = templateArray[indexcomponent];
//   console.log("loaderTemplate:", loaderTemplate);
//   console.log("loaderCvData", loaderCvData);
//   return (
//     <>
//    {loaderTemplate.template && loaderCvData.cvdata && (
//         <PaginationWrapper>
//           {ComponenteScelto && <ComponenteScelto />}
//         </PaginationWrapper>
//       )}
//       {(loaderTemplate.template == false || loaderCvData.cvdata == false)  && (
//         <div className="flex w-full h-full justify-center items-center ">
//           <Loader />
//         </div>
//       )}
//     </>
//   );
// };

// export default CvHandler;
"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import PaginationWrapper from "./PaginationWrapper"; 
import Loader from "@/components/Loader";

// 1. Importi SOLO il registro! Addio import infiniti.
import { templateRegistry } from "@/components/template/templateRegistry";

// Creiamo un array delle "chiavi" (es. ["ClassicBlue", "ElegantBlack", "Tech", "Anglo"])
// Questo ci permette di continuare a usare l'indice numerico del tuo carosello
const templateKeys = Object.keys(templateRegistry);

const CvHandler = () => {
  // --- STATO DEI LOADER ---
  const loaderTemplate = useSelector((state: RootState) => state.loaderTemplate);
  const loaderCvData = useSelector((state: RootState) => state.loaderCvData);

  // --- DATI DEL CV E OPZIONI VISIBILITÀ (Obbligatori per i nuovi Template Base) ---
  const cvData = useSelector((state: RootState) => state.updateValues);
  const showHideOptions = useSelector((state: RootState) => state.showHide);

  // --- SELEZIONE DEL TEMPLATE ---
  const templateIndex = useSelector((state: RootState) => state.template.value);
  
  // Assicuriamoci che l'indice non vada fuori dai limiti del registro
  const indexcomponent = Math.min(
    Math.max(templateIndex, 0),
    templateKeys.length - 1
  );

  // Prendiamo il nome (es. "Tech") e il relativo Componente dal registro
  const templateName = templateKeys[indexcomponent];
  const ComponenteScelto = templateRegistry[templateName];

  return (
    <>
      {loaderTemplate.template && loaderCvData.cvdata && (
        <PaginationWrapper>
          {/* 2. Passiamo le props `data` e `showHide` al componente scelto!
            Ricorda: i nostri nuovi "Base" si aspettano sempre questi due dati.
          */}
          {ComponenteScelto && (
            <ComponenteScelto data={cvData} showHide={showHideOptions} />
          )}
        </PaginationWrapper>
      )}

      {/* 3. Loader fallback */}
      {(loaderTemplate.template === false || loaderCvData.cvdata === false) && (
        <div className="flex w-full h-full justify-center items-center ">
          <Loader />
        </div>
      )}
    </>
  );
};

export default CvHandler;
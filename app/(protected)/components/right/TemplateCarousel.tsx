// "use client";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setValue } from "../../../state/values/templateSlice";
// import { setUpdateValues } from "../../../state/values/loaderTemplateSlice";

// import { getTemplate } from "@/data/InitialData";
// import { RootState } from "@/app/state/store";

// interface CVTemplate {
//   title: string;
//   url: string;
//   description: string;
// }

// interface VerticalCarouselProps {
//   cvTemplates: CVTemplate[];
//   onItemClick: (index: number) => void;
//   selectedIndex: number; // Aggiungi una prop per tenere traccia dell'elemento selezionato
// }

// const VerticalCarousel: React.FC<VerticalCarouselProps> = ({
//   cvTemplates,
//   onItemClick,
//   selectedIndex,
// }) => {
//   return (
//     <div className="flex flex-col h-full gap-y-6 items-center">
//       {cvTemplates.map((template, index) => (
//         <div
//           key={index}
//           className={`bg-gray-200 lg:p-4 p-2  border w-1/2 lg:w-full border-gray-300 rounded-md shadow-md  lg:mr-0 lg:mb-6 aspect-w-210-h-297 ${
//             index === selectedIndex ? "selected" : ""
//           }`}
//           onClick={() => onItemClick(index)}
//         >
//           <h2 className="text-lg font-semibold mb-2">{template.title}</h2>
//         </div>
//       ))}
//     </div>
//   );
// };

// const TemplateCarousel: React.FC = () => {
//   const dispatch = useDispatch();

//   const templateArray = ["ClassicBlue", "ElegantBlack", "Tech", "Anglo"];
//   const [template, setTemplate] = useState<string>("");
//   const [index, setIndex] = useState<number>();
//   const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1); // Inizializza lo stato per tenere traccia dell'elemento selezionato

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getTemplate();
//         if (data) {
//           setTemplate(data);
//           dispatch(setUpdateValues(true));

//         } else {
//           dispatch(setUpdateValues(true));
//         }
//       } catch (error) {
//         console.error("Error connecting to db ", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const index = templateArray.indexOf(template);
//     setIndex(index);
//     dispatch(setValue(index));
//     setSelectedItemIndex(index); // Imposta l'elemento selezionato quando viene cliccato
//     console.log(index);
//   }, [template]); // Ora template è la sola dipendenza

//   // Esempio di dati per cvTemplates
//   const handleItemClick = (index: number) => {
//     dispatch(setValue(index));
//     setSelectedItemIndex(index); // Imposta l'elemento selezionato quando viene cliccato
//     console.log(`Elemento cliccato: ${index}`);
//   };

//   const cvTemplates: CVTemplate[] = [
//     {
//       title: "Classic Blue",
//       url: "https:template1",
//       description: "Questo è il template 1",
//     },
//     {
//       title: "Elegant Black",
//       url: "https:template2",
//       description: "Questo è il template 2",
//     },
//     {
//       title: "Tech",
//       url: "https:template3",
//       description: "Questo è il template 3",
//     },
//     {
//       title: "Anglo",
//       url: "https:template3",
//       description: "Questo è il template 3",
//     },
//   ];

//   return (
//     <>
//       <div className="sticky top-0 block bg-[#f8f8ff] p-3 z-50 border-b-2 border-slate-300">
//         <h3 className="text-center lg:m-4 formTitle">Choose Your Template</h3>
//       </div>
//       <div className="p-3 lg:p-5 bg-[#f8f8ff] overflow-auto  scrollbar-hide w-full">
//         <VerticalCarousel
//           cvTemplates={cvTemplates}
//           onItemClick={handleItemClick}
//           selectedIndex={selectedItemIndex}
//         />
//       </div>
//     </>
//   );
// };

// export default TemplateCarousel;
"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "../../../state/values/templateSlice";
import { setUpdateValues } from "../../../state/values/loaderTemplateSlice";

import { getTemplate } from "@/data/InitialData";
import { RootState } from "@/app/state/store";
import { templateRegistry, availableTemplates } from "@/components/template/templateRegistry";

interface VerticalCarouselProps {
  onItemClick: (index: number) => void;
  selectedIndex: number;
}

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({
  onItemClick,
  selectedIndex,
}) => {
  // Recupero i dati del CV e le opzioni di visibilità per l'anteprima dinamica
  const cvData = useSelector((state: RootState) => state.updateValues);
  const showHideOptions = useSelector((state: RootState) => state.showHide);

  return (
    <div className="flex flex-col h-full gap-y-6 items-center">
      {availableTemplates.map((templateName, index) => {
        const TemplateComponent = templateRegistry[templateName];
        
        return (
          <div
            key={templateName}
            className={`bg-white border w-full border-gray-300 rounded-md shadow-md cursor-pointer overflow-hidden transition-all ${
              index === selectedIndex ? "ring-4 ring-blue-500 scale-[1.02]" : "hover:border-blue-300"
            }`}
            onClick={() => onItemClick(index)}
          >
            {/* Header con il nome del template */}
            <div className="p-2 bg-gray-100 border-b border-gray-200">
              <h2 className="text-sm font-bold text-center uppercase tracking-wider text-slate-700">
                {templateName}
              </h2>
            </div>
            
            {/* Contenitore Anteprima: Scaliamo il template reale per farlo entrare nel riquadro */}
            <div className="relative w-full aspect-[1/1.41] bg-white overflow-hidden origin-top">
               <div 
                 className="absolute w-[800px] h-[1131px] origin-top-left scale-[0.25] pointer-events-none"
                 style={{ width: '800px', height: '1131px' }} // Dimensioni fisse per mantenere le proporzioni A4
               >
                  {TemplateComponent ? (
                    <TemplateComponent 
                      data={cvData} 
                      showHide={showHideOptions} 
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Preview non disponibile
                    </div>
                  )}
               </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const TemplateCarousel: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTemplate(); // Ottiene il nome del template dal DB
        if (data) {
          const index = availableTemplates.indexOf(data);
          if (index !== -1) {
            setSelectedItemIndex(index);
            dispatch(setValue(index));
          }
        }
        dispatch(setUpdateValues(true)); // Notifica il caricamento completato
      } catch (error) {
        console.error("Error connecting to db ", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleItemClick = (index: number) => {
    dispatch(setValue(index));
    setSelectedItemIndex(index);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f8ff]">
      <div className="sticky top-0 block bg-[#f8f8ff] p-3 z-50 border-b-2 border-slate-300">
        <h3 className="text-center lg:m-2 font-bold uppercase tracking-widest text-slate-700">
          Choose Your Template
        </h3>
      </div>
      <div className="p-3 lg:p-5 overflow-auto scrollbar-hide flex-1">
        <VerticalCarousel
          onItemClick={handleItemClick}
          selectedIndex={selectedItemIndex}
        />
      </div>
    </div>
  );
};

export default TemplateCarousel;
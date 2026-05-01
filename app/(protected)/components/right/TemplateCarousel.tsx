
// "use client";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setValue } from "../../../state/values/templateSlice";
// import { setUpdateValues } from "../../../state/values/loaderTemplateSlice";

// import { getTemplate } from "@/data/InitialData";
// import { RootState } from "@/app/state/store";
// import { templateRegistry, availableTemplates } from "@/components/template/templateRegistry";

// interface VerticalCarouselProps {
//   onItemClick: (index: number) => void;
//   selectedIndex: number;
// }

// const VerticalCarousel: React.FC<VerticalCarouselProps> = ({
//   onItemClick,
//   selectedIndex,
// }) => {
//   // Recupero i dati del CV e le opzioni di visibilità per l'anteprima dinamica
//   const cvData = useSelector((state: RootState) => state.updateValues);
//   const showHideOptions = useSelector((state: RootState) => state.showHide);

//   return (
//     <div className="flex flex-col h-full gap-y-6 items-center">
//       {availableTemplates.map((templateName, index) => {
//         const TemplateComponent = templateRegistry[templateName];
        
//         return (
//           <div
//             key={templateName}
//             className={`bg-white border w-full border-gray-300 rounded-md shadow-md cursor-pointer overflow-hidden transition-all ${
//               index === selectedIndex ? "ring-4 ring-blue-500 scale-[1.02]" : "hover:border-blue-300"
//             }`}
//             onClick={() => onItemClick(index)}
//           >
//             {/* Header con il nome del template */}
//             <div className="p-2 bg-gray-100 border-b border-gray-200">
//               <h2 className="text-sm font-bold text-center uppercase tracking-wider text-slate-700">
//                 {templateName}
//               </h2>
//             </div>
            
//             {/* Contenitore Anteprima: Scaliamo il template reale per farlo entrare nel riquadro */}
//             <div className="relative w-full aspect-[1/1.41] bg-white overflow-hidden origin-top">
//                <div 
//                  className="absolute w-[800px] h-[1131px] origin-top-left scale-[0.25] pointer-events-none"
//                  style={{ width: '800px', height: '1131px' }} // Dimensioni fisse per mantenere le proporzioni A4
//                >
//                   {TemplateComponent ? (
//                     <TemplateComponent 
//                       data={cvData} 
//                       showHide={showHideOptions} 
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center h-full text-gray-400">
//                       Preview non disponibile
//                     </div>
//                   )}
//                </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// const TemplateCarousel: React.FC = () => {
//   const dispatch = useDispatch();
//   const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getTemplate(); // Ottiene il nome del template dal DB
//         if (data) {
//           const index = availableTemplates.indexOf(data);
//           if (index !== -1) {
//             setSelectedItemIndex(index);
//             dispatch(setValue(index));
//           }
//         }
//         dispatch(setUpdateValues(true)); // Notifica il caricamento completato
//       } catch (error) {
//         console.error("Error connecting to db ", error);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   const handleItemClick = (index: number) => {
//     dispatch(setValue(index));
//     setSelectedItemIndex(index);
//   };

//   return (
//     <div className="flex flex-col h-full bg-[#f8f8ff] z-40">
//       <div className="sticky top-0 block bg-[#f8f8ff] p-3 z-40 border-b-2 border-slate-300">
//         <h3 className="text-center lg:m-2 font-bold uppercase tracking-widest text-slate-700">
//           Choose Your Template
//         </h3>
//       </div>
//       <div className="p-3 lg:p-5 overflow-auto scrollbar-hide flex-1">
//         <VerticalCarousel
//           onItemClick={handleItemClick}
//           selectedIndex={selectedItemIndex}
//         />
//       </div>
//     </div>
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
  const cvData = useSelector((state: RootState) => state.updateValues);
  const showHideOptions = useSelector((state: RootState) => state.showHide);

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:flex md:flex-col h-full md:gap-y-6 items-start md:items-center">
      {availableTemplates.map((templateName, index) => {
        const TemplateComponent = templateRegistry[templateName];
        
        return (
          <div
            key={templateName}
            className={`bg-white border w-full border-gray-300 rounded-xl md:rounded-md shadow-sm cursor-pointer overflow-hidden transition-all ${
              index === selectedIndex ? "ring-2 md:ring-4 ring-blue-500 scale-[1.02]" : "hover:border-blue-300 hover:shadow-md"
            }`}
            onClick={() => onItemClick(index)}
          >
            {/* Header: Testo più piccolo su mobile per evitare che vada a capo */}
            <div className="p-2 bg-gray-50 border-b border-gray-100">
              <h2 className="text-[10px] sm:text-xs md:text-sm font-bold text-center uppercase tracking-wider text-slate-700 truncate">
                {templateName}
              </h2>
            </div>
            
            <div className="relative w-full aspect-[1/1.41] bg-white overflow-hidden origin-top">
               {/* 2. Modificato lo scale: più piccolo su mobile (0.18/0.21) per fittare la mezza colonna, 0.25 su desktop */}
               <div 
                 className="absolute w-[800px] h-[1131px] origin-top-left scale-[0.18] min-[400px]:scale-[0.21] md:scale-[0.25] pointer-events-none"
                 style={{ width: '800px', height: '1131px' }} 
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
        const data = await getTemplate();
        if (data) {
          const index = availableTemplates.indexOf(data);
          if (index !== -1) {
            setSelectedItemIndex(index);
            dispatch(setValue(index));
          }
        }
        dispatch(setUpdateValues(true)); 
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
    <div className="flex flex-col h-full bg-[#f8f8ff] z-40">
      <div className="sticky top-0 block bg-[#f8f8ff]/90 backdrop-blur-sm p-3 md:p-4 z-40 border-b border-slate-200">
        <h3 className="text-center md:m-2 text-sm md:text-base font-bold uppercase tracking-widest text-slate-700">
          Choose Your Template
        </h3>
      </div>
      <div className="p-3 lg:p-5 overflow-auto scrollbar-hide flex-1 pb-20">
        <VerticalCarousel
          onItemClick={handleItemClick}
          selectedIndex={selectedItemIndex}
        />
      </div>
    </div>
  );
};

export default TemplateCarousel;
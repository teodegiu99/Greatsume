"use client";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";

interface PaginationWrapperProps {
  children: React.ReactNode;
}

const PaginationWrapper = ({ children }: PaginationWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);
  
  // Dati da usare come trigger: quando cambiano, ricalcoliamo
  const cvData = useSelector((state: RootState) => state.updateValues);

  // Misure standard A4 a 96dpi
  const A4_HEIGHT_PX = 1123; 
  const A4_WIDTH_PX = 794;
  const MARGIN_PX = 38; // ~1cm di margine desiderato
  const VISUAL_GAP = 40; // Altezza della "maschera" grigia che separa le pagine

useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Estraiamo la logica in una funzione
    const calculateLayout = () => {
      const items = container.querySelectorAll(".paginate-item");
      
      // Reset di tutti i margini
      items.forEach((el) => {
        (el as HTMLElement).style.marginTop = "0px";
      });

      // Ricalcolo
      items.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const rect = htmlEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const topRelativeToContainer = rect.top - containerRect.top;
        const bottomRelativeToContainer = topRelativeToContainer + rect.height;

        const currentPageIndex = Math.floor(topRelativeToContainer / A4_HEIGHT_PX);
        const pageBottomLimit = (currentPageIndex + 1) * A4_HEIGHT_PX - MARGIN_PX;

        if (bottomRelativeToContainer > pageBottomLimit) {
          const newPageStart = (currentPageIndex + 1) * A4_HEIGHT_PX + MARGIN_PX;
          const pushAmount = newPageStart - topRelativeToContainer;
          htmlEl.style.marginTop = `${pushAmount}px`;
        }
      });

      const totalHeight = container.scrollHeight;
      setPages(Math.ceil(totalHeight / A4_HEIGHT_PX));
    };

    // 2. Eseguiamo il calcolo subito (per quando l'utente digita velocemente)
    calculateLayout();

    // 3. Lo ri-eseguiamo dopo 300ms! 
    // Questo dà il tempo al browser di renderizzare i dati del DB e caricare eventuali immagini
    const timer = setTimeout(() => {
      calculateLayout();
    }, 300);

    // Pulizia del timer
    return () => clearTimeout(timer);

  }, [cvData]); // L'effetto scatta ogni volta che cvData cambia (sia da DB che da tastiera)

  return (
    // Sfondo del builder (grigio per far risaltare i fogli bianchi)
    <div className="w-full h-full bg-[#f3f4f6] overflow-auto flex justify-center py-8">
      
      {/* Contenitore reale del CV */}
      <div
        ref={containerRef}
        className="relative shadow-2xl bg-white h-fit"
        style={{ 
          width: `${A4_WIDTH_PX}px`, 
          minHeight: `${A4_HEIGHT_PX}px` 
        }}
      >
        {children}

        {/* Le "Forbici": Div posizionati in modo assoluto che coprono il CV e simulano lo stacco tra le pagine */}
        {Array.from({ length: Math.max(0, pages - 1) }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full bg-[#f3f4f6] flex items-center justify-center pointer-events-none"
            style={{
              height: `${VISUAL_GAP}px`,
              // Posizioniamo la mascherina esattamente a cavallo tra le due pagine
              top: `${(i + 1) * A4_HEIGHT_PX - (VISUAL_GAP / 2)}px`,
              left: 0,
              zIndex: 50, // Deve stare sopra la colonna blu di ClassicBlue
            }}
          >
            {/* Opzionale: linea tratteggiata per estetica */}
            <div className="w-full border-t border-dashed border-gray-400 relative">
               <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f3f4f6] px-2 text-xs text-gray-400">
                 Pagina {i + 2}
               </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaginationWrapper;
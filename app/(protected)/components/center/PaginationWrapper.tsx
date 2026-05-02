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
  const templateIndex = useSelector((state: RootState) => state.template.value);
  const showHideOptions = useSelector((state: RootState) => state.showHide);

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
      
      // Ripristina i margini originali (CSS)
      items.forEach((el) => {
        (el as HTMLElement).style.marginTop = "";
      });

      // Ricalcolo
      items.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const rect = htmlEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const topRelativeToContainer = rect.top - containerRect.top;
        const bottomRelativeToContainer = topRelativeToContainer + rect.height;

        const currentPageIndex = Math.floor(topRelativeToContainer / A4_HEIGHT_PX);
        const pageTopLimit = currentPageIndex * A4_HEIGHT_PX + MARGIN_PX;
        const pageBottomLimit = (currentPageIndex + 1) * A4_HEIGHT_PX - MARGIN_PX;

        let pushAmount = 0;

        // Se l'elemento cade nel margine superiore di una pagina (non la prima)
        if (currentPageIndex > 0 && topRelativeToContainer < pageTopLimit) {
          pushAmount = pageTopLimit - topRelativeToContainer;
        } 
        // Se l'elemento sfora il limite inferiore della pagina corrente
        else if (bottomRelativeToContainer > pageBottomLimit) {
          const newPageStart = (currentPageIndex + 1) * A4_HEIGHT_PX + MARGIN_PX;
          pushAmount = newPageStart - topRelativeToContainer;
        }

        if (pushAmount > 0) {
          const currentMargin = parseFloat(window.getComputedStyle(htmlEl).marginTop) || 0;
          htmlEl.style.marginTop = `${currentMargin + pushAmount}px`;

          // Controllo per il CSS margin-collapsing:
          const newRect = htmlEl.getBoundingClientRect();
          const currentContainerRect = container.getBoundingClientRect(); // Rileggiamo per evitare bug da Scroll Anchoring!
          const newTopRelativeToContainer = newRect.top - currentContainerRect.top;
          const expectedTop = topRelativeToContainer + pushAmount;

          if (newTopRelativeToContainer < expectedTop - 1) { // 1px di tolleranza
            const deficit = expectedTop - newTopRelativeToContainer;
            htmlEl.style.marginTop = `${currentMargin + pushAmount + deficit}px`;
          }
        }
      });

      const totalHeight = container.scrollHeight;
      setPages(Math.ceil(totalHeight / A4_HEIGHT_PX));
    };

    // 2. Eseguiamo il calcolo subito
    calculateLayout();

    // 3. Eseguiamo dopo il caricamento dei font (spesso causa di shift di layout)
    document.fonts.ready.then(() => {
      calculateLayout();
    });

    // 4. Fallback con timer multipli per immagini o risorse lente
    const timers = [100, 500, 1000].map(delay => 
      setTimeout(calculateLayout, delay)
    );

    // Pulizia dei timer
    return () => timers.forEach(clearTimeout);

  }, [cvData, templateIndex, showHideOptions]); // L'effetto scatta ogni volta che cvData, il template, o i toggle cambiano

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
"use client";
import { useEffect, useRef, useState } from "react";

interface PaginationWrapperProps {
  children: React.ReactNode;
}

const PaginationWrapper = ({ children }: PaginationWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);

  // Misure standard A4 a 96dpi
  const A4_HEIGHT_PX = 1123; 
  const A4_WIDTH_PX = 794;
  const MARGIN_PX = 38; 
  const VISUAL_GAP = 40;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Funzione che esegue il calcolo matematico
    const calculateLayout = () => {
      const items = container.querySelectorAll(".paginate-item");
      
      // Reset dei margini prima di ricalcolare
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

    // 2. Eseguiamo un primo calcolo
    calculateLayout();

    // 3. Il MutationObserver: osserva letteralmente se il contenuto HTML interno cambia
    // (es. quando arrivano i dati dal DB e il testo viene stampato a schermo)
    const observer = new MutationObserver(() => {
      calculateLayout();
    });

    // Diciamo all'observer di guardare figli, sotto-figli e testi, ma NON gli attributi
    // (così quando modifichiamo il marginTop non va in loop infinito!)
    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: false, 
    });

    // Timer di sicurezza per le immagini che ci mettono un po' a caricare
    const timer = setTimeout(calculateLayout, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect(); // Spegne l'observer quando smontiamo il componente
    };
  }, []); // <--- Array vuoto! Niente più dipendenze da Redux!

  return (
    <div className="w-full h-full bg-[#f3f4f6] overflow-auto flex justify-center py-8">
      <div
        ref={containerRef}
        className="relative shadow-2xl bg-white h-fit"
        style={{ 
          width: `${A4_WIDTH_PX}px`, 
          minHeight: `${A4_HEIGHT_PX}px` 
        }}
      >
        {children}

        {/* Le Forbici / Mascherina grigia */}
        {Array.from({ length: Math.max(0, pages - 1) }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full bg-[#f3f4f6] flex items-center justify-center pointer-events-none"
            style={{
              height: `${VISUAL_GAP}px`,
              top: `${(i + 1) * A4_HEIGHT_PX - (VISUAL_GAP / 2)}px`,
              left: 0,
              zIndex: 50,
            }}
          >
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
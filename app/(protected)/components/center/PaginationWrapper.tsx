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

    // 1. Reset di tutti i margini prima di ricalcolare (fondamentale se l'utente cancella testo)
    const items = container.querySelectorAll(".paginate-item");
    items.forEach((el) => {
      (el as HTMLElement).style.marginTop = "0px";
    });

    // 2. Ricalcolo delle posizioni
    items.forEach((el) => {
      const htmlEl = el as HTMLElement;
      
      // Otteniamo le posizioni relative alla viewport
      const rect = htmlEl.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Calcoliamo il 'top' e 'bottom' dell'elemento rispetto all'inizio del foglio CV
      const topRelativeToContainer = rect.top - containerRect.top;
      const bottomRelativeToContainer = topRelativeToContainer + rect.height;

      // In quale pagina si trova l'inizio di questo elemento? (0 = prima pagina, 1 = seconda, ecc.)
      const currentPageIndex = Math.floor(topRelativeToContainer / A4_HEIGHT_PX);
      
      // Qual è il limite inferiore di questa pagina (sottraendo il margine)?
      const pageBottomLimit = (currentPageIndex + 1) * A4_HEIGHT_PX - MARGIN_PX;

      // Se la fine dell'elemento supera il limite della pagina corrente...
      if (bottomRelativeToContainer > pageBottomLimit) {
        // ...calcoliamo di quanti pixel dobbiamo spingerlo in giù per portarlo alla pagina successiva (+ margine)
        const newPageStart = (currentPageIndex + 1) * A4_HEIGHT_PX + MARGIN_PX;
        const pushAmount = newPageStart - topRelativeToContainer;
        
        // Applichiamo il margine. Al prossimo ciclo del forEach, getBoundingClientRect 
        // ricalcolerà automaticamente la posizione shiftata per gli elementi successivi!
        htmlEl.style.marginTop = `${pushAmount}px`;
      }
    });

    // 3. Aggiorniamo il numero di pagine totali per disegnare i "tagli" visivi
    const totalHeight = container.scrollHeight;
    setPages(Math.ceil(totalHeight / A4_HEIGHT_PX));

  }, [cvData]); // Ricalcola ogni volta che l'utente scrive qualcosa

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
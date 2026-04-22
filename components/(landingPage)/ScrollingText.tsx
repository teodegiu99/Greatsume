"use client";

import React from "react";

export default function RibbonLogos() {
  const items = [
    "Software Engineer", "✦", "Marketing Manager", "✦", 
    "Graphic Designer", "✦", "Data Scientist", "✦", 
    "Product Manager", "✦", "Sales Executive", "✦",
    "UX/UI Designer", "✦", "Financial Analyst", "✦",
    "Project Manager", "✦", "Frontend Developer", "✦"
  ];

  return (
    <div className="relative flex overflow-hidden py-10 bg-transparent w-full">
      {/* Sfumature laterali (creano l'effetto di dissolvenza in entrata e uscita) */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-neutral-50 dark:from-neutral-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-neutral-50 dark:from-neutral-900 to-transparent z-10 pointer-events-none" />

      {/* CSS iniettato per l'animazione plug-and-play */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-infinite-scroll {
          /* 80s è la velocità. Aumenta per rallentare, diminuisci per velocizzare */
          animation: infinite-scroll 80s linear infinite;
        }
        /* Mette in pausa l'animazione quando l'utente ci passa sopra col mouse */
        .scrolling-container:hover .animate-infinite-scroll {
          animation-play-state: paused;
        }
      `}} />

      {/* Contenitore principale che raggruppa le due liste */}
      <div className="flex w-max scrolling-container cursor-default">
        
        {/* === LISTA 1 === */}
        <div className="flex w-max animate-infinite-scroll items-center">
          {items.map((item, index) => (
            <span 
              key={`list1-${index}`} 
              className={`mx-6 md:mx-10 text-xl md:text-3xl font-bold uppercase tracking-widest whitespace-nowrap ${
                item === "✦" 
                  ? "text-violet-500" 
                  : "text-neutral-300 dark:text-neutral-700 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        {/* === LISTA 2 (Copia esatta per il loop infinito) === */}
        <div className="flex w-max animate-infinite-scroll items-center" aria-hidden="true">
          {items.map((item, index) => (
            <span 
              key={`list2-${index}`} 
              className={`mx-6 md:mx-10 text-xl md:text-3xl font-bold uppercase tracking-widest whitespace-nowrap ${
                item === "✦" 
                  ? "text-violet-500" 
                  : "text-neutral-300 dark:text-neutral-700 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}
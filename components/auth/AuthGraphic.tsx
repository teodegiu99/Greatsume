// components/auth/AuthGraphic.tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const AuthGraphic = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      
      // Reset iniziale: pulizia totale
      gsap.set(".cv-block-side, .cv-block-main", { width: "0%", opacity: 0 });
      gsap.set(".cv-fade-side, .cv-fade-main", { opacity: 0, y: 10 });
      gsap.set(".cv-dot", { scale: 0 });

      // 1. Entrata della pagina
      tl.to(".cv-page", { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
        
        // 2. ANIMAZIONE SIDEBAR (Sinistra del CV)
        .to(".cv-fade-side", { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 })
        .to(".cv-dot", { scale: 1, duration: 0.3, stagger: 0.05 }, "-=0.2")
        .to(".cv-block-side", { width: "100%", opacity: 1, duration: 0.4, stagger: 0.05 }, "-=0.2")

        // 3. RITARDO INTERNO E ANIMAZIONE MAIN (Destra del CV)
        // Inizia con un offset di "-=0.1" o un delay esplicito per far capire la distinzione
        .to(".cv-fade-main", { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.2 }) 
        .to(".cv-block-main", { 
          width: "100%", 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.08, 
          ease: "power1.inOut" 
        }, "-=0.3");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full perspective-1000 py-10">
      <div className="cv-page bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl flex flex-row overflow-hidden border border-neutral-200 dark:border-neutral-800 transform rotate-y-[-5deg] rotate-x-[2deg]">
        
        {/* SIDEBAR (Colonna Sinistra CV) - Più scura per contrasto[cite: 1] */}
        <div className="w-[35%] bg-violet-50 dark:bg-violet-950/20 p-6 border-r border-violet-100 dark:border-violet-900/30 space-y-6">
          {/* Foto Profilo[cite: 1] */}
          <div className="w-20 h-20 rounded-2xl bg-violet-200 dark:bg-violet-800/50 mx-auto cv-fade-side shadow-inner"></div>
          
          {/* Contatti densi[cite: 1] */}
          <div className="space-y-3">
            <div className="h-2 w-10 bg-violet-300 dark:bg-violet-700 rounded cv-fade-side mb-2"></div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-400 cv-dot flex-shrink-0"></div>
                <div className="h-1.5 bg-violet-200 dark:bg-violet-800 rounded-full w-full cv-block-side"></div>
              </div>
            ))}
          </div>

          {/* Skill Tags[cite: 1] */}
          <div className="space-y-3">
            <div className="h-2 w-12 bg-violet-300 dark:bg-violet-700 rounded cv-fade-side mb-2"></div>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-4 bg-white dark:bg-violet-900/40 rounded-md shadow-sm cv-dot border border-violet-100 dark:border-violet-800"></div>
              ))}
            </div>
          </div>

          {/* Languages[cite: 1] */}
          <div className="space-y-3">
            <div className="h-2 w-14 bg-violet-300 dark:bg-violet-700 rounded cv-fade-side mb-2"></div>
            {[1, 2].map((i) => (
              <div key={i} className="h-1.5 bg-violet-200 dark:bg-violet-800 rounded-full w-full overflow-hidden">
                <div className="cv-block-side h-full bg-violet-500"></div>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT (Colonna Destra CV) - Bianca e pulita[cite: 1] */}
        <div className="flex-1 bg-white dark:bg-neutral-900 p-8 space-y-6">
          {/* Header professionale[cite: 1] */}
          <div className="space-y-3 pb-6 border-b border-neutral-100 dark:border-neutral-800">
            <div className="h-6 bg-neutral-800 dark:bg-neutral-100 rounded-md w-2/3 cv-fade-main"></div>
            <div className="h-3.5 bg-violet-600 rounded-md w-1/3 cv-fade-main"></div>
          </div>

          {/* Profile Summary[cite: 1] */}
          <div className="space-y-2">
            <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full w-full cv-block-main"></div>
            <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full w-full cv-block-main"></div>
            <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full w-3/4 cv-block-main"></div>
          </div>

          {/* Esperienze lavorative piene[cite: 1] */}
          {[1, 2].map((exp) => (
            <div key={exp} className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <div className="h-3 bg-neutral-700 dark:bg-neutral-300 rounded w-1/4 cv-fade-main"></div>
                <div className="h-2 bg-neutral-300 dark:bg-neutral-600 rounded w-16 cv-fade-main"></div>
              </div>
              <div className="space-y-2">
                <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full w-full cv-block-main"></div>
                <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full w-5/6 cv-block-main"></div>
                <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full w-4/6 cv-block-main"></div>
              </div>
            </div>
          ))}

          {/* Projects Section[cite: 1] */}
          <div className="pt-4 space-y-4">
            <div className="h-3 bg-neutral-800 dark:bg-neutral-300 rounded w-1/5 cv-fade-main"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border border-neutral-100 dark:border-neutral-800 rounded-xl space-y-2 cv-fade-main">
                <div className="h-2 bg-neutral-400 rounded w-1/2"></div>
                <div className="h-1 bg-neutral-200 rounded w-full"></div>
              </div>
              <div className="p-3 border border-neutral-100 dark:border-neutral-800 rounded-xl space-y-2 cv-fade-main">
                <div className="h-2 bg-neutral-400 rounded w-1/2"></div>
                <div className="h-1 bg-neutral-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer tags[cite: 1] */}
      <div className="mt-8 flex justify-center gap-4 cv-fade-main">
        <div className="px-4 py-2 bg-white/10 rounded-full text-[10px] uppercase tracking-widest text-white border border-white/20 backdrop-blur-md">Professional Layout</div>
        <div className="px-4 py-2 bg-white/10 rounded-full text-[10px] uppercase tracking-widest text-white border border-white/20 backdrop-blur-md">ATS Optimized</div>
      </div>
    </div>
  );
};
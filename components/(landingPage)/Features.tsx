"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    LightningBoltIcon,
    LockClosedIcon,
    FileTextIcon,
    MagicWandIcon,
} from "@radix-ui/react-icons";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function Features() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".bento-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
                y: 40,
                opacity: 0,
                duration: 0.7,
                stagger: 0.15,
                ease: "power3.out",
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-24 px-6 max-w-7xl mx-auto w-full"
        >
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white mb-6">
                    Progettato per farti superare la selezione.
                </h2>
                <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                    Strumenti veloci, sicuri e ottimizzati per i moderni
                    processi di recruiting.
                </p>
            </div>

            {/* Nuova Bento Grid con Micro-UI */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* CARD 1 - Larga (Editor Real-Time) */}
                <div className="bento-card relative md:col-span-2 bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 overflow-hidden group">
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center h-full">
                        <div className="flex-1">
                            <div className="w-12 h-12 bg-white dark:bg-neutral-800 shadow-sm rounded-xl flex items-center justify-center mb-6 text-violet-600 border border-neutral-100 dark:border-neutral-700">
                                <LightningBoltIcon className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">
                                Editor in Tempo Reale
                            </h3>
                            <p className="text-neutral-500 dark:text-neutral-400">
                                Scrivi a sinistra, ammira a destra. Modifica le
                                tue informazioni e guarda il layout adattarsi
                                all'istante. Cambiare stile richiede
                                letteralmente un solo click.
                            </p>
                        </div>

                        {/* Micro-UI: Finto Editor */}
                   <div className="flex-1 w-full flex flex-col p-4 bg-white dark:bg-neutral-950 rounded-2xl shadow-xl border border-neutral-100 dark:border-neutral-800 transform group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-500">
  
  {/* Header della Finestra (Pulsanti Mac) */}
  <div className="flex gap-2 mb-4">
    <div className="w-3 h-3 rounded-full bg-red-400" />
    <div className="w-3 h-3 rounded-full bg-amber-400" />
    <div className="w-3 h-3 rounded-full bg-emerald-400" />
  </div>

  {/* Corpo dell'App: Split View */}
  <div className="flex gap-4 h-32">
    
    {/* COLONNA SINISTRA: Finto Form */}
    <div className="flex-1 flex flex-col gap-2 border-r border-neutral-100 dark:border-neutral-800 pr-4">
      {/* Campo 1 */}
      <div className="flex flex-col gap-1">
        <div className="h-1.5 w-1/3 bg-neutral-200 dark:bg-neutral-700 rounded-sm" />
        <div className="h-4 w-full bg-neutral-100 dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700" />
      </div>
      {/* Campo 2 (In modifica) */}
      <div className="flex flex-col gap-1">
        <div className="h-1.5 w-1/4 bg-neutral-200 dark:bg-neutral-700 rounded-sm" />
        <div className="h-4 w-full bg-violet-50 dark:bg-violet-900/20 rounded border border-violet-200 dark:border-violet-800 animate-pulse" />
      </div>
      {/* Bottoni Form */}
      <div className="mt-auto flex gap-2">
        <div className="h-5 flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-md" />
        <div className="h-5 flex-1 bg-violet-100 dark:bg-violet-900/40 text-violet-500 rounded-md" />
      </div>
    </div>

    {/* COLONNA DESTRA: Finto CV Preview */}
    <div className="flex-1 bg-neutral-50 dark:bg-neutral-800/50 rounded shadow-sm border border-neutral-200 dark:border-neutral-700 p-2 flex flex-col gap-2 relative overflow-hidden transform transition-all group-hover:bg-white dark:group-hover:bg-neutral-800">
      
      {/* Intestazione CV */}
      <div className="flex gap-2 items-center">
        <div className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-700 shrink-0" />
        <div className="flex flex-col gap-1 w-full">
          <div className="h-1.5 w-3/4 bg-neutral-300 dark:bg-neutral-500 rounded-sm" />
          <div className="h-1 w-1/2 bg-neutral-200 dark:bg-neutral-600 rounded-sm" />
        </div>
      </div>
      
      <div className="h-px w-full bg-violet-200 dark:bg-violet-500/30" />
      
      {/* Contenuto CV */}
      <div className="flex flex-col gap-1.5">
        <div className="h-1 w-1/3 bg-neutral-300 dark:bg-neutral-500 rounded-sm" />
        <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600 rounded-sm" />
        <div className="h-1 w-4/5 bg-neutral-200 dark:bg-neutral-600 rounded-sm" />
        
        <div className="h-1 w-1/3 bg-neutral-300 dark:bg-neutral-500 rounded-sm mt-1" />
        <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600 rounded-sm" />
      </div>

      {/* Puntino di notifica animato (segnala l'aggiornamento in tempo reale) */}
      <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
    </div>

  </div>
</div>
                    </div>
                </div>

                {/* CARD 2 - Piccola (Sicurezza) */}
                <div className="bento-card relative bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col group">
                    <div className="w-12 h-12 bg-white dark:bg-neutral-800 shadow-sm rounded-xl flex items-center justify-center mb-6 text-indigo-600 border border-neutral-100 dark:border-neutral-700 relative z-10">
                        <FileTextIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white relative z-10">
                        Esportazione Impeccabile
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm relative z-10">
                        Nessuna formattazione rotta. Genera un PDF in altissima definizione pronto per essere stampato o inviato via email.
                    </p>

                    {/* Micro-UI: Sfondo a pattern */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[radial-gradient(circle,rgba(99,102,241,0.15)_1px,transparent_1px)] bg-[size:10px_10px] transform group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* CARD 3 - Piccola (ATS) */}
                <div className="bento-card relative bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col group">
                    <div className="w-12 h-12 bg-white dark:bg-neutral-800 shadow-sm rounded-xl flex items-center justify-center mb-6 text-emerald-600 border border-neutral-100 dark:border-neutral-700 relative z-10">
                        < LockClosedIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white relative z-10">
                        Privacy Assoluta
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm relative z-10">
                        Decidi tu chi vede cosa. I tuoi dati sono al sicuro e
                        mai venduti a terzi. Mostra il meglio di te proteggendo
                        la tua privacy.
                    </p>

              
                </div>

                {/* CARD 4 - Larga (Esportazione) */}
                <div className="bento-card relative md:col-span-2 bg-violet-600 dark:bg-violet-600 rounded-3xl p-8 border border-violet-500 overflow-hidden group text-white">
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between h-full">
                        <div className="max-w-sm">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                <MagicWandIcon className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">
                                ATS Friendly al 100%
                            </h3>
                            <p className="text-violet-100">
                              Il 90% delle aziende usa software per filtrare i CV. I
                        nostri modelli sono scritti con un codice pulito per
                        superare gli Applicant Tracking System con il massimo
                        del punteggio.
                            </p>
                        </div>

                        {/* Micro-UI: Finto PDF Hover */}
                        <div className="w-40 h-48 bg-white rounded-lg shadow-2xl flex flex-col p-3 transform rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 translate-y-8 md:translate-y-0">
                            <div className="h-2 w-1/3 bg-neutral-200 rounded mb-4" />
                            <div className="h-1 w-full bg-neutral-100 rounded mb-1" />
                            <div className="h-1 w-full bg-neutral-100 rounded mb-1" />
                            <div className="h-1 w-2/3 bg-neutral-100 rounded mb-4" />
                            <div className="flex gap-2">
                                <div className="h-10 w-10 bg-neutral-100 rounded" />
                                <div className="flex-1 flex flex-col gap-1">
                                    <div className="h-1 w-full bg-neutral-100 rounded" />
                                    <div className="h-1 w-4/5 bg-neutral-100 rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

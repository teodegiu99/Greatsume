// "use client";
// import React from "react";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { CiCircleInfo } from "react-icons/ci";
// import { HiTemplate } from "react-icons/hi";
// import { GrDocumentText } from "react-icons/gr";
// import { FaShareAlt } from "react-icons/fa";

// export function Features() {
//   return (
 
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full mb-8">
//      <div className="lg:col-span-1 col-span-3 p-8 border-2 shadow-2xl w-full h-full rounded-2xl relative overflow-hidden">
//   <h5 className="text-neutral-700 dark:text-neutral-200 text-3xl md:text-4xl lg:text-5xl font-semibold text-start relative z-10">
//     <span className="text-violet-600 z-[80]">Change</span> your resume{" "}
//     <span className="text-violet-600 z-[80]">design</span> without rewriting all
//     your infos
//   </h5>
//   <HiTemplate className="absolute size-96 bottom-[-100px] right-[-80px] -rotate-45 z-0 text-violet-600 opacity-10" />
// </div>
//       <div className="lg:col-span-2  col-span-3  p-8 border-2 shadow-2xl w-full h-full rounded-2xl relative overflow-hidden">
//         <div className="absolute top-2 right-2">
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger>
//                 <CiCircleInfo className="text-xl" />
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>Add to library</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//         <h5 className="text-neutral-700 dark:text-neutral-200  text-3xl md:text-4xl lg:text-5xl font-bold text-start uppercase mb-2">
//           Ats <span className="text-violet-600">proof</span>
//         </h5>
//         <p className="text-xl text-neutral-700 font-medium">
//           Greatsume ensures ATS-proof CVs, crucial for modern job applications.
//           With <span className="text-violet-600">optimized formatting</span> and
//           relevant keywords, candidates stand out in Applicant Tracking Systems,
//           enhancing their chances of human review and job success.
//         </p>
//         <GrDocumentText className="absolute size-96 bottom-[-80px] right-[-50px] -rotate-45 z-0 text-violet-600 opacity-10" />

//       </div>
//       <div className="col-span-3 p-8 border-2 shadow-2xl w-full h-full rounded-2xl relative overflow-hidden">
//         <h5 className="text-neutral-700 dark:text-neutral-200  text-3xl md:text-4xl lg:text-5xl font-bold text-start uppercase mb-2">Generate a link to <span className="text-violet-600">share your resume</span></h5>
//         <p className="text-xl text-neutral-700 font-medium">
//           Hide your personal info with  <span className="text-violet-600"> just a click!</span> No need to edit you resume
//         </p>
//         <FaShareAlt className="absolute size-48 bottom-[-40px] right-[-50px] -rotate-180 z-0 text-violet-600 opacity-10" />
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registra il plugin per le animazioni allo scroll
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Anima le card facendole salire quando si scrolla fino a questa sezione
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // Parte quando la cima della sezione è al 75% dello schermo
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
          Tutto ciò che ti serve. <br className="hidden sm:block"/> Niente che non ti serva.
        </h2>
        <p className="text-lg text-neutral-500 dark:text-neutral-400">
          Abbiamo rimosso la complessità per lasciarti solo gli strumenti migliori.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1 - Grande */}
        <div className="feature-card md:col-span-2 bg-neutral-50 dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-800 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 text-violet-600 rounded-xl flex items-center justify-center mb-6 text-xl">
              ⚡
            </div>
            <h3 className="text-2xl font-bold mb-3 dark:text-white">Velocità Incredibile</h3>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-sm">
              Nessun form infinito. Un'interfaccia fluida e reattiva che salva le tue modifiche in tempo reale mentre componi il tuo curriculum.
            </p>
          </div>
        </div>

        {/* Card 2 - Piccola */}
        <div className="feature-card bg-neutral-50 dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-800">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl flex items-center justify-center mb-6 text-xl">
            🎨
          </div>
          <h3 className="text-xl font-bold mb-3 dark:text-white">Design ATS-Friendly</h3>
          <p className="text-neutral-500 dark:text-neutral-400">
            Layout studiati per passare i sistemi automatici di screening delle aziende.
          </p>
        </div>

        {/* Card 3 - Piccola */}
        <div className="feature-card bg-neutral-50 dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-800">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl flex items-center justify-center mb-6 text-xl">
            🔒
          </div>
          <h3 className="text-xl font-bold mb-3 dark:text-white">Dati al Sicuro</h3>
          <p className="text-neutral-500 dark:text-neutral-400">
            I tuoi dati personali sono crittografati e non vengono mai condivisi con terzi.
          </p>
        </div>

        {/* Card 4 - Grande */}
        <div className="feature-card md:col-span-2 bg-neutral-900 dark:bg-neutral-100 rounded-3xl p-8 text-white dark:text-black">
          <div className="w-12 h-12 bg-white/10 dark:bg-black/10 rounded-xl flex items-center justify-center mb-6 text-xl">
            📄
          </div>
          <h3 className="text-2xl font-bold mb-3">Esportazione in 1 Click</h3>
          <p className="text-neutral-400 dark:text-neutral-600 max-w-sm">
            Genera un file PDF in alta definizione istantaneamente. Perfetto per essere stampato o inviato via email direttamente ai recruiter.
          </p>
        </div>

      </div>
    </section>
  );
}
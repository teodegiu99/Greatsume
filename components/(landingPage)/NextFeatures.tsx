// import React from 'react'


// interface Card {
//     id: number;
//     title: string;
//     sub: string;
//   }
  
// const NextFeatures: React.FC= () => {
//     const cards: Card[] = [
//         {
//             id: 0,
//             title: "Multi language support",
//             sub: "Seamless support for multiple languages and automatic CV translation. Stay ahead in the global job market effortlessly!",
//         },
//         {
//             id: 1,
//             title: "AI generated cover letter ",
//             sub: "AI generated Cover Letters based on your CV and job listing. Effortlessly tailor your applications for each opportunity, maximizing your chances of success!",
//         },
//         {
//             id: 2,
//             title: "Multi format file download",
//             sub: " Seamlessly download your CV in various file formats, catering to different application requirements with ease. Enhance your adaptability and stand out in every opportunity!",
//         },
//         {
//             id: 3,
//             title: "More customization options",
//             sub: "Tailor your CV to perfection with a wide range of design choices, fonts, colors, and layouts. Unleash your creativity and make a lasting impression in every application!",
//         },
    
//       ];


//     return (
//     <div className='p-8 border-2 shadow-2xl max-w-7xl mx-auto w-full h-full mt-8 rounded-2xl'>
//       <h5 className='py-4 text-neutral-700 dark:text-neutral-200  text-3xl md:text-4xl lg:text-5xl font-bold text-start uppercase mb-2'>Unlock global opportunities with our upcoming features 🔜</h5>
//       <div className="overflow-x-auto border-2 p-4 rounded-2xl bg-violet-600 scrollbar-hide">
//       <div className="flex space-x-6">
//         {cards.map((card) => (
//           <div key={card.id} className="gap-x-4 border-2 p-4 rounded-2xl shadow-2xl bg-white">
//             <div className=" w-full min-w-56 min-h-56">
//              <h3 className='text-2xl text-left text-neutral-700 font-medium'>{card.title}</h3>
//             <p className="text-lg text-left mt-2  text-neutral-700">{card.sub}</p>
//             </div>

//           </div>
//         ))}
//       </div>
//     </div>
//     </div>
//   )
// }

// export default NextFeatures


"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function NextFeatures() {
  const containerRef = useRef(null);

  const roadmap = [
    { status: "Live", title: "Esportazione PDF in Alta Qualità", desc: "Scarica il tuo CV perfettamente formattato." },
    { status: "Live", title: "Template ATS-Friendly", desc: "Design ottimizzati per i software di reclutamento." },
    { status: "In Arrivo", title: "Generazione Lettere di Presentazione AI", desc: "Crea lettere su misura in base al tuo CV con un click." },
    { status: "In Sviluppo", title: "Condivisione Web Pubblica", desc: "Ottieni un link personale per il tuo CV interattivo online." },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".roadmap-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        opacity: 0,
        x: -40,
        stagger: 0.2,
        duration: 0.7,
        ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 max-w-4xl mx-auto w-full">
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
          Sempre in evoluzione.
        </h2>
        <p className="text-lg text-neutral-500 dark:text-neutral-400">
          Scopri su cosa stiamo lavorando per rendere la tua ricerca di lavoro ancora più semplice.
        </p>
      </div>

      <div className="space-y-6">
        {roadmap.map((item, index) => (
          <div 
            key={index} 
            className="roadmap-item flex flex-col md:flex-row md:items-center gap-4 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-violet-500 transition-colors"
          >
            <div className="w-32 flex-shrink-0">
              <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${
                item.status === "Live" 
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
                  : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
              }`}>
                {item.status}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
                {item.title}
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
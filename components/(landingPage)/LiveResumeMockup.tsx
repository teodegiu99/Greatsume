"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function LiveResumeMockup() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#main-scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        }
      });

      tl.to(".cv-name", { opacity: 1, y: 0, duration: 0.5 })
        .to(".cv-title", { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .to(".cv-section-title-1", { opacity: 1, x: 0, duration: 0.5 })
        .to(".cv-job-1", { opacity: 1, y: 0, duration: 1 })
        .to(".cv-section-title-2", { opacity: 1, x: 0, duration: 0.5 })
        .to(".cv-job-2", { opacity: 1, y: 0, duration: 1 })
        .to(".cv-skills-tag", { opacity: 1, scale: 1, stagger: 0.2, duration: 1 });
        
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="sticky top-0 h-screen w-full flex items-center justify-center p-4 lg:p-10">
      {/* Foglio CV Realistico */}
      <div className="w-full max-w-[420px] aspect-[1/1.41] bg-white dark:bg-white rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden p-8 flex flex-col text-[#1a1a1a]">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="cv-name opacity-0 translate-y-4 text-3xl font-bold tracking-tight text-violet-600">Mario Rossi</h1>
          <p className="cv-title opacity-0 translate-y-2 text-lg text-neutral-500 font-medium">Senior Product Designer</p>
          <div className="mt-4 flex gap-4 text-[10px] text-neutral-400 font-mono">
            <span>mario.rossi@email.com</span>
            <span>+39 333 123 4567</span>
          </div>
        </div>

        {/* Esperienza 1 */}
        <div className="mb-6">
          <h2 className="cv-section-title-1 opacity-0 -translate-x-4 text-[12px] font-bold uppercase tracking-widest text-neutral-400 mb-3 border-b pb-1">Esperienza</h2>
          <div className="cv-job-1 opacity-0 translate-y-4">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-sm font-bold">Lead Designer @ TechFlow</h3>
              <span className="text-[10px] text-neutral-400 italic">2021 — Oggi</span>
            </div>
            <p className="text-[11px] leading-relaxed text-neutral-600">
              Coordinamento del team creativo per il redesign della piattaforma core, aumentando la conversione del 25%.
            </p>
          </div>
        </div>

        {/* Esperienza 2 */}
        <div className="mb-6">
          <div className="cv-job-2 opacity-0 translate-y-4">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-sm font-bold">UI/UX Designer @ StartupX</h3>
              <span className="text-[10px] text-neutral-400 italic">2018 — 2021</span>
            </div>
            <p className="text-[11px] leading-relaxed text-neutral-600">
              Creazione del design system scalabile utilizzato da oltre 100.000 utenti attivi mensili.
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-auto">
          <h2 className="cv-section-title-2 opacity-0 -translate-x-4 text-[12px] font-bold uppercase tracking-widest text-neutral-400 mb-3 border-b pb-1">Competenze</h2>
          <div className="flex flex-wrap gap-2">
            {["Figma", "React", "Node.js", "Strategy", "Tailwind"].map((skill) => (
              <span key={skill} className="cv-skills-tag opacity-0 scale-50 px-2 py-1 bg-violet-50 text-violet-600 text-[10px] font-bold rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Overlay filigrana per realismo */}
        <div className="absolute inset-0 pointer-events-none border-[12px] border-white/10 opacity-5"></div>
      </div>
    </div>
  );
}
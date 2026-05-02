
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import dynamic from "next/dynamic";

const HeroMockup = dynamic(() => import("./HeroMockup"), { ssr: false });

// Mock data and state moved to HeroMockup.tsx

export function Hero() {
  const router = useRouter();
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-anim", { 
        opacity: 0, 
        y: 40, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: "power3.out" 
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const words = [
    { text: "Crea" }, { text: "il" }, { text: "tuo" }, { text: "CV" }, { text: "in" },
    { text: "5 minuti.", className: "text-violet-600 dark:text-violet-500" },
  ];

  return (
    <div className="w-full overflow-hidden relative">
      <section ref={heroRef} className="relative w-full pt-20 lg:pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* 1. TESTO (Sinistra) - SSR consentito per SEO */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-20">
          <div className="hero-anim inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase tracking-wider">
            🚀 Semplice, veloce e gratuito
          </div>
          
          <h1 className="hero-anim text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-8">
            Il tuo nuovo CV,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600">
               pronto in un click.
            </span>
          </h1>

          <div className="hero-anim mb-8 transform scale-90 md:scale-100 lg:origin-left">
            <TypewriterEffectSmooth words={words} />
          </div>

          <p className="hero-anim text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-lg mb-10 leading-relaxed">
            Dimentica le formattazioni impazzite su Word. Inserisci i tuoi dati, scegli un design ATS-friendly e scarica un PDF perfetto. Più colloqui, zero stress.
          </p>

          <div className="hero-anim flex flex-col items-center lg:items-start gap-3 mb-10 lg:mb-0">
            <button 
              onClick={() => router.push("/auth/register")}
              className="px-10 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
            >
              Crea il tuo CV Gratis
            </button>
            <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium ml-2">
              Nessuna carta di credito richiesta
            </span>
          </div>
        </div>

        {/* 2. MOCKUP CV (Destra) - Client-Side Only[cite: 1] */}
        <div className="hero-anim w-full lg:w-1/2 flex justify-center items-center relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-violet-500/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative w-[318px] h-[449px] sm:w-[397px] sm:h-[561px] bg-white rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-neutral-200 transform rotate-2 hover:rotate-0 transition-transform duration-500 overflow-hidden">
            <HeroMockup />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.015)]" />
          </div>
        </div>
      </section>
    </div>
  );
}
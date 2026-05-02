
"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function NewTemplateBanner() {
  const bannerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".banner-content", {
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 80%",
        },
        scale: 0.95,
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      });
    }, bannerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 px-6">
      <div 
        ref={bannerRef}
        className="max-w-6xl mx-auto rounded-3xl overflow-hidden relative bg-violet-600 dark:bg-violet-900"
      >
        {/* Pattern decorativo in background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="banner-content relative z-10 px-6 py-16 md:py-24 text-center flex flex-col items-center">
          <span className="px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
            Aggiornamento 2024
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 max-w-2xl leading-tight">
            Nuovi template progettati per farti assumere.
          </h2>
          <p className="text-violet-100 text-lg md:text-xl max-w-xl mb-10">
            Abbiamo appena aggiunto 5 nuovi layout approvati dai recruiter per i settori Tech, Design e Management.
          </p>
          <button 
            onClick={() => router.push("/auth/register")}
            className="px-8 py-4 bg-white text-violet-900 hover:bg-neutral-100 rounded-xl font-bold text-lg transition-transform hover:scale-105 shadow-xl"
          >
            Esplora i Template
          </button>
        </div>
      </div>
    </section>
  );
}
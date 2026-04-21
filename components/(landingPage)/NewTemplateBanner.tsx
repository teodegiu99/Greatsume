// "use client"
// import React from 'react'
// import { Button } from '../ui/button'
// import { MdWorkOutline } from "react-icons/md";
// import { useRouter } from "next/navigation";

// const NewTemplateBanner = () => {
//   const router = useRouter();

//   return (
//     <div className="grid bg-violet-600 grid-cols-1 lg:grid-cols-3   justify-start h-full p-8  max-w-7xl mx-auto mt-8 mb-4 rounded-2xl relative shadow-2xl overflow-hidden">
//       <div className='col-span-1 lg:py-10 mb-8 lg:mb-0'>
//       <h5 className='text-[#f8f8ff] text-4xl md:text-5xl lg:text-6xl font-bold text-start uppercase'>New template every week</h5>
//       </div>
//       <div className='col-span-2 flex flex-col justify-center items-center  p-8 bg-[#f8f8ff] rounded-2xl shadow-2xl relative'>
//       <p className="text-3xl text-neutral-700 font-medium">Stand out in today&rsquo;s competitive job market</p>
//       <Button className='text-white bg-gradient-to-r from-violet-600 to-indigo-600 text-2xl px-6 py-6 mt-8 rounded-md hover:from-violet-700 hover:to-indigo-700 hover:scale-110 shadow-2xl' onClick={() => router.push("/auth/register")}>
//         Start now 🚀
//       </Button>
//       <MdWorkOutline className="absolute size-96 bottom-[-130px] right-[-50px]  z-0 text-violet-600 opacity-10" />
//       <div>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default NewTemplateBanner
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
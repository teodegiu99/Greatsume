"use client";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { templateRegistry } from "@/components/template/templateRegistry";
import { CvData, VisibilityOptions } from "@/types/template";

const mockResumeData: CvData = {
  name: "Matteo",
  surname: "Rossi",
  address: "Via Roma 12, Milano",
  dateOfBirth: "15/06/1995",
  relocation: "Disponibile",
  phone: "+39 333 123 4567",
  email: "m.rossi@example.com",
  linkedin: "linkedin.com/in/mrossi",
  github: "github.com/mrossi",
  dribble: "",
  website: "mrossi.dev",
  bio: "Sviluppatore Full Stack con forte passione per il design e le interfacce reattive. Oltre 5 anni di esperienza nella creazione di applicazioni web moderne e performanti, focalizzate sull'esperienza utente.",
  desiredJob: "Senior Frontend Engineer",
  ral: "50k",
  experience: [
    { 
      years: "2021 - Oggi", 
      title: "Senior Dev @ TechFlow", 
      exps: "Sviluppo di applicazioni Next.js scalabili. Coordinamento del team tecnico per il lancio della nuova piattaforma cloud, aumentando le performance del 40%." 
    },
    { 
      years: "2018 - 2021", 
      title: "Web Dev @ AgencyX", 
      exps: "Creazione di interfacce utente interattive per clienti internazionali B2B. Ottimizzazione delle conversioni tramite A/B testing continui." 
    }
  ],
  education: [
    { 
      eyears: "2014 - 2017", 
      etitle: "Informatica", 
      edu: "Università degli Studi di Milano - Voto 110L." 
    }
  ],
  skillss: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  softSkillss: ["Problem Solving", "Team Leadership"],
  langSkillss: ["Italiano", "Inglese (C1)"],
  image: "" 
};

const mockShowHide: VisibilityOptions = {
  showImage: false,
  showAddress: true,
  showDateOfBirth: false,
  showBio: true,
};

export default function HeroMockup() {
  const templateContainerRef = useRef(null);
  const templateKeys = Object.keys(templateRegistry);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (templateKeys.length === 0) return;
    const interval = setInterval(() => {
      gsap.to(templateContainerRef.current, {
        opacity: 0,
        scale: 0.98,
        duration: 0.4,
        onComplete: () => {
          setCurrentIndex((prev) => (prev + 1) % templateKeys.length);
          gsap.to(templateContainerRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [templateKeys.length]);

  const CurrentTemplate = templateRegistry[templateKeys[currentIndex]];

  return (
    <div ref={templateContainerRef} className="absolute inset-0 w-full h-full bg-white" suppressHydrationWarning>
      {CurrentTemplate ? (
        <div className="absolute top-0 left-0 w-[794px] h-[1123px] origin-top-left scale-[0.40] sm:scale-50 pointer-events-none text-black">
          <CurrentTemplate data={mockResumeData} showHide={mockShowHide} />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-neutral-400 font-medium">
          Caricamento...
        </div>
      )}
    </div>
  );
}

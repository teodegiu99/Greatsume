"use client"; // Ricordati questo se usi Next.js App Router

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setValue } from "@/app/state/values/mobileSlice";

// Icone
import { IoIosDocument } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { TbTemplate } from "react-icons/tb";

// 1. Definiamo i dati della navigazione fuori dal componente per pulizia
const navItems = [
    { id: "data", label: "Data", icon: IoIosDocument, action: "TopBar" },
    { id: "resume", label: "CV", icon: ImProfile, action: "CvHandler" },
    { id: "template", label: "Template", icon: TbTemplate, action: "TemplateCarousel" },
];

const BottomBar = () => {
    const [active, setActive] = useState<string>("data");
    const dispatch = useDispatch();

    const handleNavClick = (id: string, action: string) => {
        setActive(id);
        dispatch(setValue(action));
    };

    return (
        // 2. Fissiamo la barra in basso con effetto Glassmorphism (sfocato)
        <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-t border-slate-200 pb-safe">
            <div className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => {
                    const isActive = active === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id, item.action)}
                            // 3. Stile del bottone: icona sopra, testo sotto, area di clic grande
                            className="relative flex flex-col items-center justify-center w-full h-full space-y-1 focus:outline-none tap-highlight-transparent"
                        >
                            {/* 4. Feedback visivo dinamico */}
                            <div
                                className={`flex flex-col items-center justify-center transition-all duration-300 ${
                                    isActive
                                        ? "text-violet-600 scale-110" // Cambia 'violet' con il colore primario del tuo brand
                                        : "text-slate-400 hover:text-slate-600"
                                }`}
                            >
                                <Icon className="text-2xl mb-0.5" />
                                <span
                                    className={`text-[10px] font-medium transition-all duration-300 ${
                                        isActive ? "opacity-100" : "opacity-70"
                                    }`}
                                >
                                    {item.label}
                                </span>
                            </div>

                            {/* Pallino indicatore (opzionale, fa molto pro) */}
                            {isActive && (
                                <span className="absolute -top-1 w-1 h-1 bg-violet-600 rounded-full animate-pulse" />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomBar;
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const router = useRouter();

  // Gestione dello scroll per l'effetto "Floating Pill"
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animazione di entrata con GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: "Template", href: "#" },
    { name: "Funzionalità", href: "#" },
    { name: "Prezzi", href: "#" },
  ];

  return (
    <header 
      ref={navRef} 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "pt-4 px-4" : "pt-6 px-6 lg:px-12"
      }`}
    >
      <div 
        className={`mx-auto transition-all duration-500 flex items-center justify-between px-6 ${
          isScrolled 
            ? "max-w-4xl h-16 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-lg border border-neutral-200/50 dark:border-neutral-800/50 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]" 
            : "max-w-7xl h-14 bg-transparent border-transparent rounded-none shadow-none"
        }`}
      >
        
        {/* Logo */}
        <div className="nav-item flex-shrink-0 cursor-pointer" onClick={() => router.push("/")}>
          <span className="text-xl font-black tracking-tighter text-neutral-900 dark:text-white flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            Greatsume.
          </span>
        </div>

        {/* Link Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              href={link.href}
              className="nav-item text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Bottoni Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => router.push("/auth/login")}
            className="nav-item text-sm font-semibold text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors"
          >
            Accedi
          </button>
          <button 
            onClick={() => router.push("/auth/register")}
            className="nav-item px-5 py-2 text-sm font-bold text-white bg-neutral-900 dark:bg-white dark:text-black rounded-full hover:scale-105 transition-transform"
          >
            Inizia Gratis
          </button>
        </div>

        {/* Hamburger Mobile Toggle */}
        <button 
          className="md:hidden nav-item text-neutral-900 dark:text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <Cross1Icon className="w-6 h-6" /> : <HamburgerMenuIcon className="w-6 h-6" />}
        </button>

      </div>

      {/* Menu Mobile */}
      <div 
        className={`md:hidden absolute top-full left-4 right-4 mt-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 origin-top ${
          isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-6 gap-4">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-semibold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-4"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <button 
              onClick={() => { router.push("/auth/login"); setIsMobileMenuOpen(false); }}
              className="w-full py-3 rounded-xl font-bold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800"
            >
              Accedi
            </button>
            <button 
              onClick={() => { router.push("/auth/register"); setIsMobileMenuOpen(false); }}
              className="w-full py-3 rounded-xl font-bold text-white bg-violet-600"
            >
              Inizia Gratis
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
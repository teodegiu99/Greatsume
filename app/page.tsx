import { Poppins } from "next/font/google";
import { Hero } from "../components/(landingPage)/Hero";
import { Features } from "@/components/(landingPage)/Features";
import RibbonLogos from "@/components/(landingPage)/ScrollingText";
import {NavBar} from "@/components/(landingPage)/NavBar";
import { Footer } from "@/components/(landingPage)/Footer";
import NewTemplateBanner from "@/components/(landingPage)/NewTemplateBanner";
import NextFeatures from "@/components/(landingPage)/NextFeatures";
import NewBanner from "@/components/(landingPage)/NewBanner";
import HowItWorks from "@/components/(landingPage)/HowItWorks";
import Roadmap from "@/components/(landingPage)/Roadmap";


export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Questo header "fissa" entrambi i componenti in alto */}
      <header className="fixed top-0 left-0 w-full z-50 flex flex-col">
        <NewBanner />
        <NavBar />
      </header>

      {/* 
          Aggiungiamo un padding superiore per spingere giù l'Hero. 
          Il valore (es. pt-32) deve essere superiore alla somma 
          delle altezze di Banner + Navbar.
      */}
      <div className="pt-28 md:pt-32">
        <Hero />
      </div>
<RibbonLogos />
	{/* <NewTemplateBanner /> */}
      <HowItWorks />
      <Features />
      {/* <NextFeatures /> */}
	  <Roadmap />
      <Footer />
    </main>
  );
}
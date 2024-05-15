import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/LoginButton";
import { Hero } from "../components/(landingPage)/Hero";
import { Features } from "@/components/(landingPage)/Features";
import RibbonLogos from "@/components/(landingPage)/ScrollingText";
import NavBar from "@/components/(landingPage)/NavBar";
import { Footer } from "@/components/(landingPage)/Footer";
import NewTemplateBanner from "@/components/(landingPage)/NewTemplateBanner";
import NextFeatures from "@/components/(landingPage)/NextFeatures";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (

    <div>
      <NavBar />
      <Hero />
      <Features />
      <RibbonLogos />
      <NewTemplateBanner />
      <NextFeatures />
      <Footer />
    </div>
  );
}

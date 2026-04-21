// import { Button } from "@/components/ui/button";
// import { Poppins } from "next/font/google";
// import { cn } from "@/lib/utils";
// import { LoginButton } from "@/components/auth/LoginButton";
// import { Hero } from "../components/(landingPage)/Hero";
// import { Features } from "@/components/(landingPage)/Features";
// import RibbonLogos from "@/components/(landingPage)/ScrollingText";
// import NavBar from "@/components/(landingPage)/NavBar";
// import { Footer } from "@/components/(landingPage)/Footer";
// import NewTemplateBanner from "@/components/(landingPage)/NewTemplateBanner";
// import NextFeatures from "@/components/(landingPage)/NextFeatures";
// import Logo from "@/components/ui/logo";

// const font = Poppins({
//   subsets: ["latin"],
//   weight: ["600"],
// });

// export default function Home() {
//   return (

//     <div>
//       <NavBar />
//       <Hero />
//       <Features />
//       <RibbonLogos />
//       <NewTemplateBanner />
//       <NextFeatures />
//       <Footer />
//     </div>
//   );
// }
import { Poppins } from "next/font/google";
import { Hero } from "../components/(landingPage)/Hero";
import { Features } from "@/components/(landingPage)/Features";
import RibbonLogos from "@/components/(landingPage)/ScrollingText";
import NavBar from "@/components/(landingPage)/NavBar";
import { Footer } from "@/components/(landingPage)/Footer";
import NewTemplateBanner from "@/components/(landingPage)/NewTemplateBanner";
import NextFeatures from "@/components/(landingPage)/NextFeatures";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function Home() {
  return (
    <main className={`${font.className} min-h-screen bg-neutral-50 dark:bg-neutral-950 overflow-x-hidden text-neutral-900 dark:text-white`}>
      <NavBar />
      
      <Hero />
      
      <div className="border-y border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <RibbonLogos />
      </div>

      <Features />
      <NewTemplateBanner />
      <NextFeatures />
      <Footer />
    </main>
  );
}
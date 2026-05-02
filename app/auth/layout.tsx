// app/auth/layout.tsx
import { NavBar } from "@/components/(landingPage)/NavBar";
import { Footer } from "@/components/(landingPage)/Footer";
import { AuthGraphic } from "@/components/auth/AuthGraphic";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return ( 
    <div className="flex flex-col min-h-screen">
      {/* NavBar della landing page[cite: 1] */}
      <NavBar />

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Colonna Sinistra: Form[cite: 1] */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center px-8 sm:px-16 lg:px-20 bg-white dark:bg-neutral-950 relative z-20 border-r border-neutral-200 dark:border-neutral-800 shadow-[15px_0_50px_-15px_rgba(0,0,0,0.1)]">
          <div className="mx-auto w-full max-w-sm py-12">
            {children}
          </div>
        </div>

        {/* Colonna Destra: Animazione CV avanzata[cite: 1] */}
        <div className="hidden lg:flex lg:col-span-7 xl:col-span-8 items-center justify-center relative bg-violet-600 overflow-hidden z-10">
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          <div className="relative z-10 w-full max-w-2xl px-12">
            <AuthGraphic />
          </div>
        </div>
      </main>

      {/* Footer della landing page[cite: 1] */}
      <Footer />
    </div>
  );
}

export default AuthLayout;
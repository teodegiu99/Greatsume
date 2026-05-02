"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo"; 
import { cn } from "@/lib/utils";

export const NavBar = () => {
  const pathname = usePathname();
  // Controlliamo se siamo in una pagina di login, register, etc.
  const isAuthPage = pathname.startsWith("/auth");

  return (
    <nav className="w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Il logo ora è un link per tornare alla landing */}
          <Link href="/" className="hover:opacity-75 transition">
            <Logo />
          </Link>

          {/* Mostriamo i bottoni solo se NON siamo in una pagina auth */}
          {!isAuthPage && (
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white font-bold">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
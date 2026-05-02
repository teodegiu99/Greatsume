// components/(landingPage)/Footer.tsx
"use client";

import Link from "next/link";
import Logo from "@/components/ui/logo"; // Importiamo il logo per coerenza

export function Footer() {
    return (
        <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm py-4 px-6">
            <div className="max-w-9xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                
                {/* Logo e Copyright - Più compatti */}
                <div className="flex items-center gap-x-4">
                    <div className="scale-75 origin-left">
                        <Logo />
                    </div>
                    <p className="text-neutral-400 dark:text-neutral-500 text-xs font-medium border-l border-neutral-200 dark:border-neutral-800 pl-4">
                        © {new Date().getFullYear()} Greatsume.
                    </p>
                </div>

                {/* Link Utili - Testo più piccolo e discreto */}
                <div className="flex gap-x-8 text-[11px] uppercase tracking-widest font-bold text-neutral-500 dark:text-neutral-400">
                    <Link
                        href="/privacy"
                        className="hover:text-violet-600 transition-colors"
                    >
                        Privacy
                    </Link>
                    <Link
                        href="/terms"
                        className="hover:text-violet-600 transition-colors"
                    >
                        Terms
                    </Link>
                    <Link
                        href="mailto:support@greatsume.com"
                        className="hover:text-violet-600 transition-colors"
                    >
                        Support
                    </Link>
                </div>
            </div>
        </footer>
    );
}
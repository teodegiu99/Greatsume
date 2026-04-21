// import Link from "next/link";

// export const Footer = () => {
//     return (
//       <footer className="p-4 mt-8 bg-violet-600">
//         <p className="text-center text-white font-meidum">
//           Made with&nbsp;&nbsp; ☕️&nbsp;&nbsp; by &nbsp;
//           <Link href="https://matteodegiuseppe.com" className="hover:underline">Matteo De Giuseppe</Link>
         
//         </p>
//       </footer>
//     );
//   };

"use client";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo e Copyright */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white mb-2">
            Greatsume.
          </span>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            © {new Date().getFullYear()} Greatsume. Tutti i diritti riservati.
          </p>
        </div>

        {/* Link Utili */}
        <div className="flex gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          <Link href="/privacy" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Termini di Servizio
          </Link>
          <Link href="mailto:support@greatsume.com" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Contattaci
          </Link>
        </div>
        
      </div>
    </footer>
  );
}
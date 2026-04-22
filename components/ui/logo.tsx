"use client";
import Link from "next/link";

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className={className}>
        {/* Il tuo SVG originale */}
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <rect width="100" height="100" rx="20" fill="currentColor" className="text-violet-600" />
          <path d="M30 70V30H45L55 50L65 30H70V70H60V45L50 65L40 45V70H30Z" fill="white" />
        </svg>
      </div>
      <span className="text-xl font-black tracking-tighter text-neutral-900 dark:text-white group-hover:text-violet-600 transition-colors">
        GreatSume
      </span>
    </Link>
  );
}
import Link from "next/link";

export const Footer = () => {
    return (
      <footer className="p-4 mt-8 bg-violet-600">
        <p className="text-center text-white font-meidum">
          Made with&nbsp;&nbsp; ☕️&nbsp;&nbsp; by &nbsp;
          <Link href="https://matteodegiuseppe.com" className="hover:underline">Matteo De Giuseppe</Link>
         
        </p>
      </footer>
    );
  };
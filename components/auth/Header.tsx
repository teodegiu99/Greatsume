import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
<h1 className="font-black text-3xl text-blue-600">
          G<span className="text-violet-600">re</span>at
          <span className="text-violet-600">sume</span>
        </h1>      <p className="text-muted-foreground text-small">{label}</p>
    </div>
  );
};

import { Poppins } from "next/font/google";
import Logo from "../ui/logo";
const font = Poppins({ subsets: ["latin"], weight: ["700"] });

export const Header = ({ label }: { label: string }) => {
  return (
    <div className="w-full flex flex-col gap-y-2 justify-center items-start mb-6">
      <div className="flex items-center gap-x-3 mb-2">
    <Logo />
      </div>
      <p className="text-muted-foreground text-sm font-medium">
        {label}
      </p>
    </div>
  );
};
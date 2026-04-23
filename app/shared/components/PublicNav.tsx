"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PiSignInFill } from "react-icons/pi";
import Logo from "@/components/ui/logo";
const PublicNav = () => {
  return (
    <nav className="flex justify-between items-center w-[100%] h-[60px] bg-white p-4 border-b-2 shadow-sm">
      <Logo />
      <div className="flex flex-row justify-center items-center gap-x-4">
        <Link href="/auth/login">
          <Button className="customBtnCol flex flex-row items-center gap-x-1">
            <PiSignInFill className="text-lg" />
            Sign In
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default PublicNav;

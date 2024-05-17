"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { PiSignInFill } from "react-icons/pi";

const PublicNav = () => {
  return (
    <nav className="flex justify-between items-center w-[100%] h-[60px] bg-white p-4 border-b-2 shadow-sm">
      <Link href="/">
        <div>
          <h1 className="font-black text-3xl text-indigo-600">
            g<span className="text-violet-600">RE</span>at
            <span className="text-violet-600">SUME</span>
          </h1>
        </div>
      </Link>
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

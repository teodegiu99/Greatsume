"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { MdOutlineIosShare } from "react-icons/md";
import Link from "next/link";
import { LoginButton } from "../auth/LoginButton";

const NavBar = () => {
  const currentYear = new Date().getFullYear();

  return (
    <nav className="flex sticky top-0 justify-between items-center w-[100%] bg-[#f8f8ff] z-[100] h-[60px] p-4 ">
      <div>
        <h1 className="font-black text-3xl text-indigo-600">
          G<span className="text-violet-600">re</span>at
          <span className="text-violet-600">sume</span>
        </h1>
      </div>
      <div className="flex flex-row justify-center items-center gap-x-4">
        <LoginButton asChild>
          <Button className="customBtnCol flex flex-row items-center gap-x-1" size="lg">
            Sign In
          </Button>
        </LoginButton>
      </div>
    </nav>
  );
};

export default NavBar;

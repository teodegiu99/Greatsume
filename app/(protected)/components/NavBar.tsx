"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { MdOutlineIosShare } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoDocumentText } from "react-icons/io5";
import SignOutBtn from "@/components/SignOutBtn";
import DownloadBtn from "@/components/downloadBtn/DownloadBtn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineMenu } from "react-icons/md";


const NavBar = () => {
  // const index = 1;
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <nav className="flex justify-between items-center w-[100dwh] h-[60px] bg-white p-4 border-b-2 shadow-sm">
      <div>
        <h1 className="font-black text-3xl text-blue-700">
          g<span className="text-purple-800">re</span>at
          <span className="text-purple-800">sume</span>
        </h1>
      </div>
      <div className="hidden lg:flex flex-row justify-center items-center gap-x-4">
        {pathname !== "/resume/share" && (
          <Link href="/resume/share">
            <Button className="customBtnCol flex flex-row items-center gap-x-1">
              <MdOutlineIosShare className="text-lg" />
              Share
            </Button>
          </Link>
        )}
        {pathname === "/resume/share" && (
          <Link href="/resume">
            <Button className="customBtnCol flex flex-row items-center gap-x-1">
              <IoDocumentText className="text-lg" />
              Resume
            </Button>
          </Link>
        )}
        <DownloadBtn
          btnLocation="nav"
          style="customBtnCol flex flex-row items-center gap-x-1"
        />
        {/* <SignOutBtn /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex flex-row items-center gap-x-1"
            >
              <IoSettingsOutline className="text-lg" />
              Settings
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <SignOutBtn />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete Account</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="lg:hidden">
      <Button variant="outline" onClick={() => setOpen(!open)}size="icon" className="flex flex-row items-center gap-x-1">
              <MdOutlineMenu className="h-6 w-6" />
              
            </Button>
            {open &&
         <div className="absolute top-0 left-0 h-[100dvh] w-[100dvw] z-[100] bg-black">
          <div>
            share
            </div>
            <div>
              resume
            </div>
            <div>
              download
            </div>
            <div>
              settings
            </div>
         </div>
        }
      </div>
    </nav>
  );
};

export default NavBar;


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
import { useDispatch } from "react-redux";
import { setUpdateValues } from "../../state/values/loaderTemplateSlice";
import { MdClose } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import {  signOut } from "next-auth/react";

const NavBar = () => {
  const dispatch = useDispatch();

  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  const currentYear = new Date().getFullYear();

  return (
    <nav className="flex justify-between items-center w-[100%] h-[60px] bg-white p-4 border-b-2 shadow-sm">
      <div>
        <h1 className="font-black text-3xl text-blue-700">
          G<span className="text-purple-800">re</span>at
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
            <Button
              onClick={() => dispatch(setUpdateValues(false))}
              className="customBtnCol flex flex-row items-center gap-x-1"
            >
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
        <Button
          variant="outline"
          onClick={() => setOpen(!open)}
          size="icon"
          className="flex flex-row items-center gap-x-1"
        >
          <MdOutlineMenu className="h-6 w-6" />
        </Button>
        {open && (
          <div className="fixed top-0 left-0 h-full w-[100%] z-[100] bg-[#f8f8ff] overflow-hidden scrollbar-hide">
            <div className="flex justify-between items-center p-2 text-right">
            <div>
        <h1 className="font-black text-3xl text-blue-700">
          G<span className="text-purple-800">re</span>at
          <span className="text-purple-800">sume</span>
        </h1>
      </div>
              <Button
                variant="outline"
                onClick={() => setOpen(!open)}
                size="icon"
                className="flex flex-row items-center gap-x-1"
              >
                <MdClose className="h-6 w-6" />
              </Button>
            </div>
            <hr/>
            <Link href="/resume/share">
            <button className="menuItem" onClick={() => setOpen(!open)}>
              {" "}
              <MdOutlineIosShare className="h-6 w-6" />
              Share
            </button>
            </Link>

            <hr/>
            <Link href="/resume">
            <button className="menuItem"  onClick={() => setOpen(!open)}>
              <IoDocumentText className="h-6 w-6"/>
              Resume
            </button>
            </Link>
            <hr/>
            <div>
              <DownloadBtn
                btnLocation="nav"
                style="menuItemBtn flex justify-start items-center gap-x-2 w-[100%]"
                menuItem={true}
              />
            </div>
            <hr/>
            <button className="w-[100%]  text-3xl px-4 py-5 font-medium settingsBtn" onClick={() => setSettingsOpen(!settingsOpen)}>
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center gap-x-2">
              <IoSettingsOutline className="h-6 w-6" />
              Settings
              </div>
              
             {settingsOpen && <IoIosArrowDown className="h-6 w-6" />}
             {!settingsOpen && <IoIosArrowBack className="h-6 w-6" />}
              </div>
            </button>
            <hr/>
            {settingsOpen && <>
            <button className="subMenuItem"  onClick={() => {	signOut();}}>
            <GoSignOut className="h-5 w-5" />
               Sign Out
             </button>
             <hr/>
             <button className="subMenuItem"  onClick={() => {}}>
               <MdDelete className="h-5 w-5"/>
               Delete Account
             </button>
             </>}

            <div className="fixed bottom-0 w-[100%]">
              <div className="footer">
                Copyright ©{" "}
                <span className=""> &nbsp; Matteo De Giuseppe &nbsp;</span>
                {currentYear}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

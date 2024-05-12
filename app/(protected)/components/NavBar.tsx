"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { FaFileDownload } from "react-icons/fa";
import { MdOutlineIosShare } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoDocumentText } from "react-icons/io5";
import SignOutBtn from "@/components/SignOutBtn";
import DownloadBtn from "@/components/downloadBtn/DownloadBtn";

const NavBar = () => {

  // const index = 1;
  const pathname = usePathname();
  return (
    <nav className="flex justify-between items-center w-[100dwh] h-[60px] bg-white p-4 border-b-2 shadow-sm">
      <div>
        <h1 className="font-black text-3xl text-blue-700">
          g<span className="text-purple-800">re</span>at
          <span className="text-purple-800">sume</span>
        </h1>
      </div>
      <div className="flex flex-row justify-center items-center gap-x-4">
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
        {/* <Button className="customBtnCol flex flex-row items-center gap-x-1">
          <FaFileDownload className="text-lg"/>
          Download
        </Button> */}
        <DownloadBtn btnLocation="nav"  />

        <SignOutBtn />
      </div>
    </nav>
  );
};

export default NavBar;

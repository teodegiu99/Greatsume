import { Button } from "@/components/ui/button";
import React from "react";
import { signOut } from "@/auth";
import { GoSignOut } from "react-icons/go";
import { FaFileDownload } from "react-icons/fa";
import { MdOutlineIosShare } from "react-icons/md";

const NavBar = async () => {

  return (
    <nav className="flex justify-between items-center w-[100dwh] h-[60px] bg-white p-4 border-b-2 shadow-sm">
      <div>
        <h1 className="font-black text-3xl text-blue-700">
          g<span className="text-purple-800">re</span>at
          <span className="text-purple-800">sume</span>
        </h1>
      </div>
      <div className="flex flex-row justify-center items-center gap-x-4">
      <Button className="customBtnCol flex flex-row items-center gap-x-1">
      <MdOutlineIosShare className="text-lg" />
          Share
        </Button>
        <Button className="customBtnCol flex flex-row items-center gap-x-1">
          <FaFileDownload className="text-lg"/>
          Download
        </Button>

        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit" className="signoutBtn">
            Sign Out
            <GoSignOut />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default NavBar;

"use client";
import { Button } from "@/components/ui/button";
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
import { signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import {deleteUser} from "@/actions/deleteUser"

const NavBar = () => {
  const dispatch = useDispatch();

  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  

  return (
    <nav className="flex justify-between items-center w-[100%] h-[60px] bg-white p-4 border-b-2 shadow-sm">
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Link href="/resume">
        <div>
          <h1 className="font-black text-3xl text-blue-700">
            G<span className="text-purple-600">re</span>at
            <span className="text-purple-600">sume</span>
          </h1>
        </div>
      </Link>

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
              <DropdownMenuItem>
                {" "}
                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
                >
                  Open Modal
                </button>
              </DropdownMenuItem>
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
            <hr />
            <Link href="/resume/share">
              <button className="menuItem" onClick={() => setOpen(!open)}>
                {" "}
                <MdOutlineIosShare className="h-6 w-6" />
                Share
              </button>
            </Link>

            <hr />
            <Link href="/resume">
              <button className="menuItem" onClick={() => setOpen(!open)}>
                <IoDocumentText className="h-6 w-6" />
                Resume
              </button>
            </Link>
            <hr />
            <div>
              <DownloadBtn
                btnLocation="nav"
                style="menuItemBtn flex justify-start items-center gap-x-2 w-[100%]"
                menuItem={true}
              />
            </div>
            <hr />
            <button
              className="w-[100%]  text-3xl px-4 py-5 font-medium settingsBtn"
              onClick={() => setSettingsOpen(!settingsOpen)}
            >
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-x-2">
                  <IoSettingsOutline className="h-6 w-6" />
                  Settings
                </div>

                {settingsOpen && <IoIosArrowDown className="h-6 w-6" />}
                {!settingsOpen && <IoIosArrowBack className="h-6 w-6" />}
              </div>
            </button>
            <hr />
            {settingsOpen && (
              <>
                <button
                  className="subMenuItem"
                  onClick={() => {
                    signOut();
                  }}
                >
                  <GoSignOut className="h-5 w-5" />
                  Sign Out
                </button>
                <hr />
                <button className="subMenuItem" onClick={() => {}}>
                  <MdDelete className="h-5 w-5" />
                  Delete Account
                </button>
              </>
            )}

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

const SpringModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const inputValue = inputRef.current?.value;
    if (inputValue === 'DeleteAccount') {
        deleteUser()
        signOut();

    } else {
      alert('Text not valid, please retry');
    }
    // Pulisci l'input dopo la sottomissione
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-[100] grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Are you really sure to delete your account?
              </h3>
              <p className="text-center mb-6">
                You will not be able to recover your data
              </p>
              <div className="flex flex-col justify-center items-center">
                <p className="mb-2">To confirm write: DeleteAccount</p>
                <input
                  type="text"
                  ref={inputRef}
                  placeholder="DeleteAccount"
                  className="inputField max-w-[60%] mb-8"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Nah, go back
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Understood!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};



"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";

// Modifica questi import se il percorso è diverso
import { setUpdateValues } from "../../state/values/loaderTemplateSlice";
import { deleteUser } from "@/actions/deleteUser";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import DownloadBtn from "@/components/downloadBtn/DownloadBtn";

// Icone
import {
    MdOutlineIosShare,
    MdOutlineMenu,
    MdClose,
    MdDelete,
} from "react-icons/md";
import { IoDocumentText, IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GoSignOut } from "react-icons/go";
import { FiAlertCircle } from "react-icons/fi";

const NavBar = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();

    // Stati isolati per ogni singolo componente
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
    const [isMobileSettingsOpen, setIsMobileSettingsOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const [confirmText, setConfirmText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    // Chiude il dropdown desktop cliccando fuori
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDesktopDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Gestione Modale
    const handleDeleteSubmit = async () => {
        if (confirmText === "DeleteAccount") {
            setIsDeleting(true);
            await deleteUser();
            signOut();
        } else {
            alert("Testo non valido, riprova.");
        }
    };

    return (
        <>
            {/* 1. NAVBAR PRINCIPALE */}
            <nav className="flex justify-between items-center w-full h-[60px] bg-white p-4 border-b border-slate-200 relative z-[9999]">
                <Logo />

                {/* --- DESKTOP MENU --- */}
                <div className="hidden lg:flex flex-row items-center gap-x-4">
                    {pathname !== "/resume/share" ? (
                        <Link href="/resume/share">
                            <Button className=" bg-violet-600 hover:bg-violet-700  flex items-center gap-x-1">
                                <MdOutlineIosShare className="text-lg" /> Share
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/resume">
                            <Button
                                onClick={() => dispatch(setUpdateValues(false))}
                                className=" bg-violet-600 hover:bg-violet-700  flex items-center gap-x-1"
                            >
                                <IoDocumentText className="text-lg" /> Resume
                            </Button>
                        </Link>
                    )}

                    <DownloadBtn
                        btnLocation="nav"
                        style=" bg-violet-600 hover:bg-violet-700  flex items-center gap-x-1"
                    />

                    {/* DROPDOWN DESKTOP PURO */}
                    <div className="relative z-50" ref={dropdownRef}>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setIsDesktopDropdownOpen(!isDesktopDropdownOpen)
                            }
                            className="flex items-center gap-x-1"
                        >
                            <IoSettingsOutline className="text-lg" /> Settings
                        </Button>

                        {isDesktopDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-50">
                                <button
                                    onClick={() => signOut()}
                                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center"
                                >
                                    <GoSignOut className="mr-2 text-lg" /> Sign
                                    Out
                                </button>
                                <div className="h-px bg-slate-200 my-1"></div>
                                <button
                                    onClick={() => {
                                        setIsDesktopDropdownOpen(false);
                                        setIsModalOpen(true);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                                >
                                    <MdDelete className="mr-2 text-lg" /> Delete
                                    Account
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- HAMBURGER TRIGGER (MOBILE) --- */}
                <div className="lg:hidden">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <MdOutlineMenu className="h-6 w-6 text-slate-700" />
                    </Button>
                </div>
            </nav>

            {/* 2. MENU MOBILE OVERLAY */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-[#f8f8ff] z-[9999] flex flex-col overflow-y-auto">
                    <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-white">
                        <Logo />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <MdClose className="h-7 w-7 text-slate-700" />
                        </Button>
                    </div>

                    <div className="p-4 flex flex-col gap-y-2 flex-grow">
                        {pathname !== "/resume/share" ? (
                            <Link
                                href="/resume/share"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <div className="flex items-center gap-x-3 p-4 text-lg text-slate-700 hover:bg-white rounded-lg">
                                    <MdOutlineIosShare className="h-6 w-6 text-violet-600" />{" "}
                                    Share Resume
                                </div>
                            </Link>
                        ) : (
                            <Link
                                href="/resume"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <div className="flex items-center gap-x-3 p-4 text-lg text-slate-700 hover:bg-white rounded-lg">
                                    <IoDocumentText className="h-6 w-6 text-violet-600" />{" "}
                                    Edit Resume
                                </div>
                            </Link>
                        )}

                        <div onClick={() => setIsMobileMenuOpen(false)}>
                            <DownloadBtn
                                btnLocation="nav"
                                style="flex items-center gap-x-3 w-full p-4 text-lg text-violet-600 hover:bg-white rounded-lg"
                                menuItem={true}
                            />
                        </div>

                        <div className="h-px bg-slate-200 my-2" />

                        <button
                            className="flex items-center justify-between p-4 text-lg text-slate-700 hover:bg-white rounded-lg w-full"
                            onClick={() =>
                                setIsMobileSettingsOpen(!isMobileSettingsOpen)
                            }
                        >
                            <div className="flex items-center gap-x-3">
                                <IoSettingsOutline className="h-6 w-6 text-violet-600" />{" "}
                                Settings
                            </div>
                            {isMobileSettingsOpen ? (
                                <IoIosArrowUp />
                            ) : (
                                <IoIosArrowDown />
                            )}
                        </button>

                        {isMobileSettingsOpen && (
                            <div className="ml-4 pl-4 border-l-2 border-slate-200 flex flex-col">
                                <button
                                    onClick={() => signOut()}
                                    className="flex items-center gap-x-3 p-4 text-slate-600 w-full text-left"
                                >
                                    <GoSignOut className="h-5 w-5" /> Sign Out
                                </button>
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false); // Chiudi il menu mobile
                                        setIsModalOpen(true); // Apri il modale
                                    }}
                                    className="flex items-center gap-x-3 p-4 text-red-600 w-full text-left"
                                >
                                    <MdDelete className="h-5 w-5" /> Delete
                                    Account
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="p-4 text-center text-slate-400 text-sm mt-auto bg-white border-t">
                        Copyright © Matteo De Giuseppe {currentYear}
                    </div>
                </div>
            )}

            {/* 3. MODALE DELETE ACCOUNT */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-slate-900/50 p-4">
                    {/* Cliccare sullo sfondo chiude il modale */}
                    <div
                        className="absolute inset-0"
                        onClick={() => !isDeleting && setIsModalOpen(false)}
                    ></div>

                    {/* Il box del modale (ferma la propagazione del click) */}
                    <div
                        className="relative bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-md z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center">
                            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 text-3xl">
                                <FiAlertCircle />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                Delete Account?
                            </h3>
                            <p className="text-slate-500 mb-6 text-sm">
                                You will not be able to recover your data. This
                                action is permanent.
                            </p>

                            <div className="bg-slate-50 p-4 rounded-lg mb-6 border border-slate-200">
                                <p className="text-sm font-medium text-slate-700 mb-2">
                                    Type{" "}
                                    <strong className="text-red-600">
                                        DeleteAccount
                                    </strong>{" "}
                                    to confirm:
                                </p>
                                <input
                                    type="text"
                                    value={confirmText}
                                    onChange={(e) =>
                                        setConfirmText(e.target.value)
                                    }
                                    disabled={isDeleting}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-md text-center focus:outline-none focus:border-red-500 disabled:opacity-50"
                                    placeholder="DeleteAccount"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={isDeleting}
                                    className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold disabled:opacity-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteSubmit}
                                    disabled={isDeleting}
                                    className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold disabled:opacity-50 transition-colors"
                                >
                                    {isDeleting ? "Deleting..." : "Delete 😭"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NavBar;

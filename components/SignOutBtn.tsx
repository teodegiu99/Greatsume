"use client"
import { GoSignOut } from "react-icons/go";
import {  signOut } from "next-auth/react";

const SignOutBtn = () => {
const onClick = () => {
	signOut();
};

    return (
            <button onClick={onClick} className="flex justify-center items-center gap-x-2">
                Sign Out
                <GoSignOut />
            </button>
    );
};

export default SignOutBtn;

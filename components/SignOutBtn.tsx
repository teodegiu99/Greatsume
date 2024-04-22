"use client"
import { GoSignOut } from "react-icons/go";
import {  signOut } from "next-auth/react";

const SignOutBtn = async () => {
const onClick = () => {
	signOut();
};

    return (
            <button onClick={onClick} className="signoutBtn">
                Sign Out
                <GoSignOut />
            </button>
    );
};

export default SignOutBtn;

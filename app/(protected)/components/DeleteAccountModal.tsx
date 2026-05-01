"use client";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { deleteUser } from "@/actions/deleteUser";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DeleteAccountModal = ({ isOpen, setIsOpen }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async () => {
    const inputValue = inputRef.current?.value;
    if (inputValue === "DeleteAccount") {
      setIsDeleting(true);
      await deleteUser();
      signOut();
    } else {
      alert("Text not valid, please retry");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isDeleting && setIsOpen(false)}
          className="bg-slate-900/60 backdrop-blur-sm p-4 fixed inset-0 z-[99999] grid place-items-center overflow-y-auto cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-slate-800 p-6 md:p-8 rounded-2xl w-full max-w-md shadow-2xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10 text-center">
              <div className="bg-red-100 w-16 h-16 mb-4 rounded-full text-3xl text-red-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-900">Delete Account?</h3>
              <p className="mb-6 text-slate-500">Action permanent. Data recovery is not possible.</p>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-6">
                <p className="mb-3 text-sm font-medium">Type <span className="text-red-600 font-bold">DeleteAccount</span>:</p>
                <input
                  type="text"
                  ref={inputRef}
                  disabled={isDeleting}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-center focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  disabled={isDeleting}
                  className="bg-slate-100 hover:bg-slate-200 transition-colors text-slate-700 font-semibold w-full py-2.5 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold w-full py-2.5 rounded-lg"
                >
                  {isDeleting ? "Deleting..." : "Delete 😭"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteAccountModal;
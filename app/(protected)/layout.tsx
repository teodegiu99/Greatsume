"use client"
import "../globals.css";
import { Provider } from "react-redux";
import { store } from "../state/store";

const ResumeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100dvh] w-[100dwh]">
      <Provider store={store}>{children}</Provider>
    </div>
  );
};

export default ResumeLayout;

"use client";
import "../globals.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { Provider } from "react-redux";
import { store } from "../state/store";

const ResumeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Provider store={store}>
        <NavBar />
        <div className="hidden sm:block"style={{ height: `calc(100vh - 105px)` }}>{children}</div>
        <div className="sm:hidden ">{children}</div>
        <div className="hidden sm:block "><Footer /></div>
      </Provider>
    </>
  );
};

export default ResumeLayout;

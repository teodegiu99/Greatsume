"use client"
import "../globals.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { Provider } from "react-redux";
import { store } from "../state/store";

const ResumeLayout =  ({ children }: { children: React.ReactNode }) => {

    return (
        <>
        		        <Provider store={store}>

            <NavBar />
            {/* <div className="h-[100dvh]">{children}</div> */}

            <div style={{ height: `calc(100vh - 105px)` }}>{children}</div>
            <Footer />
            </Provider>

        </>
    );
};

export default ResumeLayout;

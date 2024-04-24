import "../globals.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";


const ResumeLayout =  ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            {/* <NavBar /> */}
            <div className="h-[100dvh]">{children}</div>

            {/* <div style={{ height: `calc(100vh - 105px)` }}>{children}</div> */}
            {/* <Footer /> */}
        </>
    );
};

export default ResumeLayout;

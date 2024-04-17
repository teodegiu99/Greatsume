// "use client"
import "../globals.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

const ResumeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
              <NavBar />

      <div style={{ height: `calc(100vh - 105px)` }}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default ResumeLayout;

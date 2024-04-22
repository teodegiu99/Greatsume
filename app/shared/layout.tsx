import "../globals.css";
import Footer from "../(protected)/components/Footer";
import PublicNav from "./components/PublicNav";

const SharedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <PublicNav />
            <div style={{ height: `calc(100vh - 105px)` }}>{children}</div>
            <Footer />
        </>
    );
};

export default SharedLayout;

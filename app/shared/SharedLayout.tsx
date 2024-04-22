import "../globals.css";
import { Provider } from "react-redux";
import { store } from "@/app/state/store";

const SharedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
              {/* <NavBar /> */}

      {/* <div style={{ height: `calc(100vh - 105px)` }}> */}

      <div>
        {children}
      </div>
      {/* <Footer /> */}

    </>
  );
};

export default SharedLayout;

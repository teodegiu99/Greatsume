"use client";
import ShareSettings from "./components/ShareSettings";
import ShowHide from "./components/ShowHide";
import { Provider } from "react-redux";
import { store } from "../../../state/store";
import CvHandler from "./components/cvHandler";

const page = () => {
  return (
    <Provider store={store}>
      <div className="grid grid-cols-4 h-full">
        <div className="cols-span-1 bg-[#f8f8ff] overflow-auto scrollbar-hide shadow-2xl ">
          <ShareSettings />
          <ShowHide />
        </div>
        <div className="col-span-3 h-full overflow-auto scrollbar-hide text-white">
          <CvHandler />
        </div>
      </div>
    </Provider>
  );
};

export default page;

"use client"
import { motion } from "framer-motion";
import {
  BiSolidUserCheck
} from "react-icons/bi";
import { IconType } from "react-icons";

const RibbonLogos = () => {
  return (
      <div className="flex overflow-hidden  border-2   rounded-2xl max-w-7xl justify-center items-center  mx-auto w-full shadow-2xl">
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItemsTop />
        </TranslateWrapper>
      </div>
   
  );
};

const TranslateWrapper = ({
  children,
  reverse,
}: {
  children: JSX.Element;
  reverse?: boolean;
}) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      className="flex px-2"
    >
      {children}
    </motion.div>
  );
};

const LogoItem = ({ Icon, name }: { Icon: IconType; name: string }) => {
  return (
    <a
      href="/"
      rel="nofollow"
      target="_blank"
      className="flex items-center justify-center gap-4 px-4 py-4 text-black transition-colors md:py-6"
    >
      <Icon className="text-3xl md:text-4xl text-violet-600" />
      <span className="whitespace-nowrap text-2xl font-semibold uppercase md:text-3xl">
        {name}
      </span>
    </a>
  );
};

const LogoItemsTop = () => (
  <>
    <LogoItem Icon={BiSolidUserCheck} name="Rise above the crowd in a sea of applicants" />
  </>
);



export default RibbonLogos;
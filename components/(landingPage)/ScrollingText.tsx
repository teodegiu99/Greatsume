"use client"
import { motion } from "framer-motion";
import {
  SiNike,
  Si3M,
  SiAbstract,
  SiAdobe,
  SiAirtable,
  SiAmazon,
  SiBox,
  SiBytedance,
  SiChase,
  SiCloudbees,
  SiBurton,
  SiBmw,
  SiHeroku,
  SiBuildkite,
  SiCouchbase,
  SiDailymotion,
  SiDeliveroo,
  SiEpicgames,
  SiGenius,
  SiGodaddy,
} from "react-icons/si";
import { IconType } from "react-icons";

const RibbonLogos = () => {
  return (
    <section className="bg-amber-200 py-24">
      <h2 className="mx-4 mb-12 text-center text-2xl font-medium text-neutral-900 md:text-4xl">
        1B+ requests tracked for users like...
      </h2>
      <div className="flex translate-y-[50%] rotate-[0deg] scale-110 overflow-hidden border-y-4 border-neutral-900 bg-neutral-50">
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
      <div className="flex -translate-y-[50%] -rotate-[10deg] scale-110 overflow-hidden border-y-4 border-neutral-900 bg-neutral-50">
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
      </div>
    </section>
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
      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
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
      className="flex items-center justify-center gap-4 px-4 py-4 text-black transition-colors hover:bg-neutral-200 md:py-6"
    >
      <Icon className="text-3xl md:text-4xl" />
      <span className="whitespace-nowrap text-2xl font-semibold uppercase md:text-3xl">
        {name}
      </span>
    </a>
  );
};

const LogoItemsTop = () => (
  <>
    <LogoItem Icon={SiNike} name="Fatti notare trai candidati" />
  </>
);

const LogoItemsBottom = () => (
  <>
    <LogoItem Icon={SiBmw} name="Stand out between dozens of applicants" />
    
  </>
);

export default RibbonLogos;
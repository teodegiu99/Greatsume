"use client";
import React, {
  useRef,
 
} from "react";
import { FaFileDownload } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import ClassicBlue from "./pdfTemplate/ClassicBlue";
import { getDownloadData, getPublicData } from "@/data/getPublicData";
import { PublicSchema } from "@/schemas";
import * as z from "zod";
import ElegantBlack from "./pdfTemplate/ElegantBlack";
import Tech from "./pdfTemplate/Tech";
import Anglo from "./pdfTemplate/Anglo";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { Button } from "../ui/button";


const TemplateComponents: Record<string, React.ComponentType<any>> = {
  ClassicBlue: ClassicBlue,
  ElegantBlack: ElegantBlack,
  Tech: Tech,
  Anglo: Anglo,
  // Aggiungi altri componenti qui, se necessario
};

const DownloadBtn = (props: {
  btnLocation: string;
  template?: string;
  publicLink?: string;
  style: string;
}) => {

    const templateArray = ["ClassicBlue", "ElegantBlack", "Tech", "Anglo"];

    const template = useSelector((state: RootState) => state.template.value);
    
    const index = Math.min(
        Math.max(template, 0),
        templateArray.length - 1
    );
  

  const componentRef = useRef<HTMLDivElement>(null);

  const WhichTemplate = props.template ? props.template : templateArray[index]
  const TemplateComponent = TemplateComponents[WhichTemplate];
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <Button
        onClick={handlePrint}
        className={props.style}
      >
        <FaFileDownload className="text-lg" />
        Download
      </Button>
      <div style={{ display: "none" }}>
        <TemplateComponent
          ref={componentRef}
          btnLocation={props.btnLocation}
          publicLink={props?.publicLink}
        />
      </div>
    </div>
  );
};

export default DownloadBtn;

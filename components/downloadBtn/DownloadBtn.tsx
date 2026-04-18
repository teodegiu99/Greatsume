"use client";
import React, { useRef } from "react";
import { FaFileDownload } from "react-icons/fa";
import ClassicBlue from "./pdfTemplate/ClassicBlue";
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
};

const DownloadBtn = (props: {
  btnLocation: string;
  template?: string;
  publicLink?: string;
  style: string;
  menuItem?: boolean;
}) => {
    const templateArray = ["ClassicBlue", "ElegantBlack", "Tech", "Anglo"];

    // Recupera lo stato del template e del link pubblico da Redux
    const templateIndex = useSelector((state: RootState) => state.template.value);
    const reduxPublicLink = useSelector((state: RootState) => (state.showHidePublic as { publicLink?: string }).publicLink);
    
    // Priorità al publicLink passato come prop, altrimenti usa quello in Redux
    const activePublicLink = props.publicLink || reduxPublicLink;

    const index = Math.min(
        Math.max(templateIndex, 0),
        templateArray.length - 1
    );
  
  const componentRef = useRef<HTMLDivElement>(null);

  const WhichTemplate = props.template ? props.template : templateArray[index];
  const TemplateComponent = TemplateComponents[WhichTemplate];

  const handleDownload = async () => {
    // Verifica che il link pubblico esista
    if (!activePublicLink) {
      console.error("Errore: publicLink non definito. Genera un link prima di scaricare.");
      return;
    }

    // Costruisce l'URL che Puppeteer dovrà visitare sulla VPS
    const publicCvUrl = `http://localhost:3000/shared/${activePublicLink}`; 
try {
      const response = await fetch(process.env.NEXT_PUBLIC_PDF_SERVICE_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: publicCvUrl }),
      });

      if (!response.ok) throw new Error("Errore dal server PDF");

      // MODIFICA FONDAMENTALE QUI SOTTO: Usiamo arrayBuffer invece di blob()
      const arrayBuffer = await response.arrayBuffer(); 
      
      // Creiamo il Blob partendo dai byte puri
      const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' }); 
      
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "Curriculum.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Errore durante il download:", error);
    }
  };

  return (
    <div>
      {!props.menuItem && (
        <Button onClick={handleDownload} className={props.style}>
          <FaFileDownload className="text-lg" />
          Download
        </Button>
      )}
      {props.menuItem && (
        <button onClick={handleDownload} className={props.style}>
          <FaFileDownload className="h-6 w-6" />
          Download
        </button>
      )}
      <div style={{ display: "none" }}>
        <TemplateComponent
          ref={componentRef}
          btnLocation={props.btnLocation}
          publicLink={activePublicLink}
        />
      </div>
    </div>
  );
};

export default DownloadBtn;
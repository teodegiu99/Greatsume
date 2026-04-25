
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
import { usePathname } from "next/navigation"; // Assicurati di importarlo

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
  const pathname = usePathname(); // Capisce su quale pagina ci troviamo
  const templateArray = ["ClassicBlue", "ElegantBlack", "Tech", "Anglo"];

  const templateIndex = useSelector((state: RootState) => state.template.value);
  const reduxPublicLink = useSelector((state: RootState) => state.showHidePublic.publicLink);
  const activePublicLink = props.publicLink || reduxPublicLink;

  const index = Math.min(Math.max(templateIndex, 0), templateArray.length - 1);
  const componentRef = useRef<HTMLDivElement>(null);

  const WhichTemplate = props.template ? props.template : templateArray[index];
  const TemplateComponent = TemplateComponents[WhichTemplate];

  const handleDownload = async () => {
    let payload = {};
    const isPublicPage = pathname.includes('/shared/');

    if (isPublicPage && activePublicLink) {
      payload = { url: `http://localhost:3000/shared/${activePublicLink}` };
    } else {
      if (!componentRef.current) return;

      // 1. ESTRAZIONE CSS RINFORZATA
      // Recuperiamo tutte le regole CSS caricate effettivamente nel browser
      let allCss = "";
      try {
        const sheets = Array.from(document.styleSheets);
        for (const sheet of sheets) {
          try {
            // Estraiamo ogni singola regola CSS
            const rules = Array.from(sheet.cssRules);
            allCss += rules.map(rule => rule.cssText).join("\n");
          } catch (e) {
            // Se un foglio di stile è esterno (es. Google Fonts), lo saltiamo o lo gestiamo
            console.warn("Impossibile leggere alcune regole CSS esterne:", e);
          }
        }
      } catch (e) {
        console.error("Errore critico durante l'estrazione CSS:", e);
      }

      const cvHtml = componentRef.current.innerHTML;
      const baseUrl = window.location.origin;

      // 2. CREAZIONE SNAPSHOT AUTO-SUFFICIENTE
      const fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <base href="${baseUrl}/">
          <style>
            /* Inseriamo tutto il CSS estratto direttamente qui */
            ${allCss}
            
            /* Fix aggiuntivi per la stampa */
            body { background: white !important; -webkit-print-color-adjust: exact; }
            * { transition: none !important; animation: none !important; }
          </style>
        </head>
        <body class="flex justify-center">
          ${cvHtml}
        </body>
        </html>
      `;
      payload = { html: fullHtml };
    }

    // 2. Chiamata API al server PDF
    try {
      const response = await fetch('/api/pdf-proxy', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Errore dal server PDF");

      // 3. Scaricamento Sicuro per macOS
      const arrayBuffer = await response.arrayBuffer();
      const pdfBlob = new Blob([arrayBuffer], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);

      const a = document.createElement("a");
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
      {!props.menuItem ? (
        <Button onClick={handleDownload} className={props.style}>
          <FaFileDownload className="text-lg" />
          Download
        </Button>
      ) : (
        <button onClick={handleDownload} className={props.style}>
          <FaFileDownload className="h-6 w-6" />
          Download
        </button>
      )}

      {/* MODIFICA FONDAMENTALE PER LA PAGINAZIONE:
        Invece di display: "none" (che azzera l'altezza), spostiamo il CV fuori dallo schermo.
        Così il PaginationWrapper può misurare l'altezza esatta e tagliare le pagine A4!
      */}
      <div className="absolute top-0 left-[-9999px] w-max overflow-hidden opacity-0 pointer-events-none">
        <div ref={componentRef}>
          <TemplateComponent
            btnLocation={props.btnLocation}
            publicLink={activePublicLink}
          />
        </div>
      </div>
    </div>
  );
};

export default DownloadBtn;
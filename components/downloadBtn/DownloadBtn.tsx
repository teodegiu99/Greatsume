"use client";
import React, { useRef } from "react";
import { FaFileDownload } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

// --- IMPORTA DAL REGISTRY ---
import { availableTemplates, templateRegistry } from "@/components/template/templateRegistry";

const DownloadBtn = (props: {
  btnLocation: string;
  template?: string;
  publicLink?: string;
  style: string;
  menuItem?: boolean;
}) => {
  const pathname = usePathname();
  const isPublicPage = pathname.includes('/shared/');

  // Selettori Redux
  const templateState = useSelector((state: RootState) => state.template);
  const reduxPublicLink = useSelector((state: RootState) => state.showHidePublic.publicLink);
  const cvData = useSelector((state: RootState) => state.updateValues); 
  const showHideOptions = useSelector((state: RootState) => state.showHide);

  const activePublicLink = props.publicLink || reduxPublicLink;
  
  // Dichiarazione del Ref mancante
  const componentRef = useRef<HTMLDivElement>(null);

  /**
   * Logica per determinare il nome del template (stringa).
   * Si assicura che il PDF usi lo stesso template visualizzato nella UI.
   */
  const getTemplateName = () => {
    // 1. Se passato via props (pagine pubbliche)
    if (props.template) return props.template;
    
    // 2. Se siamo loggati, usiamo l'indice corrente dallo stato Redux per ottenere il nome dall'array
    if (templateState && typeof templateState.value === 'number') {
      const index = Math.min(Math.max(templateState.value, 0), availableTemplates.length - 1);
      return availableTemplates[index];
    }
    
    // 3. Fallback sul nome salvato in showHide o default
    return showHideOptions?.template || "ClassicBlue";
  };

  const WhichTemplate = getTemplateName();
  const TemplateComponent = templateRegistry[WhichTemplate as keyof typeof templateRegistry];

  const handleDownload = async () => {
    let payload = {};

    if (isPublicPage && activePublicLink) {
      // Per la parte pubblica usiamo l'URL
      payload = { url: `${window.location.origin}/shared/${activePublicLink}` };
    } else {
      // Per la parte loggata estraiamo l'HTML dal componente invisibile
      if (!componentRef.current) return;

      let allCss = "";
      try {
        const sheets = Array.from(document.styleSheets);
        for (const sheet of sheets) {
          try {
            const rules = Array.from(sheet.cssRules);
            allCss += rules.map(rule => rule.cssText).join("\n");
          } catch (e) {
            console.warn("Impossibile leggere alcune regole CSS esterne:", e);
          }
        }
      } catch (e) {
        console.error("Errore critico durante l'estrazione CSS:", e);
      }

      const cvHtml = componentRef.current.innerHTML;
      const baseUrl = window.location.origin;

      const fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <base href="${baseUrl}/">
          <style>
            ${allCss}
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

    try {
      const response = await fetch('/api/pdf-proxy', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Errore dal server PDF");

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

  // Se non troviamo il componente del template, non renderizziamo nulla (evita crash)
  if (!TemplateComponent) return null;

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

      {/* Questo div renderizza il template in modo invisibile per poterne catturare l'HTML.
         Viene renderizzato solo se non siamo in una pagina pubblica e abbiamo i dati.
      */}
      {!isPublicPage && cvData && showHideOptions && (
        <div className="absolute top-0 left-[-9999px] w-max overflow-hidden opacity-0 pointer-events-none">
          <div ref={componentRef}>
            <TemplateComponent
              btnLocation={props.btnLocation}
              publicLink={activePublicLink}
              data={cvData}
              showHide={showHideOptions}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadBtn;
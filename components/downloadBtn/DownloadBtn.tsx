"use client";
import React, { useRef } from "react";
import { FaFileDownload } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

// --- IMPORTA DAL REGISTRY ---
// Assicurati che i nomi corrispondano a quelli esportati nel tuo templateRegistry.ts
import { availableTemplates, templateRegistry } from "@/components/template/templateRegistry";

const DownloadBtn = (props: {
  btnLocation: string;
  template?: string;
  publicLink?: string;
  style: string;
  menuItem?: boolean;
}) => {
  const pathname = usePathname();

  const templateIndex = useSelector((state: RootState) => state.template.value);
  const reduxPublicLink = useSelector((state: RootState) => state.showHidePublic.publicLink);
  const activePublicLink = props.publicLink || reduxPublicLink;

  // Ora availableTemplates viene dal registry, quindi .length funzionerà di nuovo
  const index = Math.min(Math.max(templateIndex, 0), availableTemplates.length - 1);
  const componentRef = useRef<HTMLDivElement>(null);

  const WhichTemplate = props.template ? props.template : availableTemplates[index];

  // Ora templateRegistry	 viene dal registry
  const TemplateComponent = templateRegistry[WhichTemplate as keyof typeof templateRegistry	];

  const handleDownload = async () => {
    let payload = {};
    const isPublicPage = pathname.includes('/shared/');

    if (isPublicPage && activePublicLink) {
      payload = { url: `http://localhost:3000/shared/${activePublicLink}` };
    } else {
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

  if (!TemplateComponent) return null; // Protezione se il template non esiste

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
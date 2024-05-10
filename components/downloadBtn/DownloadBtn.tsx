import React, { useRef, forwardRef, ForwardedRef } from "react";
import { FaFileDownload } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import ClassicBlue from "./pdfTemplate/ClassicBlue"
import { getPublicData } from "@/data/getPublicData";
import { PublicSchema } from "@/schemas";
import * as z from "zod";


const ContentToPrint2 = forwardRef(
    (props: { btnLocation: string }, ref: ForwardedRef<HTMLDivElement>) => (
        <div ref={ref}>
            <h1>Contenuto da stampare2</h1>
        </div>
    )
);

const TemplateComponents: Record<string, React.ComponentType<any>> = {
	ClassicBlue: ClassicBlue,
	ContentToPrint2: ContentToPrint2,
	// Aggiungi altri componenti qui, se necessario
  };

 
async function getObject (btnLocation: string, publicLink?: string) {

	if (btnLocation === "public" && publicLink) {
		const data = await getPublicData(publicLink); // Assume che getPublicData sia una funzione asincrona che ottiene i dati pubblici
		try {
            if (data) {
                const publicData = PublicSchema.parse(data); // Supponendo che PublicSchema sia uno schema Zod
				console.log("DAJEEEEEE", publicData)
                return publicData;
        } 
	} 
	catch (error) {
            console.error("Error connecting to db ", error);
        }
	}
	else if (btnLocation === "nav"){
		return null

	}
	else if (btnLocation === "share"){
		return null

	}
	else 
	{
		return null
	}
}
  

const DownloadBtn = async (props: { btnLocation: string; template: string }) => {
	const object = await getObject("public")
    const componentRef = useRef<HTMLDivElement>(null);
    const TemplateComponent = TemplateComponents[props.template];
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <button
                onClick={handlePrint}
                className="customBtnCol w-[100%] py-3 flex items-center justify-center gap-x-2 font-medium rounded-md"
            >
                <FaFileDownload className="text-lg" />
                Download
            </button>
            <div style={{ display: "none" }}>
                <TemplateComponent
                    ref={componentRef}
                    btnLocation={props.btnLocation}
                />
            </div>
        </div>
    );
};

export default DownloadBtn;

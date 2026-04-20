// "use client";
// import ClassicBlue from "./template/ClassicBlue";
// import ElegantBlack from "./template/ElegantBlack";
// import Tech from "./template/Tech";
// import Anglo from "./template/Anglo";
// import PaginationWrapper from "@/app/(protected)/components/center/PaginationWrapper";

// interface TemplateComponents {
//   [key: string]: React.ComponentType<any>;
// }

// interface PublicCvHandlerProps {
//   selectedTemplate: string;
//   publicLink: string;
//   resumeData: any; // I dati grezzi che arrivano dal DB
// }

// const templateComponents: TemplateComponents = {
//   ClassicBlue,
//   ElegantBlack,
//   Tech,
//   Anglo,
// };

// const PublicCvHandler: React.FC<PublicCvHandlerProps> = ({
//   selectedTemplate, 
//   publicLink, 
//   resumeData 
// }) => {
//   const ComponenteScelto = templateComponents[selectedTemplate];

//   // 1. Mappiamo i dati grezzi del DB nell'oggetto 'data' che i template si aspettano
//   const cvData = {
//     name: resumeData?.name || "",
//     surname: resumeData?.surname || "",
//     desiredJob: resumeData?.desiredJob || "",
//     email: resumeData?.email || "",
//     phone: resumeData?.phone || "",
//     address: resumeData?.address || "",
//     website: resumeData?.website || "",
//     relocation: resumeData?.relocation || "",
//     linkedin: resumeData?.linkedin || "",
//     github: resumeData?.github || "",
//     dribble: resumeData?.dribble || "",
//     ral: resumeData?.ral || "",
//     bio: resumeData?.bio || "",
//     image: resumeData?.image || "",
//     // Assicurati che questi siano array (Prisma a volte li restituisce come JSON)
//     experience: Array.isArray(resumeData?.experience) ? resumeData.experience : [],
//     education: Array.isArray(resumeData?.education) ? resumeData.education : [],
//     skillss: Array.isArray(resumeData?.skillss) ? resumeData.skillss : [],
//     softSkillss: Array.isArray(resumeData?.softSkillss) ? resumeData.softSkillss : [],
//     langSkillss: Array.isArray(resumeData?.langSkillss) ? resumeData.langSkillss : [],
//   };

//   // 2. Mappiamo le impostazioni di visibilità
//   // Nota: controlla se nel tuo DB i campi si chiamano esattamente così!
//   const showHideOptions = {
//     showImage: resumeData?.showImage ?? true,
//     showAddress: resumeData?.showAddress ?? true,
//     showDateOfBirth: resumeData?.showDateOfBirth ?? true,
//     showBio: resumeData?.showBio ?? true,
//   };

//   return (
//     <div className="h-full w-full">
//       {ComponenteScelto && (
//         <PaginationWrapper>
//            {/* 3. Passiamo le props esatte richieste da TemplateBaseProps */}
//            <ComponenteScelto data={cvData} showHide={showHideOptions} />
//         </PaginationWrapper>
//       )}
//     </div>
//   );
// };

// export default PublicCvHandler;
"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { setUpdateValues } from "@/app/state/values/showHidePublicSlice";
import PaginationWrapper from "@/app/(protected)/components/center/PaginationWrapper";
import { templateRegistry } from "@/components/template/templateRegistry";
import { CvData } from "@/types/template";

interface PublicCvHandlerProps {
  initialData: any; // Riceve l'oggetto completo dal DB
  templateName: string;
  publicLink: string;
}

const PublicCvHandler = ({ initialData, templateName }: PublicCvHandlerProps) => {
  const dispatch = useDispatch();

  // 1. PULIZIA NOME TEMPLATE: Rimuove virgolette extra se presenti (es. "\"Anglo\"" -> Anglo)
  const cleanTemplateName = templateName 
    ? templateName.replace(/['"]/g, '').trim() 
    : "ClassicBlue";

  // 2. SINCRONIZZAZIONE: Carica i valori del DB in Redux al primo caricamento
  useEffect(() => {
    if (initialData) {
      dispatch(setUpdateValues({
        showImage: initialData.showImage ?? true,
        showAddress: initialData.showAddress ?? true,
        showDateOfBirth: initialData.showDateOfBirth ?? true,
        showBio: initialData.showBio ?? true,
      }));
    }
  }, [initialData, dispatch]);

  // 3. REATTIVITÀ: Legge le opzioni da Redux (così la sidebar funziona live)
  const showHideOptions = useSelector((state: RootState) => state.showHidePublic);

  // 4. SELEZIONE: Prende il componente dal registro
  const ComponenteScelto = templateRegistry[cleanTemplateName];

  return (
    <div className="h-full w-full">
      {/* Controllo di esistenza per evitare errori JSX e caricamento dati */}
      {ComponenteScelto && initialData ? (
        <PaginationWrapper>
          <ComponenteScelto data={initialData} showHide={showHideOptions} />
        </PaginationWrapper>
      ) : (
        <div className="flex h-full justify-center items-center text-red-500">
          {!initialData ? "Dati del CV non trovati." : `Template "${cleanTemplateName}" non trovato.`}
        </div>
      )}
    </div>
  );
};

export default PublicCvHandler;
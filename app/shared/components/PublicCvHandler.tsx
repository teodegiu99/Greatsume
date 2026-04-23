
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
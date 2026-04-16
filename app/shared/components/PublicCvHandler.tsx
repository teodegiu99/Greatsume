"use client";
import ClassicBlue from "./template/ClassicBlue";
import ElegantBlack from "./template/ElegantBlack";
import Tech from "./template/Tech";
import Anglo from "./template/Anglo";
// Assicurati di importarlo correttamente tra le graffe se non è l'export default
import PaginationWrapper from "@/app/(protected)/components/center/PaginationWrapper";
interface TemplateComponents {
  [key: string]: React.ComponentType<any>;
}

interface PublicCvHandlerProps {
  selectedTemplate: string;
  publicLink: string;
  resumeData: any; 
}

const templateComponents: TemplateComponents = {
  ClassicBlue,
  ElegantBlack,
  Tech,
  Anglo,
};

const PublicCvHandler: React.FC<PublicCvHandlerProps> = ({
  selectedTemplate, 
  publicLink, 
  resumeData 
}) => {
  const ComponenteScelto = templateComponents[selectedTemplate];

  return (
    <div className="h-full w-full">
      {ComponenteScelto && (
        <PaginationWrapper>
           {/* Ora 'children' è correttamente accettato */}
           <ComponenteScelto resume={resumeData} publicLink={publicLink} />
        </PaginationWrapper>
      )}
    </div>
  );
};

export default PublicCvHandler;
import { useFormikContext } from "formik";
import { useEffect } from "react";

interface StreamValuesProps {
    langSkills: string[];
    softSkills: string[];
    skills: string[];
  }
export const StreamValues: React.FC<StreamValuesProps> = ({ langSkills, softSkills, skills }) => {
    
    const {values} = useFormikContext();
    useEffect(() => {
        console.log(langSkills, softSkills, skills)
        console.log(values)
    },[values, softSkills, skills, langSkills])
    return null
}

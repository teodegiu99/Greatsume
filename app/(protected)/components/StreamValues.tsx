"use client"
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { setUpdateValues } from '../../state/values/valuesSlice';
import { ValuesState } from "../../state/values/valuesSlice";

interface StreamValuesProps {
    langSkills: string[];
    softSkills: string[];
    skills: string[];
  }

  interface FormikValues {
    name: string,
    surname: string,
    address: string,
    dateOfBirth: string,
    relocation: string,
    phone: string,
    email: string,
    linkedin: string,
    github: string,
    dribble: string,
    website: string,
    bio: string,
    desiredJob: string,
    ral: string,
    experience: [
      {
        years: string,
        title: string,
        exps: string,
      },
    ],
    education: [
      {
        eyears: string,
        etitle: string,
        edu: string,
      },
    ],
    skillss: string[],
    softSkillss: string[],
    langSkillss: string[],
    image: string,
  };
  
export const StreamValues: React.FC<StreamValuesProps> = ({ langSkills, softSkills, skills }) => {

  const {values, setValues} = useFormikContext<FormikValues>();

  useEffect(() => {
    setValues(prevValues => ({
      ...prevValues,
      skillss: [...skills],
      softSkillss: [...softSkills],
      langSkillss: [...langSkills]
    }));
  }, [skills, softSkills, langSkills, setValues]);

  const dispatch = useDispatch();
  const object = useSelector((state: RootState) => state.updateValues);

  const handleUpdateValues = () => {
    const newObject: ValuesState = {
      ...values
    };
    dispatch(setUpdateValues(newObject));
  };

   
    useEffect(() => {
      handleUpdateValues()
        console.log(values)



    },[values])

    
    return null
}

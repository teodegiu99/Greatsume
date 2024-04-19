"use client"
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { setUpdateValues } from '../../../state/values/showHideSlice';
import { ShowHide } from "../../../state/values/showHideSlice";



  interface FormikValues {
    showImage: boolean;
    showAddress: boolean;
    showDateOfBirth: boolean;
    showBio: boolean;
    template: string;
  };
  
export const StreamShowHideOptions = () => {

  const {values, setValues} = useFormikContext<FormikValues>();


  const dispatch = useDispatch();
  const object = useSelector((state: RootState) => state.showHide);

  const handleUpdateValues = () => {
    const newObject: ShowHide = {
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

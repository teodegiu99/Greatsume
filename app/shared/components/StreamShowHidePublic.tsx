"use client";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { ShowHidePublic } from "@/app/state/values/showHidePublicSlice";
import { setUpdateValues } from "@/app/state/values/showHidePublicSlice";

interface FormikValues {
  showImage: boolean;
  showAddress: boolean;
  showDateOfBirth: boolean;
  showBio: boolean;
}

export const StreamShowHidePublic = () => {
  const { values, setValues } = useFormikContext<FormikValues>();

  const dispatch = useDispatch();
  const object = useSelector((state: RootState) => state.showHidePublic);

  const handleUpdateValues = () => {
    const newObject: ShowHidePublic = {
      ...values,
    };
    dispatch(setUpdateValues(newObject));
  };

  useEffect(() => {
    handleUpdateValues();
  }, [values]);

  return null;
};

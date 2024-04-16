import React from 'react'
import {
    Formik,
    Field,
    Form,
    ErrorMessage,
    FieldArray,
    FieldProps,
    useFormikContext
} from "formik";


const CvHandler = () => {
    // const {values} = useFormikContext();

    // console.log("formik context", values)
  return (
    <div>
      <p id="cvName">
      </p>
      <p id="cvSurname">
      </p>
      <p id="cvAddress">
      </p>
      <p id="cvDateOfBirth">
      </p>
      <p id="cvRelocate">
      </p>
      <p id="cvPhone">
      </p>
      <p id="cvEmail">
      </p>
      <p id="cvLinkedin">
      </p>
      <p id="cvGithub">
      </p>
      <p id="cvWebsite">
      </p>
    </div>
  )
}

export default CvHandler

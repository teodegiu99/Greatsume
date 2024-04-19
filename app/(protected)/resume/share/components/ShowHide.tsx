"use client"
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from "formik";
import { ShowHideUpdate, getShowHideOptions } from '@/actions/showHideOptions';
import { StreamShowHideOptions } from './StreamShowHideOptions';

interface FormData {
  showImage: boolean;
  showAddress: boolean;
  showDateOfBirth: boolean;
  showBio: boolean;
  template: string;
}




const ShowHide = () => {

    const [initialValues, setInitialValues] = useState({
        showImage: true,
        showAddress: true,
        showDateOfBirth: true,
        showBio: true,
        template: "classicBlue",
    })
    
    useEffect(() => {
        const fetchPublicValues = async () => {
            try {
                const data = await getShowHideOptions();
                if (data) {
                    setInitialValues({
                        showAddress: data.showAddress,
                        showBio: data.showBio,
                        showDateOfBirth: data.showDateOfBirth,
                        showImage: data.showImage,
                        template: data.cvTemplate,
                    })
                }
                console.log(data)
            
            } catch (error) {
                console.error("Error connecting to db ", error);
            }
        };

        fetchPublicValues();
    }, []);

    const handleSubmit = async (values: FormData) => {
        await ShowHideUpdate(values)
        console.log(values);
      };
    
  return (
    <div>
      <div className="block p-5">
                <h1 className=" font-semibold text-xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Would you like to hide something before sharing?</h1>
                <p className="font-regular  text-md text-slate-700">Sharing your information on the interneet can be scary, choose wisely what to share!</p>
            </div>
            <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors }) => (

        <Form className='p-5'>
          <label>
            <Field type="checkbox" name="showImage" id="showImage"/>
            Show your picture
          </label>
          <br />
          <label>
            <Field type="checkbox" name="showAddress" id="showAddress" />
            Show your address
          </label>
          <br />
          <label>
            <Field type="checkbox" name="showDateOfBirth" id="showDateOfBirth" />
            Show your date of birth
          </label>
          <br />
          <label>
            <Field type="checkbox" name="showBio" id="showBio" />
            Show your biography
          </label>
          <br />
          <div>
                <label htmlFor="template" className="formLabel ">
                  Which resume template do you want to share?
                </label>
                <Field
                  as="select"
                  id="template"
                  name="template"
                  multiple={false}
                  className="inputField"
                  // onChange={handleRelocate}
                >
                  <option value="ClassicBlue">Classic Blue</option>
                  <option value="ElegantBlack">Elegant Black</option>
                  <option value="Tech">Tech</option>
                  <option value="Anglo">Anglo</option>

                </Field>
              </div>
          <br />
          <StreamShowHideOptions />
          <button type="submit">Submit</button>
        </Form>
        )}
      </Formik>
    </div>
  )
}

export default ShowHide

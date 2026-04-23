"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { MdOutlineBoy, MdPlace, MdCake, MdImage, MdPalette, MdVisibility } from "react-icons/md";
import { StreamShowHideOptions } from "./StreamShowHideOptions";
import { updateShowHideOptions } from "@/actions/showHideOptions";
import { templateRegistry } from "@/components/template/templateRegistry";
import { FormError } from "@/components/form-error";     // I tuoi componenti nativi
import { FormSuccess } from "@/components/form-success"; // I tuoi componenti nativi

const ShowHide = ({ publicData }: { publicData: any }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  
  const templateOptions = Object.keys(templateRegistry);

  const initialValues = {
    showBio: publicData?.showBio ?? true,
    showAddress: publicData?.showAddress ?? true,
    showDateOfBirth: publicData?.showDateOfBirth ?? true,
    showImage: publicData?.showImage ?? true,
    template: publicData?.cvTemplate || "ClassicBlue",
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={async (values) => {
        // Reset dei messaggi precedenti
        setError("");
        setSuccess("");
        
        // Chiamata alla server action aggiornata
        const result = await updateShowHideOptions(values);
        
        if (result?.error) {
          setError(result.error);
        } else if (result?.success) {
          setSuccess(result.success);
          // Nascondiamo il messaggio di successo dopo 3 secondi
          setTimeout(() => setSuccess(""), 3000); 
        }
      }}
    >
      {() => (
        <Form id="share-settings-form" className="space-y-6">
          
          {/* Spazio per i messaggi di Errore/Successo */}
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}

          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <MdPalette className="text-indigo-500" />
              Choose Template to Share
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {templateOptions.map((t) => (
                <label key={t} className="cursor-pointer">
                  <Field type="radio" name="template" value={t} className="sr-only peer" />
                  <div className="p-2 text-center text-xs border rounded-lg border-slate-200 peer-checked:border-indigo-600 peer-checked:bg-indigo-50 peer-checked:text-indigo-700 transition-all hover:bg-slate-50">
                    {t}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-50 pt-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <MdVisibility className="text-indigo-500" />
              Visibility Settings
            </h3>
            <div className="space-y-2">
              <ToggleRow name="showBio" label="Show Bio" icon={<MdOutlineBoy />} />
              <ToggleRow name="showAddress" label="Show Address" icon={<MdPlace />} />
              <ToggleRow name="showDateOfBirth" label="Show Date of Birth" icon={<MdCake />} />
              <ToggleRow name="showImage" label="Show Profile Image" icon={<MdImage />} />
            </div>
          </div>

          <StreamShowHideOptions />
        </Form>
      )}
    </Formik>
  );
};

const ToggleRow = ({ name, label, icon }: { name: string, label: string, icon: React.ReactNode }) => (
  <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors">
    <div className="flex items-center gap-3">
      <div className="p-1.5 bg-slate-50 text-slate-600 rounded">{icon}</div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <Field type="checkbox" name={name} className="sr-only peer" />
      <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
    </label>
  </div>
);

export default ShowHide;
"use client"
import { imgResume } from '@/actions/resume';
import Compressor from 'compressorjs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import React, { useEffect, useState } from 'react';
import { setUpdateValues } from '../../../state/values/valuesSlice';
import { ValuesState } from "../../../state/values/valuesSlice";

const YourComponent: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  const dispatch = useDispatch();
  const object = useSelector((state: RootState) => state.updateValues);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    
    if (files && files.length > 0) {
      const file = files[0];
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        alert('Formato file non supportato. Assicurati che l\'immagine sia in formato JPEG, JPG, PNG o WEBP.');
        return
      }
      if (file.size > 500 * 1024) {
        alert('Il file è troppo grande. Assicurati che la dimensione sia inferiore a 500 KB.');
      } else {
        const compressedImage = await compressImage(file);

        setImage(compressedImage);
    

        // Chiamata alla funzione resume() con l'immagine
        await imgResume(compressedImage);
      }
  
  
      
    }
   
  };
  useEffect (() =>{
    if (image !== null) {
      const newObject: ValuesState = {
        ...object, // Copia tutti i valori esistenti
        image: image, // Aggiorna l'immagine nel nuovo oggetto
      };
      dispatch(setUpdateValues(newObject));
    }
  }, [image]) // Esegui l'effetto quando cambia l'immagine o lo stato di Redux

  return (
    <>
    <h3 className="text-start m-4 formTitle">Resume Picture</h3>
    <div className='p-4 m-2 border-2 border-slate-200 rounded-md flex flex-col justify-center items-start gap-y-2'>
      <h5 className='block'>Carica un'immagine (max 500 KB)</h5>
      <input type="file" accept="image/*" onChange={handleFileUpload} className='  bg-white ring-inset ring-1 ring-indigo-600 sm:text-sm sm:leading-6 w-full  rounded-sm'/>
    </div>
    </>
  );
};

export default YourComponent;

const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        maxWidth: 400, // Larghezza massima dell'immagine
        maxHeight: 500, // Altezza massima dell'immagine
        quality: 0.6, // Qualità dell'immagine compressa (da 0 a 1)
        success(result: Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            const base64String = reader.result as string;
            resolve(base64String);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(result);
        },
        error(err: Error) {
          reject(err);
        }
      });
    });
  };
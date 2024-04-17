"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { getImage } from "@/data/InitialData";
import { useEffect } from "react";

const CvHandler =  () => {

  

  const object = useSelector((state: RootState) => state.updateValues);
  useEffect(() => {
    // Codice per aggiornare l'immagine quando l'URL cambia
    // Ad esempio, se l'URL dell'immagine è contenuto in object.image
    const img = document.getElementById('cvImage') as HTMLImageElement;
    if (img) {
      img.src = object.image;
    }
  }, [object.image]);
  console.log("Contenuto di object:", object);

  return (
    <div className="h-full flex justify-center items-center">
      <p>{object.address}</p>

      <div className="a4">
        <div className="grid grid-cols-3 h-full">
          <div className="col-span-1 bg-blue-600 p-5 w-full h-full">
              <div className="w-[75%]">
                <img id="cvImage" src={`${object.image}`} />
                <p>${object.image}</p>
      <p>{object.bio}</p>

              </div>
          </div>
          <div className="col-span-2">

          </div>
        </div>
      </div>
    </div>
  );
};

export default CvHandler;

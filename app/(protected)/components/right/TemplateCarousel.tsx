"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "../../../state/values/templateSlice";
import { setUpdateValues } from "../../../state/values/loaderTemplateSlice";

import { getTemplate } from "@/data/InitialData";
import { RootState } from "@/app/state/store";

interface CVTemplate {
  title: string;
  url: string;
  description: string;
}

interface VerticalCarouselProps {
  cvTemplates: CVTemplate[];
  onItemClick: (index: number) => void;
  selectedIndex: number; // Aggiungi una prop per tenere traccia dell'elemento selezionato
}

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({
  cvTemplates,
  onItemClick,
  selectedIndex,
}) => {
  return (
    <div className="flex flex-col h-full gap-y-6 items-center">
      {cvTemplates.map((template, index) => (
        <div
          key={index}
          className={`bg-gray-200 lg:p-4 p-2  border w-1/2 lg:w-full border-gray-300 rounded-md shadow-md  lg:mr-0 lg:mb-6 aspect-w-210-h-297 ${
            index === selectedIndex ? "selected" : ""
          }`}
          onClick={() => onItemClick(index)}
        >
          <h2 className="text-lg font-semibold mb-2">{template.title}</h2>
        </div>
      ))}
    </div>
  );
};

const TemplateCarousel: React.FC = () => {
  const dispatch = useDispatch();

  const templateArray = ["ClassicBlue", "ElegantBlack", "Tech", "Anglo"];
  const [template, setTemplate] = useState<string>("");
  const [index, setIndex] = useState<number>();
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1); // Inizializza lo stato per tenere traccia dell'elemento selezionato

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTemplate();
        if (data) {
          setTemplate(data);
          dispatch(setUpdateValues(true));

        } else {
          console.log("Error retrieving template");
        }
      } catch (error) {
        console.error("Error connecting to db ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const index = templateArray.indexOf(template);
    setIndex(index);
    dispatch(setValue(index));
    setSelectedItemIndex(index); // Imposta l'elemento selezionato quando viene cliccato
    console.log(index);
  }, [template]); // Ora template è la sola dipendenza

  // Esempio di dati per cvTemplates
  const handleItemClick = (index: number) => {
    dispatch(setValue(index));
    setSelectedItemIndex(index); // Imposta l'elemento selezionato quando viene cliccato
    console.log(`Elemento cliccato: ${index}`);
  };

  const cvTemplates: CVTemplate[] = [
    {
      title: "Classic Blue",
      url: "https:template1",
      description: "Questo è il template 1",
    },
    {
      title: "Elegant Black",
      url: "https:template2",
      description: "Questo è il template 2",
    },
    {
      title: "Tech",
      url: "https:template3",
      description: "Questo è il template 3",
    },
    {
      title: "Anglo",
      url: "https:template3",
      description: "Questo è il template 3",
    },
  ];

  return (
    <>
      <div className="sticky top-0 block bg-[#f8f8ff] p-3 z-50 border-b-2 border-slate-300">
        <h3 className="text-center lg:m-4 formTitle">Choose Your Template</h3>
      </div>
      <div className="p-3 lg:p-5 bg-[#f8f8ff] overflow-auto  scrollbar-hide w-full">
        <VerticalCarousel
          cvTemplates={cvTemplates}
          onItemClick={handleItemClick}
          selectedIndex={selectedItemIndex}
        />
      </div>
    </>
  );
};

export default TemplateCarousel;

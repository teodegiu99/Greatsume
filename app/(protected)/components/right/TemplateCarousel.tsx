"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setValue } from "../../../state/values/templateSlice";

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
    <div className="flex flex-col">
      {cvTemplates.map((template, index) => (
        <div
          key={index}
          className={`bg-gray-200 p-4 border border-gray-300 rounded-md shadow-md mb-6 aspect-w-210-h-297 ${
            index === selectedIndex ? "selected" : ""
          }`}
          onClick={() => onItemClick(index)}
        >
          <h2 className="text-lg font-semibold mb-2">{template.title}</h2>
          <p className="text-blue-500 mb-2">{template.url}</p>
          <p className="text-gray-600">{template.description}</p>
        </div>
      ))}
    </div>
  );
};

const TemplateCarousel: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1); // Inizializza lo stato per tenere traccia dell'elemento selezionato

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
      <div className="sticky top-0 bg-[#f8f8ff] p-3 z-50 border-b-2 border-slate-300 ">
        <h3 className="text-center m-4 formTitle">Choose Your Template</h3>
      </div>
      <div className="p-5 bg-[#f8f8ff] ">
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

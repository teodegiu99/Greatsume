"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { useEffect, useRef, useState } from "react";

const ClassicBlue = () => {
  const object = useSelector((state: RootState) => state.updateValues);
  const [exceed, setExceed] = useState<string>("");
  const [exceedIndex, setExceedIndex] = useState<number>();
  const [renderSecondPage, setRenderSecondPage] = useState<boolean>(false);
  const [eduHeights, setEduHeights] = useState<number[]>([]);

  const [mainHeight, setMainHeight] = useState<number>(0);
  const [expHeight, setExpHeight] = useState<number>(0);
  const [eduHeight, setEduHeight] = useState<number>(0);
  const [pageHeight, setPageHeight] = useState<number>(0);
  const [tot, setTot] = useState<number>(0);

  const pageRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const eduRef = useRef<HTMLDivElement>(null);
  const eduItemRefs = object.education.map(() => useRef<HTMLDivElement>(null));

  

  useEffect(() => {
    if (pageRef.current) {
      const computedStyle = window.getComputedStyle(pageRef.current);
      const height =
        pageRef.current.clientHeight +
        parseInt(computedStyle.paddingTop) +
        parseInt(computedStyle.paddingBottom) +
        parseInt(computedStyle.marginTop) +
        parseInt(computedStyle.marginBottom);
      setPageHeight(height);
    }
  }, [pageRef, object]);

  

  useEffect(() => {
    if (mainRef.current) {
      const computedStyle = window.getComputedStyle(mainRef.current);
      const height =
        mainRef.current.clientHeight +
        parseInt(computedStyle.paddingTop) +
        parseInt(computedStyle.paddingBottom) +
        parseInt(computedStyle.marginTop) +
        parseInt(computedStyle.marginBottom);
      setMainHeight(height);
    }
  }, [mainRef, object.name, object.surname, object.desiredJob, object.bio]);

  useEffect(() => {
    if (expRef.current) {
      const computedStyle = window.getComputedStyle(expRef.current);
      const height =
        expRef.current.clientHeight +
        parseInt(computedStyle.paddingTop) +
        parseInt(computedStyle.paddingBottom) +
        parseInt(computedStyle.marginTop) +
        parseInt(computedStyle.marginBottom);
      setExpHeight(height);
    }
  }, [expRef, object.experience]);

  useEffect(() => {
    if (eduRef.current) {
      const computedStyle = window.getComputedStyle(eduRef.current);
      const height =
        eduRef.current.clientHeight +
        parseInt(computedStyle.paddingTop) +
        parseInt(computedStyle.paddingBottom) +
        parseInt(computedStyle.marginTop) +
        parseInt(computedStyle.marginBottom);
      setEduHeight(height);
    }
  }, [eduRef, object.education]);

  // vado a vedere se la dimensione totale è maggiore dell altezza della pagina per capire se creare una seconda pagina 
  useEffect(() => {
    setTot(expHeight + eduHeight + mainHeight + 70);
    if (tot > pageHeight) {
      if (expHeight + mainHeight > pageHeight) {
        const secondPage = true;
        setRenderSecondPage(secondPage);
        setExceed("experience");
      } else {
        if (expHeight + mainHeight + eduHeight > pageHeight) {
          const secondPage = true;
          setRenderSecondPage(secondPage);
          setExceed("education");
        }
      }
    }else {
      setExceed("")
    }
  }, [mainHeight, expHeight, eduHeight, pageHeight, object]);



  useEffect(() => {
    const heights = eduItemRefs.map(ref => {
      if (ref.current) {
        const computedStyle = window.getComputedStyle(ref.current);
        return (
          ref.current.offsetHeight +
          parseInt(computedStyle.paddingTop) +
          parseInt(computedStyle.paddingBottom) +
          parseInt(computedStyle.marginTop) +
          parseInt(computedStyle.marginBottom)
        );
      } else {
        return 0;
      }
    });
    setEduHeights(heights);
  }, [object.education]);



  return (
    <div className="h-full flex justify-center items-center">
      {/* <p>{object.address}</p> */}

      <div className="a4 shadow-lg">
        <div ref={pageRef} className="grid grid-cols-3 h-full">
          <div className="col-span-1 bg-[#1c2863] p-3 w-full">
            <div className="flex justify-center w-full mb-4">
              <img
                id="cvImage"
                className="max-w-[75%] rounded-full"
                src={`${object.image}`}
              />
              {/* <p>${object.image}</p> */}
            </div>
            {/* {pageRef.current?.clientHeight} */}
            {tot} {pageHeight} {mainHeight}
            <div className="flex justify-start flex-col">
              <p className="cvTitle">Personal Information</p>
              {eduHeights.map((height, index) => (
        <div key={index}>
          Altezza dell'elemento {index + 1}: {height}px
        </div>
      ))}
              <hr className="mb-2"></hr>
              <p className="cvSubTitle">Address</p>
              <p className="cvData">{object.address}</p>
              <p className="cvSubTitle">Date Of Birth</p>
              <p className="cvData">{object.dateOfBirth}</p>
            </div>
            <div className="flex justify-start flex-col">
              <p className="cvTitle">Contacts</p>
              <hr className="mb-2"></hr>
             {object.email &&  <><p className="cvSubTitle">Email</p>
              <p className="cvData">{object.email}</p> </>}
              <p className="cvSubTitle">Phone number</p>
              <p className="cvData">{object.phone}</p>
              <p className="cvSubTitle">LinkedIn</p>
              <p className="cvData">{object.linkedin}</p>
              <p className="cvSubTitle">GitHub</p>
              <p className="cvData">{object.github}</p>
              <p className="cvSubTitle">Dribble</p>
              <p className="cvData">{object.dribble}</p>
              <p className="cvSubTitle">Personal Website</p>
              <p className="cvData">{object.website}</p>
            </div>
            <div className="flex justify-start flex-col">
              <p className="cvTitle mt-2">Skills</p>
              <hr className="mb-2"></hr>
              <ul>
                {object.skillss.map((skill, index) => (
                  <li className="cvSubTitle" key={index}>
                    {" "}
                    - {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-start flex-col">
              <p className="cvTitle mt-2">Soft Skills</p>
              <hr className="mb-2"></hr>
              <ul>
                {object.softSkillss.map((skill, index) => (
                  <li className="cvSubTitle" key={index}>
                    {" "}
                    - {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-start flex-col">
              <p className="cvTitle mt-2">Languages</p>
              <hr className="mb-2"></hr>
              <ul>
                {object.langSkillss.map((skill, index) => (
                  <li className="cvSubTitle" key={index}>
                    {" "}
                    - {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-2 p-3 w-full h-full text-black">
            <div ref={mainRef} className="flex justify-start flex-col">
              <h1 className="cvMainTitle">
                {object.name} {object.surname}
              </h1>
              <h2 className="cvMainSub">{object.desiredJob}</h2>
              <p className="cvData text-justify">{object.bio}</p>
            </div>
            {object.experience && (exceed != "experience") &&
            <div ref={expRef}>
              <h2 className="cvMainSub">Experience</h2>
              <hr className="mb-2 border-t-1 border-slate-400"></hr>
              {object.experience.map((exp, index) => (
                <>
                  <div
                    key={index}
                    className="flex flex-row justify-between pb-1"
                  >
                    <p className="cvSubTitle">{exp.title}</p>
                    <p className="cvSubTitle">{exp.years}</p>
                  </div>
                  <div>
                    <p className="cvData pb-2 text-justify">{exp.exps}</p>
                  </div>
                </>
              ))}
            </div>}
            {object.education  && <div ref={eduRef}>
              <h2 className="cvMainSub">Education</h2>
              <hr className="mb-2 border-t-1 border-slate-400"></hr>
              {object.education.map((edu, index) => (
                <>
                  <div
                    key={index}
                    ref={eduItemRefs[index]}
                    className="flex flex-row justify-between pb-1"
                  >
                    <p className="cvSubTitle">{edu.etitle}</p>
                    <p className="cvSubTitle">{edu.eyears}</p>
                  </div>
                  <div>
                    <p className="cvData pb-2 text-justify">{edu.edu}</p>
                  </div>
                </>
              ))}
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicBlue;

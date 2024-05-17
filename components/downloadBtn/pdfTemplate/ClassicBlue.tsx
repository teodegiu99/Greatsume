"use client"
import { useState, useEffect, useRef } from "react";
import { getPublicData, getDownloadData } from "@/data/getPublicData";
import { PublicSchema, ShowHide } from "@/schemas";
import * as z from "zod";
import { forwardRef, ForwardedRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";
import { usePathname } from "next/navigation";

type ShowHideDefault = z.infer<typeof ShowHide>;


const ClassicBlue = forwardRef(
  (
    props: { btnLocation: string; publicLink: string },
    ref: ForwardedRef<HTMLDivElement>
  ) => {

    const [showHide, setShowHide] = useState<Partial<z.infer<typeof ShowHide>>>();
    const [object, setObject] = useState<Partial<z.infer<typeof PublicSchema>>>();
  
    const showHideDefault: ShowHideDefault = {
      showAddress: true,
      showBio: true,
      showDateOfBirth: true,
      showImage: true
    }

      const pathname = usePathname();

      const showHidePublicTemp = useSelector((state: RootState) => state.showHidePublic);
      const showHideTemp = useSelector((state: RootState) => state.showHide);
    
      useEffect(() => {
        if (props.btnLocation === "nav") {
          pathname === "/resume/share" ? setShowHide(showHideTemp) : setShowHide(showHideDefault)}
       else   if (props.btnLocation === "public") {
        setShowHide(showHidePublicTemp)

       }

      }, [showHidePublicTemp, showHideTemp, pathname, props.btnLocation, props.publicLink]);

    useEffect(() => {
      console.log(props.publicLink);
      const fetchData = async () => {
        try {
          if (props.btnLocation === "public" && props.publicLink) {
          
            const data = await getPublicData(props.publicLink);
            if (data) {
              setObject(data);
            } else {
              console.log("Error retrieving public data");
            }
          }
          if (props.btnLocation === "nav") {
            const data = await getDownloadData();
            if (data) {
              setObject(data);
              console.log("nav", data);

            } else {
              console.log("Error retrieving nav data");
            }
          }
        } catch (error) {
          console.error("Error connecting to db ", error);
        }
      };
    
      fetchData();
      
      console.log(showHide);
    }, [props.btnLocation, props.publicLink]);

    



    
    return (
      <div ref={ref}>
        <div className="grid grid-cols-3 h-full">
          <div className="col-span-1 bg-[#1c2863] p-3 w-full text-white min-h-[100vh]">
           {object?.image && object?.showImage && showHide?.showImage &&
            <div className="flex justify-center w-full mb-4">
              <img
                id="cvImage"
                className="max-w-[75%] rounded-full"
                src={`${object?.image}`}
              />
            </div>}

            <div className="flex justify-start flex-col">
              {(object?.address || object?.dateOfBirth || object?.relocation) && (object?.showAddress || object?.showDateOfBirth || object?.relocation) && (showHide?.showAddress || showHide?.showDateOfBirth || object?.relocation) && (
                <>
                  <p className="cvTitle-ClassicBlue">Personal Information</p>
                  <hr className="mb-2"></hr>
                </>
              )}
              {object?.address && object?.showAddress && showHide?.showAddress &&(
                <>
                  <p className="cvSubTitle-ClassicBlue">Address</p>
                  <p className="cvData-ClassicBlue">{object?.address}</p>
                </>
              )}
              {object?.dateOfBirth && object?.showDateOfBirth && showHide?.showDateOfBirth &&(
                <>
                  <p className="cvSubTitle-ClassicBlue">Date Of Birth</p>
                  <p className="cvData-ClassicBlue">{object?.dateOfBirth}</p>
                </>
              )}
              {object?.relocation &&(
                <>
                  <p className="cvSubTitle-ClassicBlue">Condition to relocate</p>
                  <p className="cvData-ClassicBlue">{object?.relocation}</p>
                </>
              )}
            </div>
            <div className="flex justify-start flex-col">
              {(object?.email ||
                object?.phone ||
                object?.linkedin ||
                object?.github ||
                object?.dribble ||
                object?.website) && (
                <>
                  <p className="cvTitle-ClassicBlue">Contacts</p>
                  <hr className="mb-2"></hr>
                </>
              )}
              {object?.email && (
                <>
                  <p className="cvSubTitle-ClassicBlue">Email</p>
                  <p className="cvData-ClassicBlue">{object?.email}</p>{" "}
                </>
              )}
              {object?.phone && (
                <>
                  <p className="cvSubTitle-ClassicBlue">Phone number</p>
                  <p className="cvData-ClassicBlue">{object.phone}</p>
                </>
              )}
              {object?.linkedin && (
                <>
                  <p className="cvSubTitle-ClassicBlue">LinkedIn</p>
                  <p className="cvData-ClassicBlue">{object?.linkedin}</p>
                </>
              )}
              {object?.github && (
                <>
                  <p className="cvSubTitle-ClassicBlue">GitHub</p>
                  <p className="cvData-ClassicBlue">{object?.github}</p>
                </>
              )}
              {object?.dribble && (
                <>
                  <p className="cvSubTitle-ClassicBlue">Dribble</p>
                  <p className="cvData-ClassicBlue">{object?.dribble}</p>
                </>
              )}
              {object?.website && (
                <>
                  <p className="cvSubTitle-ClassicBlue">Personal Website</p>
                  <p className="cvData-ClassicBlue">{object?.website}</p>
                </>
              )}
            </div>
            {(object?.skillss &&  object?.skillss.length > 0) &&(
              <div className="flex justify-start flex-col">
                <p className="cvTitle-ClassicBlue mt-2">Skills</p>
                <hr className="mb-2"></hr>
                <ul>
                  {object?.skillss.map((skill, index) => (
                    <li className="cvSubTitle-ClassicBlue" key={index}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(object?.softSkillss && object?.softSkillss.length > 0) && (
              <div className="flex justify-start flex-col">
                <p className="cvTitle-ClassicBlue mt-2">Soft Skills</p>
                <hr className="mb-2"></hr>
                <ul>
                  {object?.softSkillss.map((skill, index) => (
                    <li className="cvSubTitle-ClassicBlue" key={index}>
                      {" "}
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(object?.langSkillss && object?.langSkillss.length > 0) &&(
              <div className="flex justify-start flex-col">
                <p className="cvTitle-ClassicBlue mt-2">Languages</p>
                <hr className="mb-2"></hr>
                <ul>
                  {object?.langSkillss.map((skill, index) => (
                    <li className="cvSubTitle-ClassicBlue" key={index}>
                      {" "}
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="col-span-2 p-3 w-full h-full text-black bg-white">
            <div className="flex justify-start flex-col">
              <h1 className="cvMainTitle-ClassicBlue">
                {object?.name} {object?.surname}
              </h1>
              {object?.desiredJob && <h2 className="cvMainSub-ClassicBlue">{object?.desiredJob}</h2>}
              {object?.bio && object?.showBio && showHide?.showBio && <p className="cvData-ClassicBlue text-justify">{object?.bio}</p>}
            </div>
            {object?.experience  && (object?.experience.length > 0) &&(
              <div>
                <h2 className="cvMainSub-ClassicBlue">Experience</h2>
                <hr className="mb-2 border-t-1 border-slate-400"></hr>
                {object?.experience.map((exp, index) => (
                  <div key={index}>
                    <div
                      className="flex flex-row justify-between pb-1"
                    >
                      <p className="cvSubTitle-ClassicBlue">{exp.title}</p>
                      <p className="cvSubTitle-ClassicBlue">{exp.years}</p>
                    </div>
                    <div>
                      <p className="cvData-ClassicBlue pb-2 text-justify">{exp.exps}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {object?.education && (object?.education.length > 0) &&(
              <div>
                <h2 className="cvMainSub-ClassicBlue">Education</h2>
                <hr className="mb-2 border-t-1 border-slate-400"></hr>
                {object?.education.map((edu, index) => (
                  <div key={index}>
                    <div
                      className="flex flex-row justify-between pb-1"
                    >
                      <p className="cvSubTitle-ClassicBlue">{edu.etitle}</p>
                      <p className="cvSubTitle-ClassicBlue">{edu.eyears}</p>
                    </div>
                    <div>
                      <p className="cvData-ClassicBlue pb-2 text-justify">{edu.edu}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default ClassicBlue;

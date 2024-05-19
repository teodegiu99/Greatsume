"use client"
import { useState, useEffect } from "react";
import { getPublicData, getDownloadData } from "@/data/getPublicData";
import { PublicSchema,  ShowHide } from "@/schemas";
import * as z from "zod";
import { forwardRef, ForwardedRef } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaDribbble } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";

type ShowHideDefault = z.infer<typeof ShowHide>;

const ElegantBlack = forwardRef(
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
        <div className="a4f text-black w-full bg-white p-6">
        <div className="flex flex-col items-center">
          {(object?.name || object?.surname) && <p className="cvMainTitle-ElegantBlack">
            {object?.name} {object?.surname}
          </p>}
          {object?.desiredJob  && <p className="font-medium text-[22px]">{object?.desiredJob}</p>}
          {object?.address && showHide?.showAddress  && <p className="cvDataTitle-ElegantBlack mb-2">{object?.address}</p>}
          {object?.dateOfBirth && showHide?.showDateOfBirth  && <p className="cvDataTitle-ElegantBlack mb-2">{object?.dateOfBirth}</p>}

          <div className="flex justify-between  w-full mb-1">
          {object?.phone  &&<p className="cvDataTitle-ElegantBlack flex gap-x-2 items-center">
              <BsFillTelephoneFill />
              {object?.phone}
            </p>}

            {object?.email  && <p className="cvDataTitle-ElegantBlack flex gap-x-2 items-center">
              <IoMail />
              {object?.email}
            </p>}
            {/* <p className="cvDataTitle-ElegantBlack">{object?.website}</p> */}
          </div>

          <hr className="border w-full border-black mb-3" />
        </div>
        {(object?.bio || object?.ral || object?.relocation ) &&<div className="cvSeparator-div-ElegantBlack">
          <p className="cvTitle-ElegantBlack">Profilo</p>
        </div>}
        <div>
        {object?.bio && showHide?.showBio && <p className="cvData-ElegantBlack mb-2">{object?.bio}</p>}
          <div className="flex justify-between  w-full">
          {object?.relocation  && <p className="cvDataTitle-ElegantBlack">
              <span className="font-medium">Condition to relocate: </span>
              {object?.relocation}
            </p>}
            {object?.ral  &&<p className="cvDataTitle-ElegantBlack mb-2">
              <span className="font-medium">Desired Ral: </span>
              {object?.ral}
            </p>}
          </div>
        </div>
        {object?.experience && object?.experience.length > 0 && <>
        <div className="cvSeparator-div-ElegantBlack">
          <p className="cvTitle-ElegantBlack">Esperienza</p>
        </div>
        {object?.experience.map((exp, index) => (
          <div key={index}>
            <div className="flex flex-row justify-between pb-1">
              <p className="cvDataTitle-ElegantBlack">{exp.title}</p>
              <p className="cvDataTitle-ElegantBlack">{exp.years}</p>
            </div>
            <div>
              <p className="cvData-ElegantBlack mb-2">{exp.exps}</p>
            </div>
          </div>
        ))}
        </>}
        {object?.education && object?.education.length > 0 && <>
        <div className="cvSeparator-div-ElegantBlack">
          <p className="cvTitle-ElegantBlack">Formazione</p>
        </div>
        {object?.education.map((edu, index) => (
          <div key={index}>
            <div className="flex flex-row justify-between pb-1">
              <p className="cvDataTitle-ElegantBlack">{edu.etitle}</p>
              <p className="cvDataTitle-ElegantBlack">{edu.eyears}</p>
            </div>
            <div>
              <p className="cvData-ElegantBlack mb-2">{edu.edu}</p>
            </div>
          </div>
        ))}</>}
        {((object?.softSkillss && object?.softSkillss.length > 0) || (object?.skillss && object?.skillss.length > 0) || (object?.langSkillss && object?.langSkillss.length > 0) || (object?.website || object?.linkedin || object?.github || object?.dribble)) && <div className="cvSeparator-div-ElegantBlack h-[28px]"></div>}
     
        {(object?.skillss && object?.skillss.length > 0) &&
        <> <div className="flex  w-full mb-2 items-center flex-wrap">
          <p className="cvSkillsTitle-ElegantBlack mr-4">Skills:</p>
          {object?.skillss.map((skill, index) => (
            <p className="cvSkills-ElegantBlack mr-4" key={index}>
              {skill}
            </p>
          ))}
        </div>
        <hr className="border-1 w-full border-gray-300 mb-3" />
        </>}
        {(object?.softSkillss && object?.softSkillss.length > 0) && <>
        <div className="flex  w-full mb-2 items-center flex-wrap">
          <p className="cvSkillsTitle-ElegantBlack mr-4">Soft skills:</p>
          {object?.softSkillss.map((skill, index) => (
            <p className="cvSkills-ElegantBlack" key={index}>
              {skill}
            </p>
          ))}
        </div>
        <hr className="border-1 w-full  border-gray-300 mb-3" />
</> }
{(object?.langSkillss && object?.langSkillss.length > 0) && <>
        <div className="flex  w-full mb-2 items-center flex-wrap ">
          <p className="cvSkillsTitle-ElegantBlack mr-4">Lingue:</p>

          {object?.langSkillss.map((skill, index) => (
            <p className="cvSkills-ElegantBlack" key={index}>
              {skill}
            </p>
          ))}
        </div>
        <hr className="border-1 w-full border-gray-300 mb-3" />
        </>}
        <div className="flex w-full mb-2 items-center flex-wrap">
          {(object?.website || object?.dribble || object?.github || object?.linkedin) &&<p className="cvSkillsTitle-ElegantBlack mr-4">
            Profili professionali:
          </p>}
          {object?.website && <p className="cvSkills-ElegantBlack flex items-center mr-4">
            <CgWebsite />
            &nbsp;{object?.website}
          </p>}
          {object?.linkedin &&<p className="cvSkills-ElegantBlack flex items-center mr-4">
            <FaLinkedin />
            &nbsp;{object?.linkedin}
          </p>}
         {object?.github && <p className="cvSkills-ElegantBlack flex items-center mr-4">
            <FaGithub />
            &nbsp;{object?.github}
          </p>}
          {object?.dribble && <p className="cvSkills-ElegantBlack flex items-center">
            <FaDribbble />
            &nbsp;{object?.dribble}
          </p>}
        </div>
      </div>
      </div>
    );
  }
);

export default ElegantBlack;

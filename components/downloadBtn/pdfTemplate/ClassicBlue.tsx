import { useState, useEffect } from "react";
import { getPublicData, getDownloadData } from "@/data/getPublicData";
import { PublicSchema } from "@/schemas";
import * as z from "zod";
import { forwardRef, ForwardedRef } from "react";

const ClassicBlue = forwardRef(
  (
    props: { btnLocation: string; publicLink: string },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [object, setObject] = useState<Partial<z.infer<typeof PublicSchema>>>(
      {}
    );

    useEffect(() => {
      console.log(props.publicLink);
      const fetchData = async () => {
        try {
          if (props.btnLocation === "public" && props.publicLink) {
            const data = await getPublicData(props.publicLink);
            if (data) {
              setObject(data);
              console.log("datahhh", data);
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
      console.log("DOWNLOAD", object);
    }, [props.btnLocation, props.publicLink]);

    return (
      <div ref={ref}>
        <div className=" flex justify-center  items-center h-full">
      {/* <p>{object.address}</p> */}

      <div className="a4s  ">
        <div className="grid grid-cols-3 h-full">
          <div className="col-span-1 bg-[#1c2863] p-3 w-full">
           {object?.image && object?.showImage  &&
            <div className="flex justify-center w-full mb-4">
              <img
                id="cvImage"
                className="max-w-[75%] rounded-full"
                src={`${object?.image}`}
              />
            </div>}

            <div className="flex justify-start flex-col">
              {(object?.address || object?.dateOfBirth)  && (
                <>
                  <p className="cvTitle">Personal Information</p>
                  <hr className="mb-2"></hr>
                </>
              )}
              {object?.address && object?.showAddress &&(
                <>
                  <p className="cvSubTitle">Address</p>
                  <p className="cvData">{object?.address}</p>
                </>
              )}
              {object?.dateOfBirth && object?.showDateOfBirth  &&(
                <>
                  <p className="cvSubTitle">Date Of Birth</p>
                  <p className="cvData">{object?.dateOfBirth}</p>
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
                  <p className="cvTitle">Contacts</p>
                  <hr className="mb-2"></hr>
                </>
              )}
              {object?.email && (
                <>
                  <p className="cvSubTitle">Email</p>
                  <p className="cvData">{object?.email}</p>{" "}
                </>
              )}
              {object?.phone && (
                <>
                  <p className="cvSubTitle">Phone number</p>
                  <p className="cvData">{object.phone}</p>
                </>
              )}
              {object?.linkedin && (
                <>
                  <p className="cvSubTitle">LinkedIn</p>
                  <p className="cvData">{object?.linkedin}</p>
                </>
              )}
              {object?.github && (
                <>
                  <p className="cvSubTitle">GitHub</p>
                  <p className="cvData">{object?.github}</p>
                </>
              )}
              {object?.dribble && (
                <>
                  <p className="cvSubTitle">Dribble</p>
                  <p className="cvData">{object?.dribble}</p>
                </>
              )}
              {object?.website && (
                <>
                  <p className="cvSubTitle">Personal Website</p>
                  <p className="cvData">{object?.website}</p>
                </>
              )}
            </div>
            {(object?.skillss &&  object?.skillss.length > 0) &&(
              <div className="flex justify-start flex-col">
                <p className="cvTitle mt-2">Skills</p>
                <hr className="mb-2"></hr>
                <ul>
                  {object?.skillss.map((skill, index) => (
                    <li className="cvSubTitle" key={index}>
                      - {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(object?.softSkillss && object?.softSkillss.length > 0) && (
              <div className="flex justify-start flex-col">
                <p className="cvTitle mt-2">Soft Skills</p>
                <hr className="mb-2"></hr>
                <ul>
                  {object?.softSkillss.map((skill, index) => (
                    <li className="cvSubTitle" key={index}>
                      {" "}
                      - {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(object?.langSkillss && object?.langSkillss.length > 0) &&(
              <div className="flex justify-start flex-col">
                <p className="cvTitle mt-2">Languages</p>
                <hr className="mb-2"></hr>
                <ul>
                  {object?.langSkillss.map((skill, index) => (
                    <li className="cvSubTitle" key={index}>
                      {" "}
                      - {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="col-span-2 p-3 w-full h-full text-black">
            <div className="flex justify-start flex-col">
              <h1 className="cvMainTitle">
                {object?.name} {object?.surname}
              </h1>
              {object?.desiredJob && <h2 className="cvMainSub">{object?.desiredJob}</h2>}
              {object?.bio && object?.showBio &&  <p className="cvData text-justify">{object?.bio}</p>}
            </div>
            {object?.experience  && (object?.experience.length > 0) &&(
              <div>
                <h2 className="cvMainSub">Experience</h2>
                <hr className="mb-2 border-t-1 border-slate-400"></hr>
                {object?.experience.map((exp, index) => (
                  <div key={index}>
                    <div
                      className="flex flex-row justify-between pb-1"
                    >
                      <p className="cvSubTitle">{exp.title}</p>
                      <p className="cvSubTitle">{exp.years}</p>
                    </div>
                    <div>
                      <p className="cvData pb-2 text-justify">{exp.exps}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {object?.education && (object?.education.length > 0) &&(
              <div>
                <h2 className="cvMainSub">Education</h2>
                <hr className="mb-2 border-t-1 border-slate-400"></hr>
                {object?.education.map((edu, index) => (
                  <div key={index}>
                    <div
                      className="flex flex-row justify-between pb-1"
                    >
                      <p className="cvSubTitle">{edu.etitle}</p>
                      <p className="cvSubTitle">{edu.eyears}</p>
                    </div>
                    <div>
                      <p className="cvData pb-2 text-justify">{edu.edu}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
      </div>
    );
  }
);

export default ClassicBlue;

'use client'
import { TemplateBaseProps } from "@/types/template";

export const ClassicBlueBase: React.FC<TemplateBaseProps> = ({ data, showHide }) => {
  return (

       <div className="grid grid-cols-3 h-full w-full min-h-full">
      <div className="col-span-1 bg-[#1c2863] p-3 w-full text-white">
            {data?.image && showHide?.showImage && (
              <div className="flex justify-center w-full mb-4">
                <img
                  id="cvImage"
                  className="max-w-[75%] rounded-full"
                  src={`${data?.image}`}
                />
              </div>
            )}

            <div className="flex justify-start flex-col">
              {(data?.address || data?.dateOfBirth) && (
                <>
                  <p className="cvTitle-ClassicBlue ">Personal Informations</p>
                  <hr className="mb-2"></hr>
                </>
              )}
              {data?.address && showHide?.showAddress && (
                <>
                  <p className="cvSubTitle-ClassicBlue ">Address</p>
                  <p className="cvData-ClassicBlue ">{data?.address}</p>
                </>
              )}
              {data?.dateOfBirth && showHide?.showDateOfBirth && (
                <>
                  <p className="cvSubTitle-ClassicBlue ">Date Of Birth</p>
                  <p className="cvData-ClassicBlue ">{data?.dateOfBirth}</p>
                </>
              )}
              {data?.relocation && (
                <>
                  <p className="cvSubTitle-ClassicBlue ">Condition to relocate</p>
                  <p className="cvData-ClassicBlue ">{data?.relocation}</p>
                </>
              )}
            </div>
            <div className="flex justify-start flex-col">
              {(data?.email ||
                data?.phone ||
                data?.linkedin ||
                data?.github ||
                data?.dribble ||
                data?.website) && (
                <>
                  <p className="cvTitle-ClassicBlue ">Contacts</p>
                  <hr className="mb-2"></hr>
                </>
              )}
              {data?.email && (
                <>
                  <p className="cvSubTitle-ClassicBlue ">Email</p>
                  <p className="cvData-ClassicBlue ">{data?.email}</p>{" "}
                </>
              )}
              {data?.phone && (
                <>
                  <p className="cvSubTitle-ClassicBlue ">Phone number</p>
                  <p className="cvData-ClassicBlue ">{data?.phone}</p>
                </>
              )}
              {data?.linkedin && (
                <>
                  <p className="cvSubTitle-ClassicBlue ">LinkedIn</p>
                  <p className="cvData-ClassicBlue ">{data?.linkedin}</p>
                </>
              )}
              {data?.github && (
                <>
                  <p className="cvSubTitle-ClassicBlue ">GitHub</p>
                  <p className="cvData-ClassicBlue ">{data?.github}</p>
                </>
              )}
              {data?.dribble && (
                <>
                  <p className="cvSubTitle-ClassicBlue ">Dribble</p>
                  <p className="cvData-ClassicBlue ">{data?.dribble}</p>
                </>
              )}
              {data?.website && (
                <>
                  <p className="cvSubTitle-ClassicBlue ">Personal Website</p>
                  <p className="cvData-ClassicBlue ">{data?.website}</p>
                </>
              )}
            </div>
            {data?.skillss && data?.skillss.length > 0 && (
              <div className="flex justify-start flex-col">
                <p className="cvTitle-ClassicBlue mt-2">Skills</p>
                <hr className="mb-2"></hr>
                <ul>
                  {data?.skillss.map((skill, index) => (
                    <li className="cvSubTitle-ClassicBlue " key={index}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data?.softSkillss && data?.softSkillss.length > 0 && (
              <div className="flex justify-start flex-col">
                <p className="cvTitle-ClassicBlue mt-2">Soft Skills</p>
                <hr className="mb-2"></hr>
                <ul>
                  {data?.softSkillss.map((skill, index) => (
                    <li className="cvSubTitle-ClassicBlue " key={index}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data?.langSkillss && data?.langSkillss.length > 0 && (
              <div className="flex justify-start flex-col">
                <p className="cvTitle-ClassicBlue mt-2">Languages</p>
                <hr className="mb-2"></hr>
                <ul>
                  {data?.langSkillss.map((skill, index) => (
                    <li className="cvSubTitle-ClassicBlue " key={index}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="col-span-2 p-3 w-full h-full bg-white text-black">
            <div>
              <div className="flex justify-start flex-col">
              {(data?.name || data?.surname) &&<h1 className="cvMainTitle-ClassicBlue ">
                  {data?.name} {data?.surname}
                </h1>}
                {data?.desiredJob && (
                  <h2 className="cvMainSub-ClassicBlue ">{data?.desiredJob}</h2>
                )}
                {data?.bio && showHide?.showBio &&(
                  <p className="cvData-ClassicBlue  text-justify">{data?.bio}</p>
                )}
              </div>


              
              {data?.experience && data?.experience.length > 0 && (
                <div>
                  <h2 className="cvMainSub-ClassicBlue">Experience</h2>
                  <hr className="mb-2 border-t-1 border-slate-400"></hr>
                  {data?.experience.map((exp, index) => (
      
        <div key={index} className="paginate-item mb-4">
          <div className="flex flex-row justify-between pb-1">
            <p className="cvSubTitle-ClassicBlue ">{exp.title}</p>
            <p className="cvSubTitle-ClassicBlue ">{exp.years}</p>
          </div>
          <div>
            <p className="cvData-ClassicBlue  pb-2 text-justify">{exp.exps}</p>
          </div>
        </div>
      
    ))}
                </div>
              )}




              {data?.education && data?.education.length > 0 && (
                <div>
                  <h2 className="cvMainSub-ClassicBlue">Education</h2>
                  <hr className="mb-2 border-t-1 border-slate-400"></hr>
                  {data?.education.map((edu, index) => (
                    <div key={index} className="paginate-item mb-4">
                      <div className="flex flex-row justify-between pb-1">
                        <p className="cvSubTitle-ClassicBlue ">{edu.etitle}</p>
                        <p className="cvSubTitle-ClassicBlue ">{edu.eyears}</p>
                      </div>
                      <div>
                        <p className="cvData-ClassicBlue  pb-2 text-justify">{edu.edu}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
 
  );
};




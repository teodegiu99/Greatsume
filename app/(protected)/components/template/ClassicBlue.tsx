"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";

const ClassicBlue = () => {
  const object = useSelector((state: RootState) => state.updateValues);

  return (
    <div className="h-full flex justify-center items-center">
      {/* <p>{object.address}</p> */}

      <div className="a4 shadow-lg">
        <div className="grid grid-cols-3 h-full">
          <div className="col-span-1 bg-[#1c2863] p-3 w-full h-full">
            <div className="flex justify-center w-full mb-4">
              <img
                id="cvImage"
                className="max-w-[75%]"
                src={`${object.image}`}
              />
              {/* <p>${object.image}</p> */}
            </div>
            <div className="flex justify-start flex-col">
              <p className="cvTitle">Contacts</p>
              <hr className="mb-2"></hr>
              <p className="cvSubTitle">Email</p>
              <p className="cvData">{object.email}</p>
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
                  <li key={index}> - {skill}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-start flex-col">
              <p className="cvTitle mt-2">Soft Skills</p>
              <hr className="mb-2"></hr>
              <ul>
                {object.softSkillss.map((skill, index) => (
                  <li key={index}> - {skill}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-start flex-col">
              <p className="cvTitle mt-2">Languages</p>
              <hr className="mb-2"></hr>
              <ul>
                {object.langSkillss.map((skill, index) => (
                  <li key={index}> - {skill}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-2"></div>
        </div>
      </div>
    </div>
  );
};

export default ClassicBlue;

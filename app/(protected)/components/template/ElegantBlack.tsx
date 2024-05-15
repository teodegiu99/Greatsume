"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";

const ElegantBlack = () => {
  const object = useSelector((state: RootState) => state.updateValues);

  return (
    <div className="h-full w-full flex justify-center overflow-auto scrollbar-hide">
      {/* <p>{object.address}</p> */}

      <div className="a4f h-full text-black w-full">
        <div className="flex flex-col items-center">
          <p>
            {object.name} {object.surname}
          </p>
          <p>{object.address}</p>
          <div className="flex justify-between  w-full">
            <p>{object.email}</p>
            <p>{object.phone}</p>
            <p>{object.website}</p>
          </div>
        </div>
        <hr />
        <div className=" bg-red-500 flex w-full justify-center">
          <p>Profile</p>
        </div>
        <div>
          <p>{object.bio}</p>
          <div className="flex justify-between  w-full">
            <p>Condition to relocate: {object.relocation}</p>
            <p>Desired Ral: {object.ral}</p>
          </div>
        </div>
        <div className=" bg-red-500 flex w-full justify-center">
          <p>Experience</p>
        </div>
        {object.experience.map((exp, index) => (
          <div key={index}>
            <div className="flex flex-row justify-between pb-1">
              <p className="">{exp.title}</p>
              <p className="">{exp.years}</p>
            </div>
            <div>
              <p className="">{exp.exps}</p>
            </div>
          </div>
        ))}
        <div className=" bg-red-500 flex w-full justify-center">
          <p>Education</p>
        </div>
        {object.education.map((edu, index) => (
          <div key={index}>
            <div className="flex flex-row justify-between pb-1">
              <p className="">{edu.etitle}</p>
              <p className="">{edu.eyears}</p>
            </div>
            <div>
              <p className="  pb-2 text-justify">{edu.edu}</p>
            </div>
          </div>
        ))}
		   <div className=" bg-red-500 flex w-full justify-between">
          <p>Skills</p>
		  <p>Soft Skills</p>

        </div>
		<div className="grid grid-cols-2">
			<div>
			{object.skillss.map((skill, index) => (
                    <p className="mr-4" key={index}>
                      {skill}
					  </p>
                  ))}
			</div>
                <div>
				{object.softSkillss.map((skill, index) => (
                    <p className="mr-4" key={index}>
                      {skill}
					  </p>
                  ))}
				</div>
              </div>
			  
      </div>
    </div>
  );
};
export default ElegantBlack;

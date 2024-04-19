"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";

const Anglo = () => {
    const object = useSelector((state: RootState) => state.updateValues);

    return (
        <div className="h-full flex justify-center items-center">
          {/* <p>{object.address}</p> */}
    
          <div className="a4">
            <div className="grid grid-cols-3 h-full">
              <div className="col-span-1  p-5 w-full h-full">
                  <div className="w-[75%]">
                    <img id="cvImage" src={`${object.image}`} />
                    {/* <p>${object.image}</p> */}
          <p>{object.bio}</p>
    
                  </div>
              </div>
              <div className="col-span-2">
                
              </div>
            </div>
          </div>
        </div>
      );
  
}

export default Anglo

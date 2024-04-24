import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { IoIosDocument } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { TbTemplate } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { setValue } from "@/app/state/values/mobileSlice";


const BottomBar = () => {
    const [active, setActive] = useState<string>("data");
	
    const dispatch = useDispatch();

    return (
        <div className="grid grid-cols-3 justify-center items-center h-10 w-[100dwh]">
            <div className="col-span-1 ">
                <Button
                    variant={active === "data" ? "default" : "outline"}
                    onClick={() => {
                        setActive("data");
						dispatch(setValue("TopBar"));

                    }}
					className="w-full py-2 text-center rounded-none flex flex-row items-center gap-x-1"

                >
                    <IoIosDocument className="text-xl" />
                    Data
                </Button>
            </div>
            <div className="col-span-1  ">
                <Button
                    variant={active === "resume" ? "default" : "outline"}
                    onClick={() => {
                        setActive("resume");
						dispatch(setValue("CvHandler"));
                    }}
					className="w-full py-2  text-center rounded-none flex flex-row items-center gap-x-1"
                >
                    <ImProfile className="text-xl" />
                    CV
                </Button>
            </div>
            <div className="col-span-1 flex flex-row items-center gap-x-1">
                <Button
                    variant={active === "template" ? "default" : "outline"}
                    onClick={() => {
                        setActive("template");
						dispatch(setValue("TemplateCarousel"));
                    }}
					className="w-full py-2 text-center rounded-none flex flex-row items-center gap-x-1"

                >
                    <TbTemplate className="text-xl" />
                    Template
                </Button>
            </div>
        </div>
    );
};

export default BottomBar;

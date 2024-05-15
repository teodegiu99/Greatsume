"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CiCircleInfo } from "react-icons/ci";
import { HiTemplate } from "react-icons/hi";
import { GrDocumentText } from "react-icons/gr";
import { FaShareAlt } from "react-icons/fa";

export function Features() {
  return (
 
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full mb-8">
     <div className="lg:col-span-1 col-span-3 p-8 border-2 shadow-2xl w-full h-full rounded-2xl relative overflow-hidden">
  <h5 className="text-neutral-700 dark:text-neutral-200 text-3xl md:text-4xl lg:text-5xl font-semibold text-start relative z-10">
    <span className="text-violet-600 z-[80]">Change</span> your resume{" "}
    <span className="text-violet-600 z-[80]">design</span> without rewriting all
    your infos
  </h5>
  <HiTemplate className="absolute size-96 bottom-[-100px] right-[-80px] -rotate-45 z-0 text-violet-600 opacity-10" />
</div>
      <div className="lg:col-span-2  col-span-3  p-8 border-2 shadow-2xl w-full h-full rounded-2xl relative overflow-hidden">
        <div className="absolute top-2 right-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CiCircleInfo className="text-xl" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <h5 className="text-neutral-700 dark:text-neutral-200  text-3xl md:text-4xl lg:text-5xl font-bold text-start uppercase mb-2">
          Ats <span className="text-violet-600">proof</span>
        </h5>
        <p className="text-xl text-neutral-700 font-medium">
          Greatsume ensures ATS-proof CVs, crucial for modern job applications.
          With <span className="text-violet-600">optimized formatting</span> and
          relevant keywords, candidates stand out in Applicant Tracking Systems,
          enhancing their chances of human review and job success.
        </p>
        <GrDocumentText className="absolute size-96 bottom-[-80px] right-[-50px] -rotate-45 z-0 text-violet-600 opacity-10" />

      </div>
      <div className="col-span-3 p-8 border-2 shadow-2xl w-full h-full rounded-2xl relative overflow-hidden">
        <h5 className="text-neutral-700 dark:text-neutral-200  text-3xl md:text-4xl lg:text-5xl font-bold text-start uppercase mb-2">Generate a link to <span className="text-violet-600">share your resume</span></h5>
        <p className="text-xl text-neutral-700 font-medium">
          Hide your personal info with  <span className="text-violet-600"> just a click!</span> No need to edit you resume
        </p>
        <FaShareAlt className="absolute size-48 bottom-[-40px] right-[-50px] -rotate-180 z-0 text-violet-600 opacity-10" />
      </div>
    </div>
  );
}

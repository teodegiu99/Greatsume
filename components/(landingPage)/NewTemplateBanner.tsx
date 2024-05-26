import React from 'react'
import { Button } from '../ui/button'
import { MdWorkOutline } from "react-icons/md";
import { useRouter } from "next/navigation";

const NewTemplateBanner = () => {
  const router = useRouter();

  return (
    <div className="grid bg-violet-600 grid-cols-1 lg:grid-cols-3   justify-start h-full p-8  max-w-7xl mx-auto mt-8 mb-4 rounded-2xl relative shadow-2xl overflow-hidden">
      <div className='col-span-1 lg:py-10 mb-8 lg:mb-0'>
      <h5 className='text-[#f8f8ff] text-4xl md:text-5xl lg:text-6xl font-bold text-start uppercase'>New template every week</h5>
      </div>
      <div className='col-span-2 flex flex-col justify-center items-center  p-8 bg-[#f8f8ff] rounded-2xl shadow-2xl relative'>
      <p className="text-3xl text-neutral-700 font-medium">Stand out in today&rsquo;s competitive job market</p>
      <Button className='text-white bg-gradient-to-r from-violet-600 to-indigo-600 text-2xl px-6 py-6 mt-8 rounded-md hover:from-violet-700 hover:to-indigo-700 hover:scale-110 shadow-2xl' onClick={() => router.push("/auth/register")}>
        Start now 🚀
      </Button>
      <MdWorkOutline className="absolute size-96 bottom-[-130px] right-[-50px]  z-0 text-violet-600 opacity-10" />
      <div>
      </div>
    </div>
    </div>
  )
}

export default NewTemplateBanner

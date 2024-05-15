import React from 'react'


interface Card {
    id: number;
    title: string;
    sub: string;
  }
  
const NextFeatures: React.FC= () => {
    const cards: Card[] = [
        {
            id: 0,
            title: "Multi language support",
            sub: "Seamless support for multiple languages and automatic CV translation. Stay ahead in the global job market effortlessly!",
        },
        {
            id: 1,
            title: "AI generated cover letter ",
            sub: "AI generated Cover Letters based on your CV and job listing. Effortlessly tailor your applications for each opportunity, maximizing your chances of success!",
        },
        {
            id: 2,
            title: "Multi format file download",
            sub: " Seamlessly download your CV in various file formats, catering to different application requirements with ease. Enhance your adaptability and stand out in every opportunity!",
        },
        {
            id: 3,
            title: "More customization options",
            sub: "Tailor your CV to perfection with a wide range of design choices, fonts, colors, and layouts. Unleash your creativity and make a lasting impression in every application!",
        },
    
      ];


    return (
    <div className='p-8 border-2 shadow-2xl max-w-7xl mx-auto w-full h-full mt-8 rounded-2xl'>
      <h5 className='py-4 text-neutral-700 dark:text-neutral-200  text-3xl md:text-4xl lg:text-5xl font-bold text-start uppercase mb-2'>Unlock global opportunities with our upcoming features 🔜</h5>
      <div className="overflow-x-auto border-2 p-4 rounded-2xl bg-violet-600 scrollbar-hide">
      <div className="flex space-x-6">
        {cards.map((card) => (
          <div key={card.id} className="gap-x-4 border-2 p-4 rounded-2xl shadow-2xl bg-white">
            <div className=" w-full min-w-56 min-h-56">
             <h3 className='text-2xl text-left text-neutral-700 font-medium'>{card.title}</h3>
            <p className="text-lg text-left mt-2  text-neutral-700">{card.sub}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default NextFeatures



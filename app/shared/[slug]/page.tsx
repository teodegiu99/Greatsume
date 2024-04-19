import { getPublicTemplate } from "@/actions/getPublicTemplate";

// import ShowHide from '../components/ShowHide'
import PublicCvHandler from "../components/PublicCvHandler";
import ShowHide from "../components/ShowHide";

const page = async ({ params }: { params: { slug: string } }) => {
  const template = await getPublicTemplate(params.slug);

  return (
    // <Provider store={store}>

    <div className="grid grid-cols-4 h-full">
      <div className="cols-span-1 bg-[#f8f8ff] overflow-auto scrollbar-hide shadow-2xl ">
        {/* <ShowHide />  */}
        {`${params.slug}`}
        {`${template}`}
        <div className="block p-5">
          <h1 className=" font-semibold text-3xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Share your resume
          </h1>
          <p className="font-regular text-lg text-slate-700">
            Generate your public link, but share only what you want!
          </p>
        </div>
        <hr className="border-1 border-slate-300" />
        <ShowHide publicLink={params.slug}/>
      </div>
      <div className="col-span-3 overflow-auto scrollbar-hide text-white">
        {template != null && (
          <PublicCvHandler
            selectedTemplate={template}
            publicLink={params.slug}
          />
        )}{" "}
        {/* Passa il template solo se non è null */}
      </div>
    </div>
    // </Provider>
  );
};

export default page;

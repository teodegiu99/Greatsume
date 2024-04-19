"use server"
import { auth } from "@/auth";
import { db } from "@/lib/db";

interface FormData {
    showImage: boolean;
    showAddress: boolean;
    showDateOfBirth: boolean;
    showBio: boolean;
    template: string;
  }

export const ShowHideUpdate = async (values: FormData) => {
	const session = await auth();
	const id = session?.user.id
    if (id) {
        await db.public.upsert({
          where: { userId: id },
          update: {
            showImage: values.showImage,
            showAddress: values.showAddress,
            showBio: values.showBio,
            showDateOfBirth: values.showDateOfBirth,
            cvTemplate:values.template,
          },
          create: {
            userId: id,
            showImage: values.showImage,
            showAddress: values.showAddress,
            showBio: values.showBio,
            showDateOfBirth: values.showDateOfBirth,
            cvTemplate:values.template,
        },
    });
  }
}


export const getShowHideOptions = async () => {
    const session = await auth();
	const id = session?.user.id
	try {
		const showHide = await db.public.findFirst({ where: { userId: id } });

		return showHide;
	} catch {
		return null;
	}
};


export const getShowHidePublicOptions = async (publicLink: string) => {

try {
  const showHide = await db.public.findFirst({ where: { publicLink: publicLink } });

  return showHide;
} catch {
  return null;
}
};
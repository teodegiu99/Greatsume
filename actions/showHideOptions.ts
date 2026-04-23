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

interface ShowHideValues {
  showBio: boolean;
  showAddress: boolean;
  showDateOfBirth: boolean;
  showImage: boolean;
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


export const updateShowHideOptions = async (values: ShowHideValues) => {
  // 1. Recuperiamo l'utente loggato
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    return { error: "Non autorizzato" };
  }

  // 2. Aggiorniamo il database
  try {
    await db.public.update({
      where: { userId: user.id },
      data: {
        showBio: values.showBio,
        showAddress: values.showAddress,
        showDateOfBirth: values.showDateOfBirth,
        showImage: values.showImage,
        cvTemplate: values.template, // Mappiamo "template" sul nome corretto nel DB
      },
    });

    return { success: "Impostazioni aggiornate con successo!" };
  } catch (error) {
    console.error("Errore updateShowHide:", error);
    return { error: "Si è verificato un errore durante il salvataggio." };
  }
};
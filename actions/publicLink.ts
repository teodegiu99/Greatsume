"use server"
import { auth } from "@/auth";
import { db } from "@/lib/db";

export const savePublicLink = async (publicLink: string) => {
	const session = await auth();
	const id = session?.user.id
    if (id) {
        await db.public.upsert({
          where: { userId: id },
          update: {
            publicLink: publicLink,
          },
          create: {
            userId: id,
            publicLink: publicLink,
        },
    });
  }
}
export const deletePublicLink = async () => {
	const session = await auth();
	const id = session?.user.id
    if (id) {
        await db.public.update({
          where: { userId: id },
        data: {
            publicLink: null,
        },
    })
}
}

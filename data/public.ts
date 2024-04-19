"use server"
import { auth } from "@/auth";
import {db} from "@/lib/db"

export const getPublic = async () => {
    const session = await auth();
	const id = session?.user.id
	try {
		const publicObject = await db.public.findFirst({ where: { userId: id } });

		return publicObject;
	} catch {
		return null;
	}
};
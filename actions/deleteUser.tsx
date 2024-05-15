"use server"
import { auth } from "@/auth";
import { db } from "@/lib/db";

export const deleteUser = async () => {
	const session = await auth();
	const id = session?.user.id
    if (id) {
        await db.user.delete({
          where: { id: id }
    })
}
}
"use server"
import {db} from "@/lib/db"

export const getPublicTemplate = async (publicLink?: string) => {

	try {
		const result = await db.public.findFirst({
			select: {
			    cvTemplate: true // Seleziona solo il campo 'template'
			},
			where: {
				publicLink: publicLink // Filtra per il publicLink specificato
			}
		});

        
        return result ? result.cvTemplate : null; // Restituisci solo il campo 'template' se presente nel record, altrimenti restituisci null

	} catch {
		return null;
	}
};
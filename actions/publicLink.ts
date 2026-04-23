"use server"
import { auth } from "@/auth";
import { db } from "@/lib/db";


export const savePublicLink = async () => {
  // 1. Recupera la sessione dal server
  const session = await auth();
  const user = session?.user;

  // 2. Controlla se l'utente esiste (se è loggato)
  if (!user) return { error: "Non autorizzato" };

  // 3. Genera la stringa unica nel backend
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let generatedString = "";
  for (let i = 0; i < 9; i++) {
      generatedString += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  // 4. Salva il link nel DB associato a questo utente
  try {
    await db.public.update({
      where: { userId: user.id },
      data: { publicLink: generatedString }
    });

    // 5. Ritorna lo slug al frontend
    return { slug: generatedString };
    
  } catch (error) {
    return { error: "Errore durante il salvataggio del link" }
  }
};
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

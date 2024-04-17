"use server";
import { FormSchema } from "@/schemas";
import * as z from "zod";
import { auth } from "@/auth";
import { updateBio, updateContact, updateImage, updatePersonal, updateSkills, updateWorkEdu } from "./resumeFieldUpdate";


export const imgResume = async (compressedImage: string) => {
	const session = await auth();
	const id = session?.user.id
	await updateImage(id, compressedImage)
}


export const resume = async (values: z.infer<typeof FormSchema>) => {
	const session = await auth();

	const id = session?.user.id
    const validatedFields = FormSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields" };
	}


//il check per il controllo dell'empty potrebbe causare problemi con il delete dei field

	const {name, surname, address, dateOfBirth, relocation} = validatedFields.data;
	console.log("RESUME=",relocation, relocation,relocation)
		// if (notEmpty(name, surname, address, dateOfBirth)){
			await updatePersonal(id, name, surname, address, dateOfBirth, relocation)
			// }

	const {email, phone, linkedin, github, dribble, website} = validatedFields.data;
	// if (notEmpty(email, phone, linkedin, github, dribble, website)){
		await updateContact(id, email, phone, linkedin, github, dribble, website)
		// }

	const {bio, desiredJob, ral} = validatedFields.data;
	// if (notEmpty(bio, desiredJob, ral)){
		await updateBio(id, bio, desiredJob, ral)
		// }


	const {skillss, softSkillss, langSkillss} = validatedFields.data;

	// if ((skillss && skillss?.length > 0) || (softSkillss && softSkillss?.length > 0)){
		await updateSkills(id, skillss, softSkillss, langSkillss)
		// }

	

	const {experience, education} = validatedFields.data;
		removeEmptyEducation(education);
		removeEmptyExperience(experience);
		// if ((experience && experience?.length > 0) || (education && education?.length > 0)){
			await updateWorkEdu(id, experience, education)
		// }



  console.log(validatedFields)
  
}

const notEmpty = (...variables: (string | null | undefined)[]): boolean => {
    for (const variable of variables) {
		if (Array.isArray(variable) && variable.length > 0) {
            return true; 
        }

		else if (typeof variable === 'string' && variable.trim() !== '') {
            return true; // Se la stringa non è vuota, restituisci true
        }
    }
    return false;
};

const removeEmptyExperience = (experience: { years: string; exps: string; title: string }[] | undefined): void => {
    if (!experience) {
        return; // Se l'array experience è undefined o null, non c'è nulla da rimuovere
    }

    const filteredExperience = experience.filter(exp => exp.years.trim() !== '' || exp.exps.trim() !== '' || exp.title.trim() !== '');

    experience.splice(0, experience.length, ...filteredExperience);
};

const removeEmptyEducation = (education: { eyears: string; edu: string; etitle: string; }[] | undefined): void => {
    if (!education) {
        return; // Se l'array experience è undefined o null, non c'è nulla da rimuovere
    }

    const filteredEducation = education.filter(exp => exp.eyears.trim() !== '' || exp.edu.trim() !== '' || exp.etitle.trim() !== '');

    education.splice(0, education.length, ...filteredEducation);
};


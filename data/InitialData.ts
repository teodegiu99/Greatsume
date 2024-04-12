"use server"
import {db} from "@/lib/db"
import { auth } from "@/auth";


export const getInitialData = async () => {
	const session = await auth();

	const userId = session?.user.id
	try {
		const personal = await db.personal.findUnique({where: {userId}});
		const contact = await db.contact.findUnique({where: {userId}});
		const bio = await db.bio.findUnique({where: {userId}});
		const skills = await db.skills.findUnique({where: {userId}});
		const workedu = await db.workedu.findUnique({where: {userId}});

		const experience = workedu?.experience.map((exp, index) => ({
			exps: exp,
			years: workedu?.experienceYears[index]
		  })) || [];

		  const education = workedu?.education.map((edu, eindex) => ({
			edu: edu,
			eyears: workedu?.educationYears[eindex]
		  })) || [];

		const iValues= {
			name: personal?.name,
			surname: personal?.surname,
			address: personal?.address,
			dateOfBirth: personal?.dateOfBirth,
			relocation: personal?.relocation,
			email: contact?.email,
			phone: contact?.phone,
			linkedin: contact?.linkedin,
			github: contact?.github,
			dribble: contact?.dribble,
			website: contact?.website,
			bio: bio?.bio,
			desiredJob: bio?.desiredJob,
			ral: bio?.desiredRal,
			skillss: skills?.hardSkills,
			softSkillss: skills?.softSkills,
			langSkillss: skills?.languages,
			experience: experience,
			education: education
		};
// console.log("GET GET GET GET GET GET ",iValues)
		return iValues;
	} catch {
		return null;
	}
};
"use server";
import { db } from "@/lib/db";


export const getUserIdByPublicLink = async (publicLink?: string) => {

	try {
		const result = await db.public.findFirst({
			select: {
			    userId: true // Seleziona solo il campo 'template'
			},
			where: {
				publicLink: publicLink // Filtra per il publicLink specificato
			}
		});

        
        return result ? result.userId : null; // Restituisci solo il campo 'template' se presente nel record, altrimenti restituisci null

	} catch {
		return null;
	}
};
export const getPublicData = async (publicLink: string) => {

   const userId = await getUserIdByPublicLink(publicLink)
  if (userId) {
  try {
    const personal = await db.personal.findUnique({ where: { userId } });
    const contact = await db.contact.findUnique({ where: { userId } });
    const bio = await db.bio.findUnique({ where: { userId } });
    const skills = await db.skills.findUnique({ where: { userId } });
    const workedu = await db.workedu.findUnique({ where: { userId } });
    const profilePic = await db.profilePic.findUnique({ where: { userId } });
    const showHide = await db.public.findUnique({ where: { userId } });
    const experience =
      workedu?.experience.map((exp, index) => ({
        exps: exp,
        title: workedu?.experienceTitle[index],
        years: workedu?.experienceYears[index],
      })) || [];

    const education =
      workedu?.education.map((edu, eindex) => ({
        edu: edu,
        etitle: workedu?.educationTitle[eindex],
        eyears: workedu?.educationYears[eindex],
      })) || [];

    const publicData = {
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
      education: education,
      image: profilePic?.image,
      showImage: showHide?.showImage,
      showBio: showHide?.showBio,
      showDateOfBirth: showHide?.showDateOfBirth,
      showAddress: showHide?.showAddress,
    };

    return publicData;
  } catch {
    return null;
  }
}
else{
    return null
}
};

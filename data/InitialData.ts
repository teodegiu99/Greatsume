"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export const getImage = async () => {
  try {
    const session = await auth();
    const userId = session?.user.id;
    const profilePic = await db.profilePic.findUnique({ where: { userId } });
    const Image = profilePic?.image;
    return Image;
  } catch {
    return null;
  }
};

export const getTemplate = async () => {
  try {
    const session = await auth();
    const userId = session?.user.id;
    const cvTemplate = await db.public.findUnique({ where: { userId } });
    const template = cvTemplate?.cvTemplate
    return template;
  } catch {
    return null;
  }
};

export const getInitialData = async () => {
  const session = await auth();

  const userId = session?.user.id;
  try {
    const personal = await db.personal.findUnique({ where: { userId } });
    const contact = await db.contact.findUnique({ where: { userId } });
    const bio = await db.bio.findUnique({ where: { userId } });
    const skills = await db.skills.findUnique({ where: { userId } });
    const workedu = await db.workedu.findUnique({ where: { userId } });
    const profilePic = await db.profilePic.findUnique({ where: { userId } });

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

    const iValues = {
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
      image: profilePic?.image

    };
    // console.log("GET GET GET GET GET GET ",iValues)
    return iValues;
  } catch {
    return null;
  }
};

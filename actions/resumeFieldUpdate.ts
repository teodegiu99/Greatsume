"use server";
import { db } from "@/lib/db";

export const updatePersonal = async (
  id?: string,
  name?: string,
  surname?: string,
  address?: string,
  dateOfBirth?: string,
  relocation?: string
) => {
  console.log(
    "UPDATE PERSONAL=",
    id,
    name,
    surname,
    address,
    dateOfBirth,
    relocation
  );

  if (id) {
    await db.personal.upsert({
      where: { userId: id },
      update: {
        name: name,
        surname: surname,
        address: address,
        dateOfBirth: dateOfBirth,
        relocation: relocation,
      },
      create: {
        userId: id,
        name: name,
        surname: surname,
        address: address,
        dateOfBirth: address,
        relocation: relocation,
      },
    });
  }
};

export const updateContact = async (
  id?: string,
  email?: string,
  phone?: string,
  linkedin?: string,
  github?: string,
  dribble?: string,
  website?: string
) => {
  console.log(
    "UPDATE CONTACT=",
    id,
    email,
    phone,
    linkedin,
    github,
    dribble,
    website
  );
  if (id) {
    await db.contact.upsert({
      where: { userId: id },
      update: {
        email: email,
        phone: phone,
        linkedin: linkedin,
        github: github,
        dribble: dribble,
        website: website,
      },
      create: {
        userId: id,
        email: email,
        phone: phone,
        linkedin: linkedin,
        github: github,
        dribble: dribble,
        website: website,
      },
    });
  }
};

export const updateBio = async (
  id?: string,
  bio?: string,
  desiredJob?: string,
  ral?: string
) => {
  console.log("UPDATE BIO", id, bio, desiredJob, ral);
  if (id) {
    await db.bio.upsert({
      where: { userId: id },
      update: {
        bio: bio,
        desiredJob: desiredJob,
        desiredRal: ral,
      },
      create: {
        userId: id,
        bio: bio,
        desiredJob: desiredJob,
        desiredRal: ral,
      },
    });
  }
};

export const updateSkills = async (
  id?: string,
  skillss?: string[],
  softSkillss?: string[],
  langSkillss?: string[]
) => {
  console.log("UPDATE SKILLS", id, skillss, softSkillss, langSkillss);
  if (id) {
    await db.skills.upsert({
      where: { userId: id },
      update: {
        hardSkills: skillss,
        softSkills: softSkillss,
        languages: langSkillss,
      },
      create: {
        userId: id,
        hardSkills: skillss,
        softSkills: softSkillss,
        languages: langSkillss,
      },
    });
  }
};
interface Experience {
  years?: string;
  exps?: string;
  title?: string;
}
interface Education {
  eyears?: string;
  edu?: string;
  etitle?: string;
}

export const updateWorkEdu = async (
  id?: string,
  experience?: Experience[],
  education?: Education[]
) => {
  console.log("UPDATE WORKEDU=", id, experience, education);

  const exps = experience?.map((exp) => exp.exps || "");
  const years = experience?.map((exp) => exp.years || "");
  const title = experience?.map((exp) => exp.title || "");
  const edu = education?.map((edu) => edu.edu || "");
  const eyears = education?.map((edu) => edu.eyears || "");
  const etitle = education?.map((edu) => edu.etitle || "");

  if (id) {
    await db.workedu.upsert({
      where: { userId: id },
      update: {
        experience: exps,
        experienceYears: years,
        experienceTitle: title,
        education: edu,
        educationYears: eyears,
		educationTitle: etitle,

      },
      create: {
        userId: id,
        experience: exps,
        experienceYears: years,
        experienceTitle: title,
        education: edu,
        educationYears: eyears,
		educationTitle: etitle,

      },
    });
  }
};

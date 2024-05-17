import * as z from "zod";
import ResumeLayout from '../app/(protected)/layout';

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});



export const FormSchema = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  relocation: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  dribble: z.string().optional(),
  website: z.string().optional(),
  bio: z.string().optional(),
  desiredJob: z.string().optional(),
  ral: z.string().optional(),
  experience: z
    .array(
      z.object({
        years: z.string(),
        exps: z.string(),
        title: z.string(),
      })
    )
    .optional(),
  education: z
    .array(
      z.object({
        eyears: z.string(),
        edu: z.string(),
        etitle: z.string(),
      })
    )
    .optional(),
  skillss: z.array(z.string()).optional(),
  softSkillss: z.array(z.string()).optional(),
  langSkillss: z.array(z.string()).optional(),
});

export const ResumeSchema = z.object({
  image: z.string().optional().nullish(),
  name: z.string().optional().nullish(),
  surname: z.string().optional().nullish(),
  address: z.string().optional().nullish(),
  dateOfBirth: z.string().optional().nullish(),
  relocation: z.string().optional().nullish(),
  phone: z.string().optional().nullish(),
  email: z.string().optional().nullish(),
  linkedin: z.string().optional().nullish(),
  github: z.string().optional().nullish(),
  dribble: z.string().optional().nullish(),
  website: z.string().optional().nullish(),
  bio: z.string().optional().nullish(),
  desiredJob: z.string().optional().nullish(),
  ral: z.string().optional().nullish(),
  experience: z
    .array(
      z.object({
        years: z.string(),
        exps: z.string(),
        title: z.string(),
      })
    )
    .optional().nullish(),
  education: z
    .array(
      z.object({
        eyears: z.string(),
        edu: z.string(),
        etitle: z.string(),
      })
    )
    .optional().nullish(),
  skillss: z.array(z.string()).optional().nullish(),
  softSkillss: z.array(z.string()).optional().nullish(),
  langSkillss: z.array(z.string()).optional().nullish(),
});


export const PublicSchema = z.object({
  image: z.string().optional().nullish(),
  name: z.string().optional().nullish(),
  surname: z.string().optional().nullish(),
  address: z.string().optional().nullish(),
  dateOfBirth: z.string().optional().nullish(),
  relocation: z.string().optional().nullish(),
  phone: z.string().optional().nullish(),
  email: z.string().optional().nullish(),
  linkedin: z.string().optional().nullish(),
  github: z.string().optional().nullish(),
  dribble: z.string().optional().nullish(),
  website: z.string().optional().nullish(),
  bio: z.string().optional().nullish(),
  desiredJob: z.string().optional().nullish(),
  ral: z.string().optional().nullish(),
  experience: z
    .array(
      z.object({
        years: z.string(),
        exps: z.string(),
        title: z.string(),
      })
    )
    .optional().nullish(),
  education: z
    .array(
      z.object({
        eyears: z.string(),
        edu: z.string(),
        etitle: z.string(),
      })
    )
    .optional().nullish(),
  skillss: z.array(z.string()).optional().nullish(),
  softSkillss: z.array(z.string()).optional().nullish(),
  langSkillss: z.array(z.string()).optional().nullish(),
  showBio:  z.boolean().optional().nullish(),
  showAddress:  z.boolean().optional().nullish(),
  showDateOfBirth:  z.boolean().optional().nullish(),
showImage: z.boolean().optional().nullish(),
});


export const ShowHide = z.object({
  showBio:  z.boolean().optional().nullish(),
  showAddress:  z.boolean().optional().nullish(),
  showDateOfBirth:  z.boolean().optional().nullish(),
showImage: z.boolean().optional().nullish(),
template: z.string().optional().nullish(),
})
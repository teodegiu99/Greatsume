import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
	code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    })
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum of 6 characters required"
    }),
});


export const FormSchema = z.object({
    name: z.string().optional(),
    surname: z.string().optional(),
    address: z.string().optional(),
    dateOfBirth: z.string().optional(),
	relocation: z.boolean().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    dribble: z.string().optional(),
    website: z.string().optional(),
    bio: z.string().optional(),
    desiredJob: z.string().optional(),
    ral: z.string().optional(),
    experience: z.array(z.object({
        years: z.string(),
        exps: z.string(),
    })).optional(),
    education: z.array(z.object({
        eyears: z.string(),
        edu: z.string(),
    })).optional(),
    skillss: z.array(z.string()).optional(),
    softSkillss: z.array(z.string()).optional(),
	langSkillss: z.array(z.string()).optional(),
});
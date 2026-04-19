// types/templates.ts
export interface Experience {
  years: string;
  title: string;
  exps: string;
}

export interface Education {
  eyears: string;
  etitle: string;
  edu: string;
}

export interface CvData {
  name: string;
  surname: string;
  address: string;
  dateOfBirth: string;
  relocation: string; // <-- Aggiunto
  phone: string;
  email: string;
  linkedin: string;   // <-- Aggiunto
  github: string;     // <-- Aggiunto
  dribble: string;    // <-- Aggiunto
  website: string;
  bio: string;
  desiredJob: string;
  ral: string;        // <-- Aggiunto
  experience: Experience[];
  education: Education[];
  skillss: string[];
  softSkillss: string[]; // <-- Aggiunto
  langSkillss: string[];
  image: string;
}

export interface VisibilityOptions {
  showImage: boolean;
  showAddress: boolean;
  showDateOfBirth: boolean;
  showBio: boolean;
}

export interface TemplateBaseProps {
  data: CvData;
  showHide: VisibilityOptions;
}
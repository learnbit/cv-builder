export type EducationItemType = {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
};

export type ExperienceItemType = {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
};

export type BasicInfoType = {
  fullName: string;
  title: string;
  about: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  website: string;
};

export type CertificationType = {
  id: string;
  name: string;
  institution: string;
  startDate: string;
  endDate: string;
  credentialId: string;
  credentialUrl: string;
};

export type SkillsType = {
  id: string;
  name: string;
};

export type LinkType = {
  id: string;
  type: ProfessionalLinkType;
  url: string;
};

export type LanguageType = {
  id: string;
  language: string;
  proficiency: LanguageLevel;
};

export type CvType = {
  basicInfo: BasicInfoType;
  experiences: ExperienceItemType[];
  education: EducationItemType[];
  skills: SkillsType[];
  languages: LanguageType[];
  certifications: CertificationType[];
};

export const ProfessionalLinkType = {
  GITHUB: "GITHUB",
  WEBSITE: "WEBSITE",
  LINKEDIN: "LINKEDIN",
  EMAIL: "EMAIL",
  PHONE: "PHONE",
} as const;

export type ProfessionalLinkType =
  (typeof ProfessionalLinkType)[keyof typeof ProfessionalLinkType];

export const LanguageLevel = {
  LIMITED: "LIMITED",
  PROFESSIONAL: "PROFESSIONAL",
  NATIVE: "NATIVE",
} as const;

export type LanguageLevel = (typeof LanguageLevel)[keyof typeof LanguageLevel];

export enum LanguageActionTypes {
  ADD_LANGUAGE = "ADD_LANGUAGE",
  UPDATE_LANGUAGE = "UPDATE_LANGUAGE",
  DELETE_LANGUAGE = "DELETE_LANGUAGE",
  MOVE_LANGUAGE_UP = "MOVE_LANGUAGE_UP",
  MOVE_LANGUAGE_DOWN = "MOVE_LANGUAGE_DOWN",
}

export enum ExperienceActionTypes {
  ADD_EXPERIENCE = "ADD_EXPERIENCE",
  UPDATE_EXPERIENCE = "UPDATE_EXPERIENCE",
  DELETE_EXPERIENCE = "DELETE_EXPERIENCE",
  MOVE_EXPERIENCE_UP = "MOVE_EXPERIENCE_UP",
  MOVE_EXPERIENCE_DOWN = "MOVE_EXPERIENCE_DOWN",
}

export enum EducationActionTypes {
  ADD_EDUCATION = "ADD_EDUCATION",
  UPDATE_EDUCATION = "UPDATE_EDUCATION",
  DELETE_EDUCATION = "DELETE_EDUCATION",
  MOVE_EDUCATION_UP = "MOVE_EDUCATION_UP",
  MOVE_EDUCATION_DOWN = "MOVE_EDUCATION_DOWN",
}

export enum BasicInfoActionTypes {
  UPDATE_BASIC_INFO = "UPDATE_BASIC_INFO",
  RESET_BASIC_INFO = "RESET_BASIC_INFO",
}

export enum CertificationActionTypes {
  ADD_CERTIFICATION = "ADD_CERTIFICATION",
  UPDATE_CERTIFICATION = "UPDATE_CERTIFICATION",
  DELETE_CERTIFICATION = "DELETE_CERTIFICATION",
  MOVE_CERTIFICATION_UP = "MOVE_CERTIFICATION_UP",
  MOVE_CERTIFICATION_DOWN = "MOVE_CERTIFICATION_DOWN",
}

export enum SkillsActionTypes {
  ADD_SKILL = "ADD_SKILL",
  UPDATE_SKILL = "UPDATE_SKILL",
  DELETE_SKILL = "DELETE_SKILL",
}

export enum CvActionTypes {
  LOAD_CV = "LOAD_CV",
}

export enum LinksActionTypes {
  ADD_LINK = "ADD_LINK",
  UPDATE_LINK = "UPDATE_LINK",
  DELETE_LINK = "DELETE_LINK",
}

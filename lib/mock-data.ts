import {
  BasicInfoType,
  CvType,
  ExperienceItemType,
  LanguageType,
  SkillsType,
} from "./types";

export const mockExperienceItems: ExperienceItemType[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    startDate: "Jan 2022",
    endDate: "Present",
    location: "Remote",
    description:
      "Developed responsive web applications using React and TypeScript. Collaborated with designers and backend engineers to deliver scalable and user-friendly features.",
  },
  {
    id: "2",
    title: "Junior Web Developer",
    company: "Digital Agency",
    startDate: "Jun 2020",
    endDate: "Dec 2021",
    location: "New York, NY",
    description:
      "Implemented UI components and improved website performance. Worked closely with the team to maintain high-quality code and deliver projects on schedule.",
  },
];

export const mockBasicInfo: BasicInfoType = {
  fullName: "Your Name",
  title: "Software Engineer",
  about:
    "Software engineer with experience building modern web applications. Passionate about creating intuitive user experiences and writing clean, maintainable code.",
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  github: "github.com/yourusername",
  linkedin: "linkedin.com/in/yourname",
  website: "yourwebsite.com",
};

export const mockEducationItems = [
  {
    id: "1",
    school: "University of Technology",
    degree: "Bachelor of Science",
    fieldOfStudy: "Computer Science",
    startDate: "2016",
    endDate: "2020",
  },
];

export const mockSkills: SkillsType[] = [
  { id: "1", name: "JavaScript" },
  { id: "2", name: "TypeScript" },
  { id: "3", name: "React" },
  { id: "4", name: "Node.js" },
  { id: "5", name: "HTML & CSS" },
];

export const mockLanguages: LanguageType[] = [
  {
    id: "1",
    language: "English",
    proficiency: "PROFESSIONAL",
  },
  {
    id: "2",
    language: "Spanish",
    proficiency: "NATIVE",
  },
];

export const mockCertifications = [
  {
    id: "1",
    name: "Frontend Development Certification",
    institution: "Online Learning Platform",
    startDate: "2021",
    endDate: "2021",
    credentialId: "ABC123456",
    credentialUrl: "https://example.com/certificates/ABC123456",
  },
];

export const mockCv: CvType = {
  basicInfo: mockBasicInfo,
  experiences: mockExperienceItems,
  education: mockEducationItems,
  skills: mockSkills,
  languages: mockLanguages,
  certifications: mockCertifications,
};

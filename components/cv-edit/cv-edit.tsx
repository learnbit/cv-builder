"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import BasicInfoSection from "../basic-info/basic-info-section";
import ExperienceSection from "../experience/experience-section";
import EducationSection from "../education/education-section";
import SkillsSection from "../skills/skills-section";
import LanguagesSection from "../languages/languages-section";
import CertificationsSection from "../certifications/certifications-section";

import {
  CertificationActionTypes,
  CertificationType,
  CvType,
  EducationActionTypes,
  EducationItemType,
  ExperienceActionTypes,
  ExperienceItemType,
  LanguageActionTypes,
  LanguageLevel,
  LanguageType,
  SkillsActionTypes,
} from "@/lib/types";
import { CvAction } from "./reducer";
import LinksSection from "../links/links-section";
import { useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import NewModal from "../new-modal";
import SkillForm from "../skills/skill-form";
import ExperienceForm from "../experience/experience-form";
import LanguageForm from "../languages/language-form";
import EducationForm from "../education/education-form";
import CertificationForm from "../certifications/certification-form";

type CvProps = {
  data: CvType;
  dispatch: React.Dispatch<CvAction>;
};

export default function CvEdit(props: CvProps) {
  const { data, dispatch } = props;

  const [openItem, setOpenItem] = useState<string>("");

  const [skillsModalOpened, setSkillsModalOpened] = useState(false);

  const [experienceModalOpened, setExperienceModalOpened] = useState(false);
  const [lastAddedExperienceId, setLastAddedExperienceId] = useState<
    string | null
  >(null);
  const [newExperience, setNewExperience] = useState<ExperienceItemType | null>(
    {
      id: crypto.randomUUID(),
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    }
  );

  const [lastAddedLanguageId, setLastAddedLanguageId] = useState<string | null>(
    null
  );
  const [languageModalOpened, setLanguageModalOpened] = useState(false);
  const [newLanguage, setNewLanguage] = useState<LanguageType | null>({
    id: crypto.randomUUID(),
    language: "",
    proficiency: LanguageLevel.LIMITED,
  });

  const {
    experiences,
    basicInfo,
    education,
    skills,
    languages,
    certifications,
  } = data;

  const [lastAddedEducationId, setLastAddedEducationId] = useState<
    string | null
  >(null);
  const [educationModalOpened, setEducationModalOpened] = useState(false);
  const [newEducation, setNewEducation] = useState<EducationItemType | null>({
    id: crypto.randomUUID(),
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
  });

  const [lastAddedCertificationId, setLastAddedCertificationId] = useState<
    string | null
  >(null);
  const [certificationModalOpened, setCertificationModalOpened] =
    useState(false);
  const [newCertification, setNewCertification] =
    useState<CertificationType | null>({
      id: crypto.randomUUID(),
      name: "",
      institution: "",
      startDate: "",
      endDate: "",
      credentialId: "",
      credentialUrl: "",
    });

  const handleSubmitAddSkill = (skill: string) => {
    dispatch({
      type: SkillsActionTypes.ADD_SKILL,
      payload: {
        id: crypto.randomUUID(),
        name: skill,
      },
    });

    setSkillsModalOpened(false);
  };

  const handleSubmitAddLanguage = () => {
    if (!newLanguage) return;

    console.log(`Submitting new language: ${JSON.stringify(newLanguage)}`);

    dispatch({
      type: LanguageActionTypes.ADD_LANGUAGE,
      payload: newLanguage,
    });

    setLastAddedLanguageId(newLanguage.id);

    setNewLanguage({
      id: crypto.randomUUID(),
      language: "",
      proficiency: LanguageLevel.LIMITED,
    });

    setLanguageModalOpened(false);
  };

  const handleSubmitAddExperience = () => {
    if (!newExperience) return;

    dispatch({
      type: ExperienceActionTypes.ADD_EXPERIENCE,
      payload: newExperience,
    });

    setLastAddedExperienceId(newExperience.id);

    setNewExperience({
      id: crypto.randomUUID(),
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    });

    setExperienceModalOpened(false);
  };

  const handleSubmitAddEducation = () => {
    if (!newEducation) return;

    dispatch({
      type: EducationActionTypes.ADD_EDUCATION,
      payload: newEducation,
    });

    setLastAddedEducationId(newEducation.id);

    setNewEducation({
      id: crypto.randomUUID(),
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
    });

    setEducationModalOpened(false);
  };

  const handleSubmitAddCertification = () => {
    if (!newCertification) return;

    dispatch({
      type: CertificationActionTypes.ADD_CERTIFICATION,
      payload: newCertification,
    });

    setLastAddedCertificationId(newCertification.id);

    setNewCertification({
      id: crypto.randomUUID(),
      name: "",
      institution: "",
      startDate: "",
      endDate: "",
      credentialId: "",
      credentialUrl: "",
    });

    setCertificationModalOpened(false);
  };

  return (
    <div className={`h-full min-h-0 overflow-y-auto pb-6`}>
      <Accordion
        type="single"
        collapsible
        className="flex flex-col gap-3"
        value={openItem}
        onValueChange={setOpenItem}
      >
        <AccordionSection id="basic-info" title="Basic Info">
          <BasicInfoSection basicInfo={basicInfo} dispatch={dispatch} />
        </AccordionSection>

        <AccordionSection id="links" title="Links">
          <LinksSection basicInfo={basicInfo} dispatch={dispatch} />
        </AccordionSection>

        <AccordionSection
          id="experience"
          title="Experience"
          isOpen={openItem === "experience"}
          action={
            <Button
              variant="secondary"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setExperienceModalOpened(true);
              }}
              className="h-7 w-7"
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
          }
        >
          <ExperienceSection
            experienceItems={experiences}
            dispatch={dispatch}
            lastAddedId={lastAddedExperienceId}
          />
        </AccordionSection>

        <AccordionSection
          id="skills"
          title="Skills"
          isOpen={openItem === "skills"}
          action={
            <Button
              variant="secondary"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setSkillsModalOpened(true);
              }}
              className="h-7 w-7"
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
          }
        >
          <SkillsSection skills={skills} dispatch={dispatch} />
        </AccordionSection>

        <AccordionSection
          id="education"
          title="Education"
          isOpen={openItem === "education"}
          action={
            <Button
              variant="secondary"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setEducationModalOpened(true);
              }}
              className="h-7 w-7"
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
          }
        >
          <EducationSection
            educationItems={education}
            dispatch={dispatch}
            lastAddedId={lastAddedEducationId}
          />
        </AccordionSection>

        <AccordionSection
          id="languages"
          title="Languages"
          isOpen={openItem === "languages"}
          action={
            <Button
              variant="secondary"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setLanguageModalOpened(true);
              }}
              className="h-7 w-7"
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
          }
        >
          <LanguagesSection
            languages={languages}
            dispatch={dispatch}
            lastAddedId={lastAddedLanguageId}
          />
        </AccordionSection>

        <AccordionSection
          id="certifications"
          title="Certifications"
          isOpen={openItem === "certifications"}
          action={
            <Button
              variant="secondary"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setCertificationModalOpened(true);
              }}
              className="h-7 w-7"
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
          }
        >
          <CertificationsSection
            certifications={certifications}
            dispatch={dispatch}
            lastAddedId={lastAddedCertificationId}
          />
        </AccordionSection>

        {/* Projects */}
      </Accordion>

      <NewModal
        title="Add Skill"
        open={skillsModalOpened}
        setOpen={setSkillsModalOpened}
        formId={"skill-form"}
      >
        <SkillForm formId={"skill-form"} onSubmit={handleSubmitAddSkill} />
      </NewModal>

      <NewModal
        title="Add Experience"
        open={experienceModalOpened}
        setOpen={setExperienceModalOpened}
        formId="experience-form"
      >
        <ExperienceForm
          formId="experience-form"
          experience={newExperience}
          dispatch={dispatch}
          setNewExperience={setNewExperience}
          onSubmit={handleSubmitAddExperience}
          hideValidationErrors={false}
          isNew
        />
      </NewModal>

      <NewModal
        open={languageModalOpened}
        setOpen={setLanguageModalOpened}
        formId="language-id"
        title="Add Language"
      >
        <LanguageForm
          language={newLanguage}
          dispatch={dispatch}
          formId="language-id"
          setNewLanguage={setNewLanguage}
          onSubmit={handleSubmitAddLanguage}
          hideValidationErrors={false}
          isNew
        />
      </NewModal>

      <NewModal
        open={educationModalOpened}
        setOpen={setEducationModalOpened}
        formId="education-form"
        title="Add Education"
      >
        <EducationForm
          formId="education-form"
          education={newEducation}
          dispatch={dispatch}
          setNewEducation={setNewEducation}
          onSubmit={handleSubmitAddEducation}
          hideValidationErrors={false}
          isNew
        />
      </NewModal>

      <NewModal
        open={certificationModalOpened}
        setOpen={setCertificationModalOpened}
        formId="certification-id"
        title="Add Certification"
      >
        <CertificationForm
          formId="certification-id"
          certification={newCertification}
          setNewCertification={setNewCertification}
          onSubmit={handleSubmitAddCertification}
          hideValidationErrors={false}
          isNew
        />
      </NewModal>
    </div>
  );
}

function AccordionSection(props: {
  title: string;
  id: string;
  children: React.ReactNode;
  isOpen?: boolean;
  action?: React.ReactNode;
}) {
  const { title, id, children, isOpen, action } = props;

  return (
    <AccordionItem
      value={id}
      className="rounded-lg border border-border bg-card overflow-visible"
    >
      {/* 🔥 Sticky separado (clave) */}
      <div className="sticky top-0 z-20">
        <AccordionTrigger
          className="
            bg-card
            py-3 px-4
            hover:bg-muted
            transition-colors
            cursor-pointer
            no-underline
            hover:no-underline
          "
        >
          <div className="flex items-center w-full">
            <h2 className="text-base font-semibold text-foreground">{title}</h2>

            {/* <div className="ml-2">{isOpen && action}</div> */}
            <div className="w-8" />
          </div>
        </AccordionTrigger>

        {isOpen && action && (
          <div className="absolute right-15 top-1/2 -translate-y-1/2">
            {action}
          </div>
        )}
      </div>

      {/* Content */}
      <AccordionContent className="px-4 pt-3 pb-4">{children}</AccordionContent>
    </AccordionItem>
  );
}

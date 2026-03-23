import { CvActionTypes, CvType } from "@/lib/types";
import { ExperienceAction, experienceReducer } from "../experience/reducer";
import { LanguageAction, languageReducer } from "../languages/reducer";
import { SkillAction, skillsReducer } from "../skills/reducer";
import { BasicInfoAction, basicInfoReducer } from "../basic-info/reducer";
import {
  CertificationAction,
  certificationsReducer,
} from "../certifications/reducer";
import { EducationAction, educationReducer } from "../education/reducer";

export type CvLoadAction = {
  type: CvActionTypes;
  payload: CvType;
};

export type CvAction =
  | ExperienceAction
  | LanguageAction
  | SkillAction
  | BasicInfoAction
  | CertificationAction
  | EducationAction
  | CvLoadAction;

export function cvReducer(state: CvType, action: CvAction) {
  if (action.type === CvActionTypes.LOAD_CV) {
    return action.payload;
  }

  return {
    ...state,
    experiences: experienceReducer(
      state.experiences,
      action as ExperienceAction
    ),
    languages: languageReducer(state.languages, action as LanguageAction),
    skills: skillsReducer(state.skills, action as SkillAction),
    basicInfo: basicInfoReducer(state.basicInfo, action as BasicInfoAction),
    certifications: certificationsReducer(
      state.certifications,
      action as CertificationAction
    ),
    education: educationReducer(state.education, action as EducationAction),
  };
}

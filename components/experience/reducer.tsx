import { ExperienceItemType } from "../../lib/types";
import { ExperienceActionTypes } from "../../lib/types";
// create type for action.type

export const defaultExperience = {
  id: "new",
  title: "",
  company: "",
  startDate: "",
  endDate: "",
  description: "",
  years: "",
  location: "",
};

export type ExperienceAction =
  | { type: ExperienceActionTypes.ADD_EXPERIENCE; payload: ExperienceItemType }
  | {
      type: ExperienceActionTypes.UPDATE_EXPERIENCE;
      payload: ExperienceItemType;
    }
  | { type: ExperienceActionTypes.DELETE_EXPERIENCE; payload: string }
  | { type: ExperienceActionTypes.MOVE_EXPERIENCE_UP; payload: string }
  | { type: ExperienceActionTypes.MOVE_EXPERIENCE_DOWN; payload: string };

export function experienceReducer(
  state: ExperienceItemType[],
  action: ExperienceAction
): ExperienceItemType[] {
  switch (action.type) {
    case ExperienceActionTypes.ADD_EXPERIENCE:
      return [action.payload, ...state];

    case ExperienceActionTypes.UPDATE_EXPERIENCE:
      console.log("update experience", { payload: action.payload });
      return state.map((exp) =>
        exp.id === action.payload.id ? action.payload : exp
      );

    case ExperienceActionTypes.DELETE_EXPERIENCE:
      return state.filter((exp) => exp.id !== action.payload);

    case ExperienceActionTypes.MOVE_EXPERIENCE_UP:
      const index = state.findIndex((exp) => exp.id === action.payload);

      if (index <= 0) {
        return state;
      }

      const newExperiences = [...state];
      const temp = newExperiences[index - 1];
      newExperiences[index - 1] = newExperiences[index];
      newExperiences[index] = temp;
      return newExperiences;

    case ExperienceActionTypes.MOVE_EXPERIENCE_DOWN:
      const downIndex = state.findIndex((exp) => exp.id === action.payload);

      if (downIndex === -1 || downIndex >= state.length - 1) {
        return state;
      }

      const newExperiencesDown = [...state];
      const tempDown = newExperiencesDown[downIndex + 1];
      newExperiencesDown[downIndex + 1] = newExperiencesDown[downIndex];
      newExperiencesDown[downIndex] = tempDown;

      return newExperiencesDown;
    default:
      return state;
  }
}

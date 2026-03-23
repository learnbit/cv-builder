import { EducationActionTypes, EducationItemType } from "@/lib/types";

export const defaultEducation: EducationItemType = {
  id: "new",
  school: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
};

export type EducationAction =
  | { type: EducationActionTypes.ADD_EDUCATION; payload: EducationItemType }
  | {
      type: EducationActionTypes.UPDATE_EDUCATION;
      payload: EducationItemType;
    }
  | { type: EducationActionTypes.DELETE_EDUCATION; payload: string }
  | { type: EducationActionTypes.MOVE_EDUCATION_UP; payload: string }
  | { type: EducationActionTypes.MOVE_EDUCATION_DOWN; payload: string };

export function educationReducer(
  state: EducationItemType[],
  action: EducationAction
): EducationItemType[] {
  switch (action.type) {
    case EducationActionTypes.ADD_EDUCATION:
      return [action.payload, ...state];

    case EducationActionTypes.UPDATE_EDUCATION:
      console.log("update education", action.payload);
      return state.map((edu) =>
        edu.id === action.payload.id ? action.payload : edu
      );

    case EducationActionTypes.DELETE_EDUCATION:
      return state.filter((edu) => edu.id !== action.payload);

    case EducationActionTypes.MOVE_EDUCATION_UP:
      const index = state.findIndex((edu) => edu.id === action.payload);

      if (index <= 0) {
        return state;
      }

      const newEducation = [...state];
      const temp = newEducation[index - 1];
      newEducation[index - 1] = newEducation[index];
      newEducation[index] = temp;
      return newEducation;

    case EducationActionTypes.MOVE_EDUCATION_DOWN:
      const downIndex = state.findIndex((edu) => edu.id === action.payload);

      if (downIndex === -1 || downIndex >= state.length - 1) {
        return state;
      }

      const newEducationDown = [...state];
      const tempDown = newEducationDown[downIndex + 1];
      newEducationDown[downIndex + 1] = newEducationDown[downIndex];
      newEducationDown[downIndex] = tempDown;
      return newEducationDown;

    default:
      return state;
  }
}

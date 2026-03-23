import { LanguageActionTypes, LanguageLevel, LanguageType } from "@/lib/types";

export const defaultLanguage: LanguageType = {
  id: "new",
  language: "",
  proficiency: LanguageLevel.LIMITED,
};

export type LanguageAction =
  | { type: LanguageActionTypes.ADD_LANGUAGE; payload: LanguageType }
  | {
      type: LanguageActionTypes.UPDATE_LANGUAGE;
      payload: LanguageType;
    }
  | { type: LanguageActionTypes.DELETE_LANGUAGE; payload: string }
  | { type: LanguageActionTypes.MOVE_LANGUAGE_UP; payload: string }
  | { type: LanguageActionTypes.MOVE_LANGUAGE_DOWN; payload: string };

export function languageReducer(
  state: LanguageType[],
  action: LanguageAction
): LanguageType[] {
  switch (action.type) {
    case LanguageActionTypes.ADD_LANGUAGE:
      return [action.payload, ...state];

    case LanguageActionTypes.UPDATE_LANGUAGE:
      return state.map((lang) =>
        lang.id === action.payload.id ? action.payload : lang
      );

    case LanguageActionTypes.DELETE_LANGUAGE:
      return state.filter((lang) => lang.id !== action.payload);

    case LanguageActionTypes.MOVE_LANGUAGE_UP:
      const index = state.findIndex((lang) => lang.id === action.payload);

      if (index <= 0) {
        return state;
      }

      const newLanguages = [...state];
      const temp = newLanguages[index - 1];
      newLanguages[index - 1] = newLanguages[index];
      newLanguages[index] = temp;
      return newLanguages;

    case LanguageActionTypes.MOVE_LANGUAGE_DOWN:
      const downIndex = state.findIndex((lang) => lang.id === action.payload);

      if (downIndex === -1 || downIndex >= state.length - 1) {
        return state;
      }

      const newLanguagesDown = [...state];
      const tempDown = newLanguagesDown[downIndex + 1];
      newLanguagesDown[downIndex + 1] = newLanguagesDown[downIndex];
      newLanguagesDown[downIndex] = tempDown;
      return newLanguagesDown;

    default:
      return state;
  }
}

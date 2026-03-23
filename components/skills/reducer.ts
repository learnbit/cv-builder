import { SkillsActionTypes, SkillsType } from "@/lib/types";

export const defaultSkill: SkillsType = {
  id: "new",
  name: "",
};

export type SkillAction =
  | { type: SkillsActionTypes.ADD_SKILL; payload: { id: string; name: string } }
  | {
      type: SkillsActionTypes.UPDATE_SKILL;
      payload: { id: string; name: string };
    }
  | { type: SkillsActionTypes.DELETE_SKILL; payload: string };

export function skillsReducer(
  state: SkillsType[],
  action: SkillAction
): SkillsType[] {
  switch (action.type) {
    case SkillsActionTypes.ADD_SKILL:
      return [...state, action.payload];

    case SkillsActionTypes.UPDATE_SKILL:
      return state.map((skill) =>
        skill.id === action.payload.id
          ? { ...skill, name: action.payload.name }
          : skill
      );

    case SkillsActionTypes.DELETE_SKILL:
      return state.filter((skill) => skill.id !== action.payload);

    default:
      return state;
  }
}

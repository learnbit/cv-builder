import { ProjectActionTypes, ProjectType } from "@/lib/types";

export const defaultProject = {
  id: "new",
  name: "",
  description: "",
  url: "",
};

export type ProjectAction =
  | { type: ProjectActionTypes.ADD_PROJECT; payload: ProjectType }
  | { type: ProjectActionTypes.UPDATE_PROJECT; payload: ProjectType }
  | { type: ProjectActionTypes.DELETE_PROJECT; payload: string }
  | { type: ProjectActionTypes.MOVE_PROJECT_UP; payload: string }
  | { type: ProjectActionTypes.MOVE_PROJECT_DOWN; payload: string };

export default function projectReducer(
  state: ProjectType[],
  action: ProjectAction
): ProjectType[] {
  switch (action.type) {
    case ProjectActionTypes.ADD_PROJECT:
      return [action.payload, ...state];

    case ProjectActionTypes.UPDATE_PROJECT:
      return state.map((project) =>
        project.id === action.payload.id ? action.payload : project
      );

    case ProjectActionTypes.DELETE_PROJECT:
      return state.filter((project) => project.id !== action.payload);

    case ProjectActionTypes.MOVE_PROJECT_UP:
      const index = state.findIndex((project) => project.id === action.payload);

      if (index <= 0) {
        return state;
      }

      const newProjects = [...state];
      const temp = newProjects[index - 1];
      newProjects[index - 1] = newProjects[index];
      newProjects[index] = temp;
      return newProjects;

    case ProjectActionTypes.MOVE_PROJECT_DOWN:
      const downIndex = state.findIndex(
        (project) => project.id === action.payload
      );

      if (downIndex === -1 || downIndex >= state.length - 1) {
        return state;
      }

      const newProjectsDown = [...state];
      const tempDown = newProjectsDown[downIndex + 1];
      newProjectsDown[downIndex + 1] = newProjectsDown[downIndex];
      newProjectsDown[downIndex] = tempDown;

      return newProjectsDown;
    default:
      return state;
  }
}

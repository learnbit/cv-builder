import { LinksActionTypes, LinkType, ProfessionalLinkType } from "@/lib/types";

export const defaultLink: LinkType = {
  id: "new",
  type: ProfessionalLinkType.WEBSITE,
  url: "",
};

export type LinksAction =
  | { type: LinksActionTypes.ADD_LINK }
  | {
      type: LinksActionTypes.UPDATE_LINK;
      payload: { id: string; type: ProfessionalLinkType; url: string };
    }
  | { type: LinksActionTypes.DELETE_LINK; payload: string };

export default function linksReducer(
  state: LinkType[],
  action: LinksAction
): LinkType[] {
  switch (action.type) {
    case LinksActionTypes.ADD_LINK:
      return [...state, defaultLink];

    case LinksActionTypes.UPDATE_LINK:
      return state.map((link) =>
        link.id === action.payload.id
          ? { ...link, type: action.payload.type, url: action.payload.url }
          : link
      );

    case LinksActionTypes.DELETE_LINK:
      return state.filter((link) => link.id !== action.payload);

    default:
      return state;
  }
}

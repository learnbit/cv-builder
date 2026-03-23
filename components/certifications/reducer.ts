import { CertificationActionTypes, CertificationType } from "@/lib/types";

export const defaultCertification = {
  id: "new",
  name: "",
  institution: "",
  startDate: "",
  endDate: "",
  credentialId: "",
  credentialUrl: "",
};

export type CertificationAction =
  | {
      type: CertificationActionTypes.ADD_CERTIFICATION;
      payload: CertificationType;
    }
  | {
      type: CertificationActionTypes.UPDATE_CERTIFICATION;
      payload: typeof defaultCertification;
    }
  | { type: CertificationActionTypes.DELETE_CERTIFICATION; payload: string }
  | { type: CertificationActionTypes.MOVE_CERTIFICATION_UP; payload: string }
  | { type: CertificationActionTypes.MOVE_CERTIFICATION_DOWN; payload: string };

export function certificationsReducer(
  state: (typeof defaultCertification)[],
  action: CertificationAction
): (typeof defaultCertification)[] {
  switch (action.type) {
    case CertificationActionTypes.ADD_CERTIFICATION:
      return [action.payload, ...state];

    case CertificationActionTypes.UPDATE_CERTIFICATION:
      return state.map((cert) =>
        cert.id === action.payload.id ? action.payload : cert
      );

    case CertificationActionTypes.DELETE_CERTIFICATION:
      return state.filter((cert) => cert.id !== action.payload);

    case CertificationActionTypes.MOVE_CERTIFICATION_UP: {
      const index = state.findIndex((cert) => cert.id === action.payload);
      if (index > 0) {
        const newState = [...state];
        [newState[index - 1], newState[index]] = [
          newState[index],
          newState[index - 1],
        ];
        return newState;
      }
      return state;
    }

    case CertificationActionTypes.MOVE_CERTIFICATION_DOWN: {
      const index = state.findIndex((cert) => cert.id === action.payload);
      if (index !== -1 && index < state.length - 1) {
        const newState = [...state];
        [newState[index], newState[index + 1]] = [
          newState[index + 1],
          newState[index],
        ];
        return newState;
      }
      return state;
    }

    default:
      return state;
  }
}

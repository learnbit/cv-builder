// generate basicInfoReducer
import { BasicInfoActionTypes, BasicInfoType } from "@/lib/types";

export type BasicInfoAction =
  | {
      type: BasicInfoActionTypes.UPDATE_BASIC_INFO;
      payload: BasicInfoType;
    }
  | {
      type: BasicInfoActionTypes.RESET_BASIC_INFO;
    };

export const defaultBasicInfo: BasicInfoType = {
  fullName: "",
  title: "",
  about: "",
  email: "",
  phone: "",
  github: "",
  linkedin: "",
  website: "",
};

export function basicInfoReducer(
  state: BasicInfoType,
  action: BasicInfoAction
): BasicInfoType {
  switch (action.type) {
    case BasicInfoActionTypes.UPDATE_BASIC_INFO:
      return {
        ...state,
        ...action.payload,
      };

    case BasicInfoActionTypes.RESET_BASIC_INFO:
      return defaultBasicInfo;

    default:
      return state;
  }
}

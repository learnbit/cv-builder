import { BasicInfoActionTypes, BasicInfoType } from "@/lib/types";
import React from "react";
import { BasicInfoAction } from "../basic-info/reducer";
import { TextField } from "../ui/text-field";
import { FormCard } from "../ui/form-card";

type BasicInfoSectionProps = {
  basicInfo: BasicInfoType;
  dispatch: React.Dispatch<BasicInfoAction>;
};

export default function BasicInfoSection(props: BasicInfoSectionProps) {
  const { basicInfo, dispatch } = props;
  const { fullName, title, about } = basicInfo;

  console.log(`BasicInfoSection rendered with:`, { basicInfo });

  return (
    <FormCard>
      <TextField
        name="fullName"
        label="Full Name"
        value={fullName}
        placeholder="Full Name"
        onChange={(e) =>
          dispatch({
            type: BasicInfoActionTypes.UPDATE_BASIC_INFO,
            payload: { ...basicInfo, fullName: e.target.value },
          })
        }
      />

      <TextField
        name="title"
        label="Title"
        value={title}
        placeholder="Title"
        onChange={(e) =>
          dispatch({
            type: BasicInfoActionTypes.UPDATE_BASIC_INFO,
            payload: { ...basicInfo, title: e.target.value },
          })
        }
      />

      <TextField
        name="about"
        label="About You"
        value={about}
        placeholder="About you"
        multiline
        onChange={(e) =>
          dispatch({
            type: BasicInfoActionTypes.UPDATE_BASIC_INFO,
            payload: { ...basicInfo, about: e.target.value },
          })
        }
      />
    </FormCard>
  );
}

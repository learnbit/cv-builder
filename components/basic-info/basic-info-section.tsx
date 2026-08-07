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

  return (
    <FormCard>
      <TextField
        name="fullName"
        label="Full Name"
        value={fullName}
        placeholder="John Doe"
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
        placeholder="e.g. Senior Frontend Engineer | React & TypeScript"
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
        placeholder="Brief professional summary (2–4 sentences)"
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

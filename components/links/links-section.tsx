import React from "react";
import LinkForm from "./link-form";
import { BasicInfoActionTypes, BasicInfoType } from "@/lib/types";
import { BasicInfoAction } from "../basic-info/reducer";
import { FormCard } from "../ui/form-card";

type LinksSectionProps = {
  basicInfo: BasicInfoType;
  dispatch: React.Dispatch<BasicInfoAction>;
};

export default function LinksSection(props: LinksSectionProps) {
  const { basicInfo, dispatch } = props;
  const { linkedin, github, website, email, phone } = basicInfo;

  return (
    <FormCard>
      <LinkForm
        name={"LinkedIn"}
        value={linkedin}
        placeholder={"https://linkedin.com/in/yourname"}
        onChange={(e) => {
          dispatch({
            type: BasicInfoActionTypes.UPDATE_BASIC_INFO,
            payload: { ...basicInfo, linkedin: e.target.value },
          });
        }}
      />
      <LinkForm
        name={"Github"}
        value={github}
        placeholder={"https://github.com/yourusername"}
        onChange={(e) => {
          dispatch({
            type: BasicInfoActionTypes.UPDATE_BASIC_INFO,
            payload: { ...basicInfo, github: e.target.value },
          });
        }}
      />
      <LinkForm
        name={"Website"}
        value={website}
        placeholder={"https://yourwebsite.com"}
        onChange={(e) => {
          dispatch({
            type: BasicInfoActionTypes.UPDATE_BASIC_INFO,
            payload: { ...basicInfo, website: e.target.value },
          });
        }}
      />
      <LinkForm
        name={"Email"}
        value={email}
        placeholder={"youremail@example.com"}
        onChange={(e) => {
          dispatch({
            type: BasicInfoActionTypes.UPDATE_BASIC_INFO,
            payload: { ...basicInfo, email: e.target.value },
          });
        }}
      />
      <LinkForm
        name={"Phone"}
        value={phone}
        placeholder={"+1 555 123 4567"}
        onChange={(e) => {
          dispatch({
            type: BasicInfoActionTypes.UPDATE_BASIC_INFO,
            payload: { ...basicInfo, phone: e.target.value },
          });
        }}
      />
    </FormCard>
  );
}

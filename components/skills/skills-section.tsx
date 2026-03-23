import { Button } from "../ui/button";
import { SkillsActionTypes, SkillsType } from "@/lib/types";
import { SkillAction } from "./reducer";
import { SkillsInput } from "../skills-input";
import NewModal from "../new-modal";
import { useState } from "react";
import SkillForm from "./skill-form";

type SkillsSectionProps = {
  skills: SkillsType[];
  dispatch: React.Dispatch<SkillAction>;
};

export default function SkillsSection(props: SkillsSectionProps) {
  const { skills, dispatch } = props;

  return (
    <>
      <div className="flex gap-4 flex-wrap">
        {skills.map((skill) => (
          <SkillsInput
            key={skill.id}
            value={skill.name}
            onChange={(value) =>
              dispatch({
                type: SkillsActionTypes.UPDATE_SKILL,
                payload: { id: skill.id, name: value },
              })
            }
            onDelete={() =>
              dispatch({
                type: SkillsActionTypes.DELETE_SKILL,
                payload: skill.id,
              })
            }
          />
        ))}
      </div>
    </>
  );
}

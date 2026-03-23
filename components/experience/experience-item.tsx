"use client";

import ExperienceForm from "./experience-form";
import { ExperienceItemType } from "../../lib/types";

type ExperienceItemProps = {
  experience: ExperienceItemType;
};

export default function ExperienceItem(props: ExperienceItemProps) {
  return (
    <div>
      <ExperienceForm />
    </div>
  );
}

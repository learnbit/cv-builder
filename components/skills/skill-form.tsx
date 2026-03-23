import { useState } from "react";
import { TextField } from "../ui/text-field";

type SkillFormProps = {
  onSubmit: (skill: string) => void;
  formId: string;
  hideValidationErrors?: boolean;
};

export default function SkillForm({ onSubmit, formId }: SkillFormProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className="mb-8 p-4 border-2 flex flex-col gap-4"
    >
      <TextField
        name="skill"
        label="Skill"
        placeholder="Skill"
        value={value}
        required={true}
        requiredMessage="Skill is required"
        onChange={(e) => setValue(e.target.value)}
      />

      <button type="submit" hidden />
    </form>
  );
}

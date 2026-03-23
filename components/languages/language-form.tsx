import { LanguageActionTypes, LanguageLevel, LanguageType } from "@/lib/types";
import React from "react";
import { LanguageAction } from "./reducer";
import { LanguageLevelLabel } from "@/lib/strings";
import ConfirmDialog from "../confirm-dialog";
import { Button } from "../ui/button";
import { TextField } from "../ui/text-field";
import { SelectField } from "../ui/select-field";
import { FormCard } from "../ui/form-card";
import { DeleteButton } from "../ui/delete-button";

type LanguageFormProps = {
  language: LanguageType | null;
  dispatch: React.Dispatch<LanguageAction>;
  formId: string;
  isNew?: boolean;
  setNewLanguage?: React.Dispatch<React.SetStateAction<LanguageType | null>>;
  onSubmit?: () => void;
  hideValidationErrors?: boolean;
};

export default function LanguageForm(props: LanguageFormProps) {
  const {
    language,
    dispatch,
    formId,
    isNew,
    setNewLanguage,
    onSubmit,
    hideValidationErrors = true,
  } = props;
  const { id = "", language: idiom = "", proficiency = "" } = language ?? {};

  const handleDelete = () => {
    dispatch({
      type: LanguageActionTypes.DELETE_LANGUAGE,
      payload: id,
    });
  };

  function handleUp() {
    dispatch({
      type: LanguageActionTypes.MOVE_LANGUAGE_UP,
      payload: id,
    });
  }

  function handleDown() {
    dispatch({
      type: LanguageActionTypes.MOVE_LANGUAGE_DOWN,
      payload: id,
    });
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (!language) return;

    if (isNew) {
      setNewLanguage?.({ ...language, [name]: value });
    } else {
      dispatch({
        type: LanguageActionTypes.UPDATE_LANGUAGE,
        payload: { ...language, [name]: value },
      });
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (!language) return;

    if (isNew) {
      setNewLanguage?.({ ...language, [name]: value });
    } else {
      dispatch({
        type: LanguageActionTypes.UPDATE_LANGUAGE,
        payload: { ...language, [name]: value },
      });
    }
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isNew) {
      onSubmit?.();
    }
  };

  return (
    <FormCard>
      <div className="flex items-center gap-2 justify-end mb-2 px-1">
        {!isNew && (
          <Button
            className="bg-muted hover:bg-muted/80 active:scale-95"
            variant="secondary"
            onClick={handleUp}
          >
            ↑
          </Button>
        )}
        {!isNew && (
          <Button
            className="bg-muted hover:bg-muted/80 active:scale-95"
            variant="secondary"
            onClick={handleDown}
          >
            ↓
          </Button>
        )}
        {!isNew && (
          <ConfirmDialog
            trigger={<DeleteButton />}
            title="Delete Language?"
            description="This action cannot be undone."
            confirmText="Delete"
            onConfirm={handleDelete}
          />
        )}
      </div>
      <form id={formId} className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField
          name="language"
          label="Language"
          placeholder="Language"
          value={idiom}
          onChange={handleInputChange}
          {...(!hideValidationErrors && {
            required: true,
            requiredMessage: "Job title is required",
          })}
        />

        <SelectField
          name="proficiency"
          label="Proficiency"
          value={proficiency}
          onChange={handleSelectChange}
          options={[
            { label: LanguageLevelLabel.LIMITED, value: LanguageLevel.LIMITED },
            {
              label: LanguageLevelLabel.PROFESSIONAL,
              value: LanguageLevel.PROFESSIONAL,
            },
            { label: LanguageLevelLabel.NATIVE, value: LanguageLevel.NATIVE },
          ]}
        />
      </form>
    </FormCard>
  );
}

import { EducationActionTypes, EducationItemType } from "@/lib/types";
import React from "react";
import { EducationAction } from "./reducer";
import ConfirmDialog from "../confirm-dialog";
import { TextField } from "../ui/text-field";
import { FormCard } from "../ui/form-card";
import { DeleteButton } from "../ui/delete-button";
import { Button } from "../ui/button";

type EducationFormProps = {
  education: EducationItemType | null;
  dispatch: React.Dispatch<EducationAction>;
  formId: string;
  isNew?: boolean;
  setNewEducation?: React.Dispatch<
    React.SetStateAction<EducationItemType | null>
  >;
  onSubmit?: () => void;
  hideValidationErrors?: boolean;
};

export default function EducationForm(props: EducationFormProps) {
  const {
    education,
    dispatch,
    formId,
    isNew = false,
    onSubmit,
    setNewEducation,
    hideValidationErrors = true,
  } = props;

  const {
    id = "",
    school = "",
    degree = "",
    fieldOfStudy = "",
    startDate = "",
    endDate = "",
  } = education ?? {};

  const handleDelete = () => {
    dispatch({
      type: EducationActionTypes.DELETE_EDUCATION,
      payload: id,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (!education) return;

    if (isNew) {
      setNewEducation?.({ ...education, [name]: value });
    } else {
      dispatch({
        type: EducationActionTypes.UPDATE_EDUCATION,
        payload: { ...education, [name]: value },
      });
    }
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isNew) {
      onSubmit?.();
    }
  };

  function handleUp() {
    dispatch({
      type: EducationActionTypes.MOVE_EDUCATION_UP,
      payload: id,
    });
  }

  function handleDown() {
    dispatch({
      type: EducationActionTypes.MOVE_EDUCATION_DOWN,
      payload: id,
    });
  }

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
            title="Delete experience?"
            description="This action cannot be undone."
            confirmText="Delete"
            onConfirm={handleDelete}
          />
        )}
      </div>
      <form id={formId} className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField
          name="school"
          label="School"
          placeholder="School"
          value={school}
          onChange={handleInputChange}
          {...(!hideValidationErrors && {
            required: true,
            requiredMessage: "School is required",
          })}
        />
        <TextField
          name="degree"
          label="Degree"
          placeholder="Degree"
          value={degree}
          onChange={handleInputChange}
          {...(!hideValidationErrors && {
            required: true,
            requiredMessage: "Degree is required",
          })}
        />
        <TextField
          name="fieldOfStudy"
          label="Field of Study"
          placeholder="Field of Study"
          value={fieldOfStudy}
          onChange={handleInputChange}
        />
        <div className="flex gap-4">
          <TextField
            name="startDate"
            label="Start Date"
            placeholder="Start Date"
            value={startDate}
            onChange={handleInputChange}
            {...(!hideValidationErrors && {
              required: true,
              requiredMessage: "Start Date is required",
            })}
          />

          <TextField
            name="endDate"
            label="End Date"
            placeholder="End Date"
            value={endDate}
            onChange={handleInputChange}
            {...(!hideValidationErrors && {
              required: true,
              requiredMessage: "End Date is required",
            })}
          />
        </div>
      </form>
    </FormCard>
  );
}

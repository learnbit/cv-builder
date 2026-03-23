import { ExperienceActionTypes, ExperienceItemType } from "../../lib/types";
import ConfirmDialog from "../confirm-dialog";
import { ExperienceAction } from "./reducer";
import { Button } from "../ui/button";
import { ChangeEvent } from "react";
import { TextField } from "../ui/text-field";
import { FormCard } from "../ui/form-card";
import { DeleteButton } from "../ui/delete-button";

type ExperienceFormProps = {
  experience: ExperienceItemType | null;
  dispatch: React.Dispatch<ExperienceAction>;
  formId: string;
  isNew?: boolean;
  setNewExperience?: React.Dispatch<
    React.SetStateAction<ExperienceItemType | null>
  >;
  onSubmit?: () => void;
  hideValidationErrors?: boolean;
};

export default function ExperienceForm(props: ExperienceFormProps) {
  const {
    experience,
    dispatch,
    formId,
    isNew = false,
    setNewExperience,
    onSubmit,
    hideValidationErrors = true,
  } = props;

  const {
    id = "",
    title = "",
    company = "",
    startDate = "",
    endDate = "",
    location = "",
    description = "",
  } = experience ?? {};

  const handleUp = () => {
    dispatch({
      type: ExperienceActionTypes.MOVE_EXPERIENCE_UP,
      payload: id,
    });
  };

  const handleDown = () => {
    dispatch({
      type: ExperienceActionTypes.MOVE_EXPERIENCE_DOWN,
      payload: id,
    });
  };

  const handleDelete = () => {
    dispatch({
      type: ExperienceActionTypes.DELETE_EXPERIENCE,
      payload: id,
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (!experience) return;

    if (isNew) {
      setNewExperience?.({
        ...experience,
        [name]: value,
      });
    } else {
      dispatch({
        type: ExperienceActionTypes.UPDATE_EXPERIENCE,
        payload: { ...experience, [name]: value },
      });
    }
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

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
            title="Delete experience?"
            description="This action cannot be undone."
            confirmText="Delete"
            onConfirm={handleDelete}
          />
        )}
      </div>

      <form id={formId} className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Job Title"
          value={title}
          placeholder="Job Title"
          onChange={handleInputChange}
          {...(!hideValidationErrors && {
            required: true,
            requiredMessage: "Job title is required",
          })}
        />

        <TextField
          name="company"
          label="Company"
          placeholder="Company"
          value={company}
          onChange={handleInputChange}
          {...(!hideValidationErrors && {
            required: true,
            requiredMessage: "Company is required",
          })}
        />

        <div className="grid grid-cols-2 gap-4">
          <TextField
            name="startDate"
            label="Start Date"
            placeholder="Jan 2010"
            value={startDate}
            onChange={handleInputChange}
            {...(!hideValidationErrors && {
              required: true,
              requiredMessage: "Start date is required",
            })}
          />

          <TextField
            name="endDate"
            label="End Date"
            placeholder="Present"
            value={endDate}
            onChange={handleInputChange}
            {...(!hideValidationErrors && {
              required: true,
              requiredMessage: "End date is required",
            })}
          />
        </div>
        <TextField
          name="location"
          label="Location"
          placeholder="Location"
          value={location}
          onChange={handleInputChange}
          {...(!hideValidationErrors && {
            required: true,
            requiredMessage: "Location is required",
          })}
        />
        <TextField
          name="description"
          label="Description"
          placeholder="Description"
          value={description}
          multiline
          onChange={handleInputChange}
          {...(!hideValidationErrors && {
            required: true,
            requiredMessage: "Description is required",
          })}
        />
      </form>
    </FormCard>
  );
}

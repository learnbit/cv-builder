import { ProjectActionTypes, ProjectType } from "@/lib/types";
import { ProjectAction } from "./reducer";
import { FormCard } from "../ui/form-card";
import { Button } from "../ui/button";
import ConfirmDialog from "../confirm-dialog";
import { DeleteButton } from "../ui/delete-button";
import { TextField } from "../ui/text-field";

type ProjectFormProps = {
  project: ProjectType | null;
  dispatch?: React.Dispatch<ProjectAction>;
  isNew?: boolean;
  setNewProject?: React.Dispatch<React.SetStateAction<ProjectType | null>>;
  onSubmit?: () => void;
  hideValidationErrors?: boolean;
  formId: string;
};

export default function ProjectForm(props: ProjectFormProps) {
  const {
    project,
    dispatch,
    isNew = false,
    setNewProject,
    onSubmit,
    hideValidationErrors = true,
    formId,
  } = props;
  const { id = "", name = "", description = "", url = "" } = project ?? {};

  const handleDelete = () => {
    dispatch?.({
      type: ProjectActionTypes.DELETE_PROJECT,
      payload: id,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (!project) return;

    if (isNew) {
      setNewProject?.({
        ...project,
        [name]: value,
      });
    } else {
      dispatch?.({
        type: ProjectActionTypes.UPDATE_PROJECT,
        payload: { ...project, [name]: value },
      });
    }
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isNew) {
      onSubmit?.();
    }
  };

  const handleUp = () => {
    dispatch?.({
      type: ProjectActionTypes.MOVE_PROJECT_UP,
      payload: id,
    });
  };

  const handleDown = () => {
    dispatch?.({
      type: ProjectActionTypes.MOVE_PROJECT_DOWN,
      payload: id,
    });
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
      <form id={formId} className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Project Name"
          placeholder="e.g. Personal Finance Tracker"
          value={name}
          onChange={handleInputChange}
          {...(!hideValidationErrors && {
            required: true,
            requiredMessage: "Project name is required",
          })}
        />
        <TextField
          name="description"
          label="Project description"
          placeholder="e.g. Developed a budgeting app with real-time expense tracking and data visualization"
          value={description}
          onChange={handleInputChange}
          {...(!hideValidationErrors && {
            required: true,
            requiredMessage: "Project description is required",
          })}
        />

        <TextField
          name="url"
          label="Project URL"
          placeholder="e.g. https://finance-app.com"
          value={url}
          onChange={handleInputChange}
        />
      </form>
    </FormCard>
  );
}

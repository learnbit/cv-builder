import { CertificationActionTypes, CertificationType } from "@/lib/types";
import { CertificationAction } from "./reducer";
import ConfirmDialog from "../confirm-dialog";
import { Button } from "../ui/button";
import { TextField } from "../ui/text-field";
import { FormCard } from "../ui/form-card";
import { DeleteButton } from "../ui/delete-button";

type CertificationFormProps = {
  certification: CertificationType | null;
  dispatch?: React.Dispatch<CertificationAction>;
  setNewCertification?: React.Dispatch<
    React.SetStateAction<CertificationType | null>
  >;
  onSubmit?: () => void;
  formId: string;
  isNew?: boolean;
  hideValidationErrors?: boolean;
};

export default function CertificationForm(props: CertificationFormProps) {
  const {
    certification,
    dispatch,
    formId,
    isNew = false,
    setNewCertification,
    onSubmit,
    hideValidationErrors = true,
  } = props;
  const {
    id = "",
    name = "",
    institution = "",
    startDate = "",
    endDate = "",
    credentialId = "",
    credentialUrl = "",
  } = certification ?? {};

  const handleDelete = () => {
    dispatch?.({
      type: CertificationActionTypes.DELETE_CERTIFICATION,
      payload: id,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (!certification) return;

    if (isNew) {
      setNewCertification?.({
        ...certification,
        [name]: value,
      });
    } else {
      dispatch?.({
        type: CertificationActionTypes.UPDATE_CERTIFICATION,
        payload: { ...certification, [name]: value },
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
      type: CertificationActionTypes.MOVE_CERTIFICATION_UP,
      payload: id,
    });
  };

  const handleDown = () => {
    dispatch?.({
      type: CertificationActionTypes.MOVE_CERTIFICATION_DOWN,
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
          label="Certification Name"
          placeholder="e.g. AWS Certified Solutions Architect"
          value={name}
          onChange={handleInputChange}
          {...(!hideValidationErrors && {
            required: true,
            requiredMessage: "Job title is required",
          })}
        />
        <TextField
          name="institution"
          label="Issuing Institution"
          placeholder="e.g. Google"
          value={institution}
          onChange={handleInputChange}
          {...(!hideValidationErrors && {
            required: true,
            requiredMessage: "Job title is required",
          })}
        />
        <div className="flex gap-4">
          <TextField
            name="startDate"
            label="Start Date"
            placeholder="e.g. Jan 2023"
            value={startDate}
            onChange={handleInputChange}
            {...(!hideValidationErrors && {
              required: true,
              requiredMessage: "Job title is required",
            })}
          />

          <TextField
            name="endDate"
            label="End Date"
            placeholder="e.g. Jul 2023"
            value={endDate}
            onChange={handleInputChange}
            {...(!hideValidationErrors && {
              required: true,
              requiredMessage: "Job title is required",
            })}
          />
        </div>
        <TextField
          name="credentialId"
          label="Credential ID"
          placeholder="e.g. ABCD-1234"
          value={credentialId}
          onChange={handleInputChange}
          {...(!hideValidationErrors && {
            required: true,
            requiredMessage: "Job title is required",
          })}
        />
        <TextField
          name="credentialUrl"
          label="Credential URL"
          placeholder="e.g. https://verify.aws.amazon.com/ABCD-1234"
          value={credentialUrl}
          onChange={handleInputChange}
        />
      </form>
    </FormCard>
  );
}

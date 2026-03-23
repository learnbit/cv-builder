import { TextField } from "../ui/text-field";

type LinkFormProps = {
  name: string;
  value: string;
  placeholder: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function LinkForm(props: LinkFormProps) {
  const { name, value, onChange, placeholder } = props;

  return (
    <TextField
      name={name}
      label={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

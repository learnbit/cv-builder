import { ChangeEvent } from "react";

type TextFieldProps = {
  label: string;
  name?: string;
  value: string;
  placeholder?: string;
  multiline?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  requiredMessage?: string;
};

export function TextField(props: TextFieldProps) {
  const {
    name,
    label,
    value,
    placeholder,
    onChange,
    multiline,
    required = false,
    requiredMessage,
  } = props;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs text-muted-foreground">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          className="
            w-full
            rounded-md
            border border-border
            bg-card
            px-3 py-2
            text-sm
            text-foreground
            focus:outline-none
            focus:ring-2
            focus:ring-primary
            shadow-sm
          "
          placeholder={placeholder}
          value={value}
          onInput={(e) => {
            e.currentTarget.setCustomValidity("");

            const el = e.currentTarget;
            el.style.height = "auto";
            el.style.height = el.scrollHeight + "px";
          }}
          onChange={onChange}
          required={required}
          onInvalid={(e) => {
            if (requiredMessage) {
              e.currentTarget.setCustomValidity(requiredMessage);
            }
          }}
        />
      ) : (
        <input
          id={name}
          name={name}
          className="  
            w-full
            rounded-md
            border border-border
            bg-card
            px-3 py-2
            text-sm
            text-foreground
            focus:outline-none
            focus:ring-2
            focus:ring-primary
            shadow-sm
          "
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          onInput={(e) => {
            e.currentTarget.setCustomValidity("");
          }}
          onInvalid={(e) => {
            if (requiredMessage) {
              e.currentTarget.setCustomValidity(requiredMessage);
            }
          }}
        ></input>
      )}
    </div>
  );
}

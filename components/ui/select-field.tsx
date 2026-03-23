import { ChevronDown } from "lucide-react";

type SelectFieldProps = {
  name: string;
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function SelectField(props: SelectFieldProps) {
  const { label, value, options, onChange, name } = props;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs text-muted-foreground">
        {label}
      </label>

      <div className="relative">
        <select
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
          hover:border-muted-foreground
          cursor-pointer
          appearance-none
          pr-10
        "
          value={value}
          onChange={onChange}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}

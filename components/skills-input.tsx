"use client";

import { useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { Button } from "./ui/button";

type SkillsInputProps = {
  value: string;
  onChange?: (value: string) => void;
  onDelete?: () => void;
  hideDeleteButton?: boolean;
};

export function SkillsInput(props: SkillsInputProps) {
  const { value, onChange, onDelete, hideDeleteButton } = props;

  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      const spanWidth = spanRef.current.offsetWidth + 16;
      inputRef.current.style.width =
        Math.min(Math.max(spanWidth, 80), 200) + "px";
    }
  }, [value]);

  return (
    <div
      className="        
        group flex items-center gap-2
        rounded-md
        bg-muted
        px-3 py-1.5
        text-sm
        border border-border/60
        hover:border-border
        transition"
    >
      <span
        ref={spanRef}
        className="absolute invisible whitespace-pre text-sm px-2"
      >
        {value}
      </span>
      <Input
        placeholder="New skill"
        ref={inputRef}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="          bg-transparent
          outline-none
          text-foreground
          placeholder:text-muted-foreground
          w-auto min-w-[40px]"
      />
      {!hideDeleteButton && (
        <button
          onClick={onDelete}
          className="    
            flex items-center justify-center
            h-5 w-5
            rounded
            md:opacity-0 md:group-hover:opacity-70
            hover:opacity-100
            hover:bg-destructive/10
            hover:text-destructive
            transition
            cursor-pointer
          "
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

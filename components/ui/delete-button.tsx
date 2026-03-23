import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type DeleteButtonProps = {
  onClick?: () => void;
  title?: string;
  className?: string;
};

export function DeleteButton({
  onClick,
  title = "Delete",
  className,
}: DeleteButtonProps) {
  return (
    <Button
      variant="destructive"
      size="icon"
      title={title}
      onClick={onClick}
      className={`
        h-8 w-8
        opacity-80 hover:opacity-100
        transition
        ${className}
        pointer-events-auto
      `}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}

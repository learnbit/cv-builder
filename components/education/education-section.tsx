import { EducationItemType } from "@/lib/types";
import { EducationAction } from "./reducer";
import { motion } from "framer-motion";
import EducationForm from "./education-form";
import { useEffect, useRef } from "react";

type EducationSectionProps = {
  educationItems: EducationItemType[];
  dispatch: React.Dispatch<EducationAction>;
  lastAddedId: string | null;
};

export default function EducationSection(props: EducationSectionProps) {
  const { educationItems, dispatch, lastAddedId } = props;
  const refs = useRef<Record<string, HTMLDivElement>>({});

  useEffect(() => {
    if (lastAddedId && refs.current[lastAddedId]) {
      const timeout = setTimeout(() => {
        refs.current[lastAddedId]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 250); // 👈 ajusta (200–350ms)

      return () => clearTimeout(timeout);
    }
  }, [lastAddedId, educationItems]);

  return (
    <div className="flex flex-col gap-4">
      {educationItems.map((item) => (
        <motion.div
          key={item.id}
          layout
          transition={{ duration: 0.3 }}
          ref={(el) => {
            refs.current[item.id] = el as HTMLDivElement;
          }}
        >
          <EducationForm
            formId={item.id}
            key={item.id}
            education={item}
            dispatch={dispatch}
          />
        </motion.div>
      ))}
    </div>
  );
}

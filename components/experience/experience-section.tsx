import ExperienceForm from "./experience-form";
import { ExperienceItemType } from "../../lib/types";
import { ExperienceAction } from "./reducer";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

type ExperienceSectionProps = {
  experienceItems: ExperienceItemType[];
  dispatch: React.Dispatch<ExperienceAction>;
  lastAddedId: string | null;
};

export default function ExperienceSection(props: ExperienceSectionProps) {
  const { experienceItems, dispatch, lastAddedId } = props;
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
  }, [lastAddedId, experienceItems]);

  return (
    <div className="flex flex-col gap-4">
      {experienceItems.map((item) => (
        <motion.div
          key={item.id}
          layout
          transition={{ duration: 0.3 }}
          ref={(el) => {
            refs.current[item.id] = el as HTMLDivElement;
          }}
        >
          <ExperienceForm
            experience={item}
            dispatch={dispatch}
            formId={item.id}
          />
        </motion.div>
      ))}
    </div>
  );
}

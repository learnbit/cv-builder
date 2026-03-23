import { LanguageType } from "@/lib/types";
import { LanguageAction } from "./reducer";
import LanguageForm from "./language-form";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

type LanguagesSectionProps = {
  languages: LanguageType[];
  dispatch: React.Dispatch<LanguageAction>;
  lastAddedId: string | null;
};

export default function LanguagesSection(props: LanguagesSectionProps) {
  const { languages, dispatch, lastAddedId } = props;
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
  }, [lastAddedId, languages]);

  return (
    <div className="flex flex-col gap-4">
      {languages.map((language) => (
        <motion.div
          key={language.id}
          layout
          transition={{ duration: 0.3 }}
          ref={(el) => {
            refs.current[language.id] = el as HTMLDivElement;
          }}
        >
          <LanguageForm
            formId={language.id}
            key={language.id}
            language={language}
            dispatch={dispatch}
          />
        </motion.div>
      ))}
    </div>
  );
}

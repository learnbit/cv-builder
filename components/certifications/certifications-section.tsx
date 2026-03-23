import { CertificationType } from "@/lib/types";
import { CertificationAction } from "./reducer";
import { motion } from "framer-motion";
import CertificationForm from "./certification-form";
import { useEffect, useRef } from "react";

type CertificationsSectionProps = {
  certifications: CertificationType[];
  dispatch: React.Dispatch<CertificationAction>;
  lastAddedId: string | null;
};

export default function CertificationsSection(
  props: CertificationsSectionProps
) {
  const { certifications, dispatch, lastAddedId } = props;
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
  }, [lastAddedId, certifications]);

  return (
    <div className="flex flex-col gap-4">
      {certifications.map((cert) => (
        <motion.div
          key={cert.id}
          layout
          transition={{ duration: 0.3 }}
          ref={(el) => {
            refs.current[cert.id] = el as HTMLDivElement;
          }}
        >
          <CertificationForm
            formId={cert.id}
            key={cert.id}
            certification={cert}
            dispatch={dispatch}
          />
        </motion.div>
      ))}
    </div>
  );
}

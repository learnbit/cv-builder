import { ProjectType } from "@/lib/types";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ProjectAction } from "./reducer";
import ProjectForm from "./project-form";

type ProjectsSectionProps = {
  projects: ProjectType[];
  dispatch: React.Dispatch<ProjectAction>;
  lastAddedId: string | null;
};

export default function ProjectsSection(props: ProjectsSectionProps) {
  const { projects, dispatch, lastAddedId } = props;
  const refs = useRef<Record<string, HTMLDivElement>>({});

  useEffect(() => {
    if (lastAddedId && refs.current[lastAddedId]) {
      const timeout = setTimeout(() => {
        refs.current[lastAddedId]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 250);

      return () => clearTimeout(timeout);
    }
  }, [lastAddedId, projects]);

  return (
    <div className="flex flex-col gap-4">
      {projects?.map((project) => (
        <motion.div
          key={project.id}
          layout
          transition={{ duration: 0.3 }}
          ref={(el) => {
            refs.current[project.id] = el as HTMLDivElement;
          }}
        >
          <ProjectForm
            formId={project.id}
            key={project.id}
            project={project}
            dispatch={dispatch}
          />
        </motion.div>
      ))}
    </div>
  );
}

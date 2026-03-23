import usePagination from "@/hooks/usePagination";
import { LanguageLevelLabel } from "@/lib/strings";
import { CvType, ExperienceItemType, ProfessionalLinkType } from "@/lib/types";
import { cx } from "class-variance-authority";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { FileDownIcon } from "lucide-react";

type CVPreviewProps = {
  data: CvType;
};

type BlockType = {
  key: string;
  node: React.ReactNode;
  keepWithNext?: boolean;
};

export default function CVPreview(props: CVPreviewProps) {
  const { data } = props;
  const {
    basicInfo,
    experiences,
    education,
    skills,
    languages,
    certifications,
    // links,
  } = data;
  const { linkedin, github, website, email, phone } = basicInfo;

  const printRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const newScale = Math.min(width / 850, 1); // 794 + margen
      setScale(newScale);
    });

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const links = useMemo(
    () => [
      ...(linkedin
        ? [
            {
              label: "LinkedIn",
              url: linkedin,
              placeholder: "https://linkedin.com/in/yourname",
            },
          ]
        : []),
      ...(github
        ? [
            {
              label: "Github",
              url: github,
              placeholder: "https://github.com/yourusername",
            },
          ]
        : []),
      ...(website
        ? [
            {
              label: "Website",
              url: website,
              placeholder: "https://yourwebsite.com",
            },
          ]
        : []),
      ...(email
        ? [
            {
              label: "Email",
              url: `mailto:${email}`,
              placeholder: "",
            },
          ]
        : []),
      ...(phone
        ? [
            {
              label: "Phone",
              url: `tel:${phone}`,
              placeholder: "",
            },
          ]
        : []),
    ],
    [email, phone, linkedin, github, website]
  );

  const blocks: BlockType[] = useMemo(
    () => [
      {
        key: "header",
        keepWithNext: true,
        node: (
          <>
            <h1 className="text-2xl font-bold">{basicInfo.fullName}</h1>

            <p className="text-lg text-gray-600 pt-1">{basicInfo.title}</p>

            {links.length > 0 && (
              <div className="text-sm text-gray-500 flex flex-wrap pt-1">
                {links.map((link, index) => (
                  <Link
                    key={index}
                    url={link?.url ?? ""}
                    label={link?.label ?? ""}
                    last={index === links.length - 1}
                  />
                ))}
              </div>
            )}

            <p className="text-sm text-gray-600 leading-snug whitespace-pre-line text-justify pt-2">
              {basicInfo.about}
            </p>
          </>
        ),
      },

      {
        key: "experience-title",
        node: <SectionTitle title="Experience" />,
        keepWithNext: true,
      },

      ...experiences.map((exp, i) => ({
        key: `experience-${exp.id}`,
        node: (
          <ExperienceBlock
            exp={exp}
            isFirst={i === 0}
            isLast={i === experiences.length - 1}
          />
        ),
      })),

      {
        key: "skills-title",
        node: <SectionTitle title="Skills" />,
        keepWithNext: true,
      },

      {
        key: "skills",
        node: (
          <ul className="grid grid-cols-2 gap-x-10 list-disc list-inside pt-2">
            {skills.map((skill) => (
              <li key={skill.id} className="text-sm text-gray-700">
                {skill.name}
              </li>
            ))}
          </ul>
        ),
      },

      {
        key: "languages-title",
        node: <SectionTitle title="Languages" />,
        keepWithNext: true,
      },

      {
        key: "languages",
        node: (
          <ul className="grid grid-cols-2 list-disc list-inside gap-x-10 pt-2">
            {languages.map((lang) => (
              <li key={lang.id} className="text-sm text-gray-700">
                {lang.language} - {LanguageLevelLabel[lang.proficiency]}
              </li>
            ))}
          </ul>
        ),
      },

      {
        key: "education-title",
        node: <SectionTitle title="Education" />,
        keepWithNext: true,
      },

      ...education.map((edu, index) => {
        const degree = `${edu.degree}${
          edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""
        }`;

        const isFirst = index === 0;
        const isLast = index === education.length - 1;

        return {
          key: `education-${edu.id}`,
          node: (
            <div className={cx(!isLast && "pb-3", isFirst && "pt-2")}>
              <h3 className="text-base font-semibold">{degree}</h3>

              <p className="text-sm text-gray-600 pt-1">
                {edu.school} | {edu.startDate} - {edu.endDate}
              </p>
            </div>
          ),
        };
      }),

      {
        key: "certifications-title",
        node: <SectionTitle title="Certifications" />,
        keepWithNext: true,
      },

      ...certifications.map((cert, i) => {
        const isFirst = i === 0;
        const isLast = i === certifications.length - 1;

        return {
          key: `certification-${cert.id}`,
          node: (
            <div className={cx(!isLast && "pb-3", isFirst && "pt-2")}>
              <h3 className="text-base font-semibold">{cert.name}</h3>
              <p className="text-sm text-gray-600 pt-1">
                {cert.institution} | {cert.startDate} - {cert.endDate}
              </p>
              <p className="text-sm text-gray-600 pt-1">{cert.credentialId}</p>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 inline-block pt-1"
                >
                  View Credential
                </a>
              )}
            </div>
          ),
        };
      }),
    ],
    [
      basicInfo,
      experiences,
      education,
      skills,
      languages,
      certifications,
      links,
    ]
  );

  const { measureRef, pages } = usePagination(blocks);

  return (
    <div className="flex flex-1 flex-col h-full overflow-y-auto relative">
      <div className="absolute top-8 right-8 z-30 group">
        <button
          onClick={handlePrint}
          className="
            w-11 h-11
            flex items-center justify-center
            rounded-lg
            bg-neutral-800
            hover:bg-neutral-700
            border border-white/10
            shadow-xl
            text-white
            transition
            hover:scale-105 active:scale-95
          "
        >
          <FileDownIcon className="w-5 h-5" />
        </button>

        <span
          className="
            absolute right-full mr-3 top-1/2 -translate-y-1/2
            text-xs text-white
            bg-neutral-900/90 backdrop-blur
            px-2 py-1 rounded-md
            opacity-0 group-hover:opacity-100
            transition
            whitespace-nowrap
          "
        >
          Export PDF
        </span>
      </div>

      <div
        ref={measureRef}
        className="fixed top-0 left-0 invisible pointer-events-none w-[794px] p-12 font-sans box-border flex flex-col"
      >
        {blocks.map((block) => (
          <div key={block.key}>{block.node}</div>
        ))}
      </div>

      <div
        ref={contentRef}
        className="bg-neutral-900 flex flex-col items-center gap-10 overflow-y-auto overflow-x-hidden py-10"
      >
        <div
          style={{
            transform: isMobile ? "none" : `scale(${scale})`,
            transformOrigin: "top center",
          }}
          className="flex flex-col items-center gap-10 relative will-change-transform"
          ref={printRef}
        >
          {pages.map((page, index) => (
            <div
              key={index}
              className={cx(
                "cv-page bg-white text-black p-6 shadow-2xl rounded-sm font-sans box-border flex flex-col",
                isMobile ? "w-full h-auto" : "w-[794px] h-[1123px]"
              )}
            >
              {page.map((block) => (
                <div key={block.key}>{block.node}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-xs font-bold uppercase tracking-wide border-b border-gray-300 pt-5 pb-1">
      {title}
    </h2>
  );
}

function ExperienceBlock({
  exp,
  isFirst,
  isLast,
}: {
  exp: ExperienceItemType;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div className={cx(!isLast && "pb-3", isFirst && "pt-2")}>
      <h3 className="text-base font-semibold pb-1">
        {exp.title} at {exp.company}
      </h3>

      <p className="text-sm text-gray-600 pb-1">
        {exp.startDate} - {exp.endDate} | {exp.location}
      </p>

      <p className="text-sm text-gray-700 leading-snug whitespace-pre-line text-justify">
        {exp.description}
      </p>
    </div>
  );
}

function Link({
  url,
  label,
  last,
}: {
  url: string;
  label: string;
  last?: boolean;
}) {
  return (
    <div className="text-sm text-gray-500 flex flex-wrap">
      <span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-700 hover:underline"
        >
          {label}
        </a>
      </span>
      {!last && <span className="mx-2 text-gray-400">•</span>}
    </div>
  );
}

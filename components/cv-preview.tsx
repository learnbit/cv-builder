import usePagination from "@/hooks/usePagination";
import { LanguageLevelLabel } from "@/lib/strings";
import { CvType, ExperienceItemType } from "@/lib/types";
import { isPhoneHref, normalizeUrl, toHref } from "@/lib/utils";
import { cx } from "class-variance-authority";
import { FileDownIcon } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

type CVPreviewProps = {
  data: CvType;
};

type BlockType = {
  key: string;
  node: React.ReactNode;
  keepWithNext?: boolean;
};

export default function CVPreview({ data }: CVPreviewProps) {
  const normalized = useMemo(
    () => ({
      basicInfo: data.basicInfo,
      experiences: data.experiences ?? [],
      education: data.education ?? [],
      skills: data.skills ?? [],
      languages: data.languages ?? [],
      certifications: data.certifications ?? [],
      projects: data.projects ?? [],
    }),
    [data]
  );
  const {
    basicInfo,
    experiences,
    education,
    skills,
    languages,
    certifications,
    projects,
  } = normalized;
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
      setScale(Math.min(width / 850, 1));
    });

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const print = useReactToPrint({
    contentRef: printRef,
  });

  const links = useMemo(
    () => [
      ...(linkedin ? [{ label: "LinkedIn", url: linkedin }] : []),
      ...(github ? [{ label: "Github", url: github }] : []),
      ...(website ? [{ label: "Website", url: website }] : []),
      ...(email ? [{ label: "Email", url: `mailto:${email}` }] : []),
      ...(phone ? [{ label: "Phone", url: phone }] : []),
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
                    key={link.label}
                    url={link.url}
                    label={link.label}
                    last={index === links.length - 1}
                  />
                ))}
              </div>
            )}

            {basicInfo.about && (
              <p className="text-sm text-gray-600 leading-snug whitespace-pre-line text-justify pt-2">
                {basicInfo.about}
              </p>
            )}
          </>
        ),
      },

      ...(experiences.length > 0
        ? [
            {
              key: "experience-title",
              node: <SectionTitle title="Experience" />,
              keepWithNext: true,
            },
            ...experiences.flatMap((experience, index) =>
              getExperienceBlocks(
                experience,
                index === 0,
                index === experiences.length - 1
              )
            ),
          ]
        : []),

      ...(skills.length > 0
        ? [
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
          ]
        : []),

      ...(languages.length > 0
        ? [
            {
              key: "languages-title",
              node: <SectionTitle title="Languages" />,
              keepWithNext: true,
            },
            {
              key: "languages",
              node: (
                <ul className="grid grid-cols-2 list-disc list-inside gap-x-10 pt-2">
                  {languages.map((language) => (
                    <li key={language.id} className="text-sm text-gray-700">
                      {language.language} - {LanguageLevelLabel[language.proficiency]}
                    </li>
                  ))}
                </ul>
              ),
            },
          ]
        : []),

      ...(education.length > 0
        ? [
            {
              key: "education-title",
              node: <SectionTitle title="Education" />,
              keepWithNext: true,
            },
            ...education.map((item, index) => {
              const degree = `${item.degree}${
                item.fieldOfStudy ? ` in ${item.fieldOfStudy}` : ""
              }`;

              return {
                key: `education-${item.id}`,
                node: (
                  <div
                    className={cx(
                      index < education.length - 1 && "pb-3",
                      index === 0 && "pt-2"
                    )}
                  >
                    <h3 className="text-base font-semibold">{degree}</h3>
                    <p className="text-sm text-gray-600 pt-1">
                      {item.school} | {item.startDate} - {item.endDate}
                    </p>
                  </div>
                ),
              };
            }),
          ]
        : []),

      ...(certifications.length > 0
        ? [
            {
              key: "certifications-title",
              node: <SectionTitle title="Certifications" />,
              keepWithNext: true,
            },
            ...certifications.map((certification, index) => ({
              key: `certification-${certification.id}`,
              node: (
                <div
                  className={cx(
                    index < certifications.length - 1 && "pb-3",
                    index === 0 && "pt-2"
                  )}
                >
                  <h3 className="text-base font-semibold">
                    {certification.name}
                  </h3>
                  <p className="text-sm text-gray-600 pt-1">
                    {certification.institution} | {certification.startDate} -{" "}
                    {certification.endDate}
                  </p>
                  {certification.credentialId && (
                    <p className="text-sm text-gray-600 pt-1">
                      {certification.credentialId}
                    </p>
                  )}
                  {certification.credentialUrl && (
                    <a
                      href={normalizeUrl(certification.credentialUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 inline-block pt-1"
                    >
                      View Credential
                    </a>
                  )}
                </div>
              ),
            })),
          ]
        : []),

      ...(projects.length > 0
        ? [
            {
              key: "projects-title",
              node: <SectionTitle title="Projects" />,
              keepWithNext: true,
            },
            ...projects.map((project, index) => ({
              key: `project-${project.id}`,
              node: (
                <div
                  className={cx(
                    index < projects.length - 1 && "pb-3",
                    index === 0 && "pt-2"
                  )}
                >
                  <h3 className="text-base font-semibold">{project.name}</h3>
                  {project.description && (
                    <p className="text-sm text-gray-700 leading-snug whitespace-pre-line text-justify pt-1">
                      {project.description}
                    </p>
                  )}
                  {project.url && (
                    <a
                      href={normalizeUrl(project.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 inline-block pt-1"
                    >
                      View Project
                    </a>
                  )}
                </div>
              ),
            })),
          ]
        : []),
    ],
    [
      basicInfo,
      certifications,
      education,
      experiences,
      languages,
      links,
      projects,
      skills,
    ]
  );

  const { measureRef, pages } = usePagination(blocks);

  const handleExportPdf = async () => {
    try {
      await fetch("/api/analytics/pdf-export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pages: pages.length }),
      });
    } catch (error) {
      console.error("Failed to track pdf export", error);
    }

    print();
  };

  return (
    <div className="flex flex-1 flex-col h-full overflow-y-auto relative">
      <div className="absolute top-8 right-8 z-30 group">
        <button
          onClick={handleExportPdf}
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
        className="fixed top-0 left-0 invisible pointer-events-none w-[794px] p-6 font-sans box-border flex flex-col"
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
          className="cv-print-root flex flex-col items-center gap-10 relative will-change-transform"
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

// Keep every measured description fragment comfortably below one page, even
// when a user enters one long paragraph without line breaks.
const MAX_DESCRIPTION_CHARACTERS_PER_BLOCK = 320;

function getExperienceBlocks(
  experience: ExperienceItemType,
  isFirst: boolean,
  isLast: boolean
): BlockType[] {
  const descriptionBlocks = splitExperienceDescription(experience.description);

  return [
    {
      key: `experience-${experience.id}-header`,
      keepWithNext: descriptionBlocks.length > 0,
      node: (
        <div
          className={cx(
            isFirst && "pt-2",
            !isLast && descriptionBlocks.length === 0 && "pb-3"
          )}
        >
          <h3 className="text-base font-semibold pb-1">
            {experience.title} at {experience.company}
          </h3>
          <p className="text-sm text-gray-600 pb-1">
            {experience.startDate} - {experience.endDate} | {experience.location}
          </p>
        </div>
      ),
    },
    ...descriptionBlocks.map((description, index) => ({
      key: `experience-${experience.id}-description-${index}`,
      node: (
        <p
          className={cx(
            "text-sm text-gray-700 leading-snug whitespace-pre-line break-words text-justify",
            !isLast && index === descriptionBlocks.length - 1 && "pb-3"
          )}
        >
          {description}
        </p>
      ),
    })),
  ];
}

function splitExperienceDescription(description: string) {
  if (!description.trim()) return [];

  return description.trim().replace(/\r\n/g, "\n").split("\n").flatMap((line) => {
    if (!line.trim()) return ["\u00a0"];

    const chunks: string[] = [];
    let remaining = line.trim();

    while (remaining.length > MAX_DESCRIPTION_CHARACTERS_PER_BLOCK) {
      const wordBoundary = remaining.lastIndexOf(
        " ",
        MAX_DESCRIPTION_CHARACTERS_PER_BLOCK
      );
      const splitAt = wordBoundary > 0
        ? wordBoundary
        : MAX_DESCRIPTION_CHARACTERS_PER_BLOCK;

      chunks.push(remaining.slice(0, splitAt));
      remaining = remaining.slice(splitAt).trimStart();
    }

    chunks.push(remaining);

    return chunks;
  });
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
  const href = toHref(url);

  return (
    <div className="text-sm text-gray-500 flex flex-wrap">
      <span>
        {isPhoneHref(href) ? (
          url
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 hover:underline"
          >
            {label}
          </a>
        )}
      </span>
      {!last && <span className="mx-2 text-gray-400">•</span>}
    </div>
  );
}

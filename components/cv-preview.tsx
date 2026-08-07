import { LanguageLevelLabel } from "@/lib/strings";
import { CvType, ExperienceItemType } from "@/lib/types";
import { cx } from "class-variance-authority";
import React, { useMemo, useRef, useState } from "react";
import { FileDownIcon } from "lucide-react";
import { isPhoneHref, isWebUrl, normalizeUrl, toHref } from "@/lib/utils";

type CVPreviewProps = {
  data: CvType;
};

export default function CVPreview({ data }: CVPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [pageCount, setPageCount] = useState(1);

  const {
    basicInfo,
    experiences: rawExperiences,
    education: rawEducation,
    skills: rawSkills,
    languages: rawLanguages,
    certifications: rawCertifications,
    projects: rawProjects,
  } = data;

  const normalized = useMemo(
    () => ({
      experiences: rawExperiences ?? [],
      education: rawEducation ?? [],
      skills: rawSkills ?? [],
      languages: rawLanguages ?? [],
      certifications: rawCertifications ?? [],
      projects: rawProjects ?? [],
      basicInfo: {
        fullName: basicInfo?.fullName ?? "",
        title: basicInfo?.title ?? "",
        about: basicInfo?.about ?? "",
        linkedin: basicInfo?.linkedin ?? "",
        github: basicInfo?.github ?? "",
        website: basicInfo?.website ?? "",
        email: basicInfo?.email ?? "",
        phone: basicInfo?.phone ?? "",
      },
    }),
    [
      rawExperiences,
      rawEducation,
      rawSkills,
      rawLanguages,
      rawCertifications,
      rawProjects,
      basicInfo,
    ]
  );

  const {
    experiences,
    education,
    skills,
    languages,
    certifications,
    projects,
    basicInfo: safeBasicInfo,
  } = normalized;

  const { linkedin, github, website, email, phone } = safeBasicInfo;

  const links = useMemo(
    () => [
      ...(linkedin ? [{ label: "LinkedIn", url: linkedin }] : []),
      ...(github ? [{ label: "Github", url: github }] : []),
      ...(website ? [{ label: "Website", url: website }] : []),
      ...(email ? [{ label: "Email", url: `mailto:${email}` }] : []),
      ...(phone ? [{ label: "Phone", url: `${phone}` }] : []),
    ],
    [email, phone, linkedin, github, website]
  );

  const html = useMemo(() => {
    const experienceHtml =
      experiences.length > 0
        ? `
          <h2 class="section-title">Experience</h2>
          ${experiences
            .map(
              (exp) => `
                <section class="experience-block">
                  <h3 class="item-title">${escapeHtml(
                    exp.title
                  )} at ${escapeHtml(exp.company)}</h3>
                  <p class="meta">${escapeHtml(exp.startDate)} - ${escapeHtml(
                exp.endDate
              )} | ${escapeHtml(exp.location)}</p>
                  <p class="description">${formatDescription(
                    exp.description
                  )}</p>
                </section>
              `
            )
            .join("")}
        `
        : "";

    const skillsHtml =
      skills.length > 0
        ? `
          <h2 class="section-title">Skills</h2>
          <ul class="skills-list">
            ${skills
              .map((skill) => `<li>${escapeHtml(skill.name)}</li>`)
              .join("")}
          </ul>
        `
        : "";

    const languagesHtml =
      languages.length > 0
        ? `
          <h2 class="section-title">Languages</h2>
          <ul class="languages-list">
            ${languages
              .map(
                (lang) =>
                  `<li>${escapeHtml(lang.language)} - ${escapeHtml(
                    LanguageLevelLabel[lang.proficiency]
                  )}</li>`
              )
              .join("")}
          </ul>
        `
        : "";

    const educationHtml =
      education.length > 0
        ? `
          <h2 class="section-title">Education</h2>
          ${education
            .map((edu) => {
              const degree = `${edu.degree}${
                edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""
              }`;

              return `
                <section class="simple-item">
                  <h3 class="item-title">${escapeHtml(degree)}</h3>
                  <p class="meta">${escapeHtml(edu.school)} | ${escapeHtml(
                edu.startDate
              )} - ${escapeHtml(edu.endDate)}</p>
                </section>
              `;
            })
            .join("")}
        `
        : "";

    const certificationsHtml =
      certifications.length > 0
        ? `
          <h2 class="section-title">Certifications</h2>
          ${certifications
            .map(
              (cert) => `
                <section class="simple-item">
                  <h3 class="item-title">${escapeHtml(cert.name)}</h3>
                  <p class="meta">${escapeHtml(
                    cert.institution
                  )} | ${escapeHtml(cert.startDate)} - ${escapeHtml(
                cert.endDate
              )}</p>
                  ${
                    cert.credentialId
                      ? `<p class="meta">${escapeHtml(cert.credentialId)}</p>`
                      : ""
                  }
                  ${
                    cert.credentialUrl
                      ? `<a href="${escapeHtml(
                          cert.credentialUrl
                        )}">View Credential</a>`
                      : ""
                  }
                </section>
              `
            )
            .join("")}
        `
        : "";

    const projectsHtml =
      projects.length > 0
        ? `
          <h2 class="section-title">Projects</h2>
          ${projects
            .map(
              (project) => `
                <section class="simple-item">
                  <h3 class="item-title">${escapeHtml(project.name)}</h3>
                  <p class="project-description">${escapeHtml(
                    project.description
                  )}</p>
                  ${
                    project.url
                      ? `<a href="${escapeHtml(
                          normalizeUrl(project.url)
                        )}">View Project</a>`
                      : ""
                  }
                </section>
              `
            )
            .join("")}
        `
        : "";

    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
  
    <script>
      window.PagedConfig = { auto: false };
    </script>
  
    <script src="https://unpkg.com/pagedjs@0.4.3/dist/paged.polyfill.js"></script>
    <style>
  @page {
    size: A4;
    margin: 14mm 10mm;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100%;
    background: #09090b;
    font-family: Arial, sans-serif;
    color: #111827;
    overflow-x: auto;
  }

  * {
    box-sizing: border-box;
  }

  .cv-doc {
    color: #111827;
    font-family: Arial, sans-serif;
    font-size: 14px;
    line-height: 1.35;
  }

  .name {
    font-size: 24px;
    font-weight: 700;
    margin: 0;
  }

  .title {
    font-size: 18px;
    color: #4b5563;
    margin: 4px 0 0;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 0 8px;
    font-size: 14px;
    color: #6b7280;
    margin-top: 4px;
  }

  .links a {
    color: #6b7280;
    text-decoration: none;
  }

  .about,
  .project-description {
    white-space: pre-wrap;
  }

  .about,
  .project-description {
    text-align: justify;
  }

  .description {
    font-size: 14px;
    color: #374151;
    text-align: left;
  }

  .description-paragraph {
    margin: 0 0 12px;
    break-inside: auto;
  }

  .about {
    margin-top: 8px;
    color: #4b5563;
  }

  .section-title {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #d1d5db;
    padding-top: 20px;
    padding-bottom: 4px;
    margin: 0;
    break-after: avoid;
  }

  .experience-block {
    padding-top: 8px;
    padding-bottom: 12px;
    break-inside: auto;
  }

  .item-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 4px;
    break-after: avoid;
  }

  .meta {
    font-size: 14px;
    color: #4b5563;
    margin: 0 0 4px;
    break-after: avoid;
  }

  .skills-list,
  .languages-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 40px;
    padding-left: 18px;
    padding-top: 8px;
    margin: 0;
  }

  .skills-list li,
  .languages-list li {
    font-size: 14px;
    color: #374151;
  }

  .simple-item {
    padding-top: 8px;
    padding-bottom: 12px;
  }

  /* Preview generated by Paged.js */
  .pagedjs_pages {
    width: 100%;
    min-height: 100vh;

    background: #09090b;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  /*
    Fix del espacio blanco derecho:
    Paged.js genera varias capas alrededor de la hoja.
    Forzamos esas capas principales al ancho A4 exacto.
  */
  .pagedjs_page,
  .pagedjs_sheet,
  .pagedjs_pagebox {
    width: 210mm !important;
    min-width: 210mm !important;
    max-width: 210mm !important;
    background: white;
    overflow: hidden;
    box-sizing: border-box;
  }

  .pagedjs_page {
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
  }

  .pagedjs_area,
  .pagedjs_page_content,
  .pagedjs_page_content > div {
    background: white;
  }

  .pagedjs_bleed,
  .pagedjs_marks-crop,
  .pagedjs_marks-middle,
  .pagedjs_margin-top-left-corner-holder,
  .pagedjs_margin-top-right-corner-holder,
  .pagedjs_margin-bottom-left-corner-holder,
  .pagedjs_margin-bottom-right-corner-holder {
    display: none !important;
  }

  @media print {
    html,
    body {
      background: white;
      overflow: visible;
    }

    .pagedjs_page,
    .pagedjs_sheet,
    .pagedjs_pagebox {
      width: auto !important;
      min-width: auto !important;
      max-width: none !important;
      background: white;
      box-shadow: none;
      overflow: visible;
    }


  }
</style>
  </head>
  
  <body>
    <article class="cv-doc">
      <header>
        <h1 class="name">${escapeHtml(safeBasicInfo.fullName)}</h1>
        <p class="title">${escapeHtml(safeBasicInfo.title)}</p>
  
        ${
          links.length > 0
            ? `<div class="links">
                ${links
                  .map((link, index) => {
                    const last = index === links.length - 1;
                    const href = toHref(link.url);
                    const isPhone = isPhoneHref(href);

                    if (isPhone) {
                      return `<span>${escapeHtml(link.url)}${
                        !last ? " •" : ""
                      }</span>`;
                    }

                    return `<span><a href="${escapeHtml(href)}">${escapeHtml(
                      link.label
                    )}</a>${!last ? " •" : ""}</span>`;
                  })
                  .join("")}
              </div>`
            : ""
        }
  
        ${
          safeBasicInfo.about
            ? `<p class="about">${escapeHtml(safeBasicInfo.about)}</p>`
            : ""
        }
      </header>
  
      ${experienceHtml}
      ${skillsHtml}
      ${languagesHtml}
      ${educationHtml}
      ${certificationsHtml}
      ${projectsHtml}
    </article>
  
      <script>
      window.addEventListener("load", async () => {
        try {
          await window.PagedPolyfill.preview();

          const pages = document.querySelectorAll(".pagedjs_page").length;

          window.parent.postMessage({
            type: "PAGED_PREVIEW_READY",
            pages
          }, "*");
        } catch (error) {
          console.error("Paged preview failed", error);
        }
      });
    </script>
  </body>
  </html>
  `;
  }, [
    safeBasicInfo,
    links,
    experiences,
    education,
    skills,
    languages,
    certifications,
    projects,
  ]);

  React.useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "PAGED_PREVIEW_READY") {
        setPageCount(event.data.pages || 1);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleExportPdf = async () => {
    try {
      await fetch("/api/analytics/pdf-export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pages: pageCount,
        }),
      });
    } catch (error) {
      console.error("Failed to track pdf export", error);
    }

    iframeRef.current?.contentWindow?.print();
  };

  return (
    <div className="flex flex-1 flex-col h-full overflow-y-auto overflow-x-hidden relative bg-neutral-950">
      <div className="absolute top-8 right-4 z-30 group">
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

      <iframe
        ref={iframeRef}
        title="CV Preview"
        srcDoc={html}
        className="w-full h-full bg-neutral-950 border-0"
      />
    </div>
  );
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDescription(value: unknown) {
  return String(value ?? "")
    .split(/\n\s*\n/)
    .map((paragraph) => {
      const html = escapeHtml(paragraph).replaceAll("\n", "<br />");
      return `<p class="description-paragraph">${html}</p>`;
    })
    .join("");
}

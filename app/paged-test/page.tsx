// app/paged-test/page.tsx
"use client";

import Script from "next/script";
import { useRef } from "react";

declare global {
  interface Window {
    PagedPolyfill?: {
      preview: () => Promise<unknown>;
    };
  }
}

export default function PagedTestPage() {
  const hasRun = useRef(false);

  const runPaged = async () => {
    if (hasRun.current) return;
    hasRun.current = true;

    try {
      await window.PagedPolyfill?.preview();
      console.log("Paged polyfill finished");
    } catch (err) {
      console.error("Paged polyfill failed", err);
    }
  };

  return (
    <>
      <Script id="paged-config" strategy="beforeInteractive">
        {`
      window.PagedConfig = {
        auto: false
      };
    `}
      </Script>

      <Script
        src="https://unpkg.com/pagedjs@0.4.3/dist/paged.polyfill.js"
        strategy="afterInteractive"
        onLoad={runPaged}
      />

      <style>{`
    @page {
      size: A4;
      margin: 16mm;
    }

    body {
      background: #111;
    }

    header,
    footer,
    nav {
      display: none !important;
    }

    .paged-source {
      color: black;
    }

    .pagedjs_page {
      background: white;
      margin: 24px auto;
    }
  `}</style>

      <main className="paged-source">
        <article>
          <h1>Hello world</h1>
          <p>This is a paged.js polyfill test.</p>
        </article>
      </main>
    </>
  );
}

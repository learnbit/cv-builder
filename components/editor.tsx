"use client";

import CVPreview from "@/components/cv-preview";
import CvEdit from "@/components/cv-edit/cv-edit";
import { cvReducer } from "@/components/cv-edit/reducer";
import { mockCv } from "@/lib/mock-data";
import { useEffect, useReducer } from "react";
import { CvType } from "@/lib/types";
import { saveCV } from "@/app/actions/save-cv";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function Main({
  userId,
  initialCv,
}: {
  userId: string;
  initialCv: CvType | null;
}) {
  const [cvState, dispatch] = useReducer(cvReducer, initialCv ?? mockCv);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(`cv-${userId}`, JSON.stringify(cvState));
      saveCV(userId, cvState);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [cvState, userId]);

  return (
    <main className="flex-1 min-h-0 overflow-hidden p-6">
      {/* Mobile / tablet / medium desktop layout */}
      <div className="min-[1700px]:hidden h-full">
        <Tabs defaultValue="edit" className="flex h-full flex-col">
          <TabsList
            className="
              grid w-full grid-cols-2
              bg-muted
              rounded-lg
              h-12
              p-1
              border border-border
              shrink-0
            "
          >
            <TabsTrigger
              value="edit"
              className="
                h-full
                text-base font-semibold
                transition-all duration-200
                data-[state=active]:bg-background
                data-[state=active]:shadow-sm
                data-[state=inactive]:text-muted-foreground
              "
            >
              Editor
            </TabsTrigger>

            <TabsTrigger
              value="preview"
              className="
                h-full
                text-base font-semibold
                transition-all duration-200
                data-[state=active]:bg-background
                data-[state=active]:shadow-sm
                data-[state=inactive]:text-muted-foreground
              "
            >
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="edit"
            className="flex-1 min-h-0 overflow-y-auto mt-6"
          >
            <CvEdit data={cvState} dispatch={dispatch} />
          </TabsContent>

          <TabsContent
            value="preview"
            className="flex-1 min-h-0 overflow-auto mt-6"
          >
            <CVPreview data={cvState} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Large desktop layout: only when A4 preview has enough width */}
      <div className="hidden min-[1700px]:grid h-full grid-cols-2 gap-6">
        <div className="min-h-0 overflow-hidden">
          <CvEdit data={cvState} dispatch={dispatch} />
        </div>

        <div className="min-h-0 overflow-hidden">
          <CVPreview data={cvState} />
        </div>
      </div>
    </main>
  );
}

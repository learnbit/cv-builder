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
    <main className="flex-1 min-h-0 grid md:grid-cols-2 overflow-x-hidden gap-6 px-6">
      <div className="md:hidden col-span-2">
        <Tabs defaultValue="edit" className="w-full">
          <TabsList
            className="
            grid w-full 
            grid-cols-2
            bg-muted
            rounded-lg
            h-12
            p-1
            border border-border
          "
          >
            <TabsTrigger
              value="edit"
              className="h-full
              text-base font-semibold
              transition-all duration-200
              data-[state=active]:bg-background
              data-[state=active]:shadow-sm
              data-[state=inactive]:text-muted-foreground"
            >
              Editor
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="h-full
              text-base font-semibold
              transition-all duration-200
              data-[state=active]:bg-background
              data-[state=active]:shadow-sm
              data-[state=inactive]:text-muted-foreground"
            >
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="flex-1 min-h-0 overflow-y-auto">
            <CvEdit data={cvState} dispatch={dispatch} />
          </TabsContent>

          <TabsContent
            value="preview"
            className="flex-1 min-h-0 overflow-y-auto"
          >
            <CVPreview data={cvState} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden md:block min-h-0 overflow-hidden">
        <CvEdit data={cvState} dispatch={dispatch} />
      </div>

      <div className="hidden md:block min-h-0 overflow-hidden">
        <CVPreview data={cvState} />
      </div>
    </main>
  );
}

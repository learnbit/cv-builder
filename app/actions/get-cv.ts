"use server";

import { prisma } from "@/lib/prisma";
import { CvType } from "@/lib/types";

export async function getCV(userId: string): Promise<CvType | null> {
  if (!userId) throw new Error("userId is required");

  const cv = await prisma.cv.findUnique({
    where: { userId },
  });

  if (!cv) {
    return null;
  }

  return cv.data as CvType;
}

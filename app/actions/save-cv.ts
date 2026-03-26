"use server";

import { prisma } from "@/lib/prisma";
import { CvType } from "@/lib/types";
import { Prisma } from "@/lib/generated/prisma/client";

export async function saveCV(userId: string, data: CvType) {
  if (!userId) throw new Error("userId is required");
  if (!data) throw new Error("data is required");

  const jsonData = data as Prisma.InputJsonValue;

  return prisma.cv.upsert({
    where: { userId },
    update: {
      data: jsonData,
    },
    create: {
      userId,
      data: jsonData,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    select: {
      data: true,
    },
  });
}

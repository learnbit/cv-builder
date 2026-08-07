"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma/client";

type TrackEventInput = {
  name: "pdf_exported";
  metadata?: Record<string, unknown>;
};

export async function trackEvent(input: TrackEventInput) {
  const { userId } = await auth();

  await prisma.event.create({
    data: {
      name: input.name,
      userId: userId ?? null,
      metadata: input.metadata
        ? (input.metadata as Prisma.InputJsonValue)
        : Prisma.JsonNull,
    },
  });
}

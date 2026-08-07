import { NextResponse } from "next/server";
import { trackEvent } from "@/app/actions/track-event";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const safeMetadata = body && typeof body === "object" ? body : undefined;

  await trackEvent({
    name: "pdf_exported",
    metadata: safeMetadata,
  });

  return NextResponse.json({ success: true });
}

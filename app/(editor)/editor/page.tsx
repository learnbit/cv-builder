import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Editor from "@/components/editor";
import { getCV } from "@/app/actions/get-cv";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const initialCv = await getCV(userId);

  return <Editor userId={userId} initialCv={initialCv} />;
}

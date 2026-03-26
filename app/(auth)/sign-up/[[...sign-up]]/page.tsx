import { SignUp } from "@clerk/nextjs";
import AuthSell from "../../auth-sell";

export default function Page() {
  return (
    <AuthSell>
      <SignUp
        routing="path"
        path="/sign-up"
        appearance={{
          elements: {
            rootBox: "w-full",
            card: "w-full bg-neutral-950 border border-white/10 shadow-2xl rounded-2xl",
            headerTitle: "text-white text-2xl font-semibold",
            headerSubtitle: "text-neutral-400",
            socialButtonsBlockButton:
              "bg-transparent border border-white/10 hover:bg-white/5 text-white shadow-none",
            socialButtonsBlockButtonText: "text-white font-medium",
            dividerLine: "bg-white/10",
            dividerText: "text-neutral-500",
            formFieldLabel: "text-neutral-300",
            formFieldInput:
              "bg-neutral-900 border border-white/10 text-white placeholder:text-neutral-500 focus:border-white/20 focus:ring-0",
            formButtonPrimary:
              "bg-white text-black hover:bg-neutral-200 shadow-none",
            footerActionText: "text-neutral-400",
            footerActionLink: "text-white hover:text-neutral-300",
            alertText: "text-red-400",
            formResendCodeLink: "text-white hover:text-neutral-300",
            identityPreviewText: "text-white",
          },
        }}
      />
    </AuthSell>
  );
}

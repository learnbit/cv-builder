import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { ui } from "@clerk/ui";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV Builder",
  description: "Modern CV builder with real-time preview and PDF export",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground grid grid-rows-[100px_1fr_100px] h-screen`}
      >
        <ClerkProvider
          ui={ui}
          afterSignOutUrl="/sign-in"
          appearance={{
            elements: {
              /* ===== User button popup ===== */
              userButtonPopoverCard:
                "bg-neutral-950 border border-white/10 shadow-2xl rounded-2xl overflow-hidden",
              userButtonPopoverMain: "bg-neutral-950 text-white",
              userButtonPopoverActions: "bg-neutral-950",
              userButtonPopoverActionButton:
                "text-white hover:bg-white/5 transition-colors",
              userButtonPopoverActionButtonText: "text-white",
              userButtonPopoverActionButtonIcon: "text-neutral-300",

              userPreview: "bg-neutral-950",
              userPreviewTextContainer: "text-white",
              userPreviewMainIdentifier: "text-white font-medium",
              userPreviewSecondaryIdentifier: "!text-neutral-300 !opacity-100",

              /* ===== User profile modal ===== */
              userProfileRoot: "text-white",
              userProfileCard:
                "bg-neutral-950 border border-white/10 rounded-2xl shadow-2xl",
              pageScrollBox: "bg-neutral-950",

              navbar: "bg-neutral-950 border-r border-white/10",
              navbarButton:
                "text-neutral-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors",
              navbarButtonActive: "bg-white/10 text-white rounded-lg",

              profileSection: "border-white/10",
              avatarBox: "ring-1 ring-white/10",
            },
          }}
        >
          <Header />
          {children}
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}

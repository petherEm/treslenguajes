import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import ExitModal from "@/components/modals/ExitModal";
import HeartsModal from "@/components/modals/HeartsModal";
import PracticeModal from "@/components/modals/PracticeModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tres Lenguajes - Inspired by Code With Antonio",
  description: "Tres Lenguajes - Inspired by Code With Antonio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

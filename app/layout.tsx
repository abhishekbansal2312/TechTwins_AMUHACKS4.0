import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Footer from "../components/common/footer";
import Header from "../components/common/header";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { AgentSupport } from "@/components/support/agent-support";

const fontsans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Confidential Crusaders",
  description:
    "Confidential Crusaders is an app to Confidential Crusaders text.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${fontsans.variable} font-sans  antialiased`}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className=" flex-1">{children}</main>
            <Footer />
            <AgentSupport />
          </div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

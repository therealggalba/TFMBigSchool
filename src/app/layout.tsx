import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TFMv1 - Local LLM Chat",
  description: "Master Thesis Project - Local LLM Dialogue",
};

import { WebLLMProviderContext } from "@/lib/contexts/web-llm-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.variable}>
        <WebLLMProviderContext>
          {children}
        </WebLLMProviderContext>
      </body>
    </html>
  );
}

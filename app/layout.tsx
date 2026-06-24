import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist_Mono, Libre_Caslon_Text, Cabin } from "next/font/google";
import Navbar from "@/components/navbar";
import RootWrapper from "@/hooks/root-wrapper";
import "./globals.css";

const serifFont = Libre_Caslon_Text({ subsets: ["latin"], variable: "--font-heading", weight: "400" });
const sansFont = Cabin({ subsets: ["latin"], variable: "--font-sans", weight: "400" });
const monoFont = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

type RootLayoutProps = { children: ReactNode };

export const metadata: Metadata = {
  title: "Starter Template",
  description: "Custom Next.js 16 template with responsive image, form builder and nano cli",
  icons: [
    {
      "url": "/image.png",
      "sizes": "64x64",
      "type": "image/png"
    }
  ]
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" className={`antialiased ${monoFont.variable} font-sans ${sansFont.variable} ${serifFont.variable}`}>
      <body className="min-h-full flex flex-col">
        <RootWrapper>
          <Navbar />
          {children}
        </RootWrapper>
      </body>
    </html>
  );
}

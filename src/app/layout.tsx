import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Niraj Singh — Senior Software Engineer",
  description:
    "Backend engineer who thinks in systems, writes in Java, and draws architecture diagrams at 3am. Excalidraw-themed portfolio.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Niraj Singh — Senior Software Engineer",
    description:
      "Backend engineer who thinks in systems. Interactive Excalidraw-themed portfolio built as a system design diagram.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Niraj Singh — Senior Software Engineer",
    description:
      "Backend engineer who thinks in systems. Interactive Excalidraw-themed portfolio.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

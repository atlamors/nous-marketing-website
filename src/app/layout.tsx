import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter"
});

const firaCode = Fira_Code({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-fira-code"
});

export const metadata: Metadata = {
  title: {
    default: "Nous — Your personal agent, from chat to operating system",
    template: "%s | Nous"
  },
  description:
    "Nous is an open-source, local-first AI workspace where agents remember, run workflows, ask for approval, and improve under your control."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${firaCode.variable}`}>{children}</body>
    </html>
  );
}

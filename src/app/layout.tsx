import type { Metadata } from "next";
import { Manrope, Zilla_Slab } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["400", "500", "600", "700"],
});

const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  variable: "--font-accent",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Budgeting Web Application",
  description:
    "A smart budgeting platform for tracking income, expenses, bills, debt, savings projections, and financial scenarios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${zillaSlab.variable}`}>
      <body>{children}</body>
    </html>
  );
}

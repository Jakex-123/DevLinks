// app/RootLayout.tsx

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const InstrumentSans = localFont({
  src: "../fonts/InstrumentSans-VariableFont_wdth,wght.ttf",
  variable: "--font-instrument-sans",
  weight: "400 600 700",
});

export const metadata: Metadata = {
  title: "DevLinks",
  description: "An application designed to help developers manage and share their links to various online resources.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` ${InstrumentSans.variable} bg-background`}>
        {children}
      </body>
    </html>
  );
}

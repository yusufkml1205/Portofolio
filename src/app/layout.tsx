import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yusuf Kamil - Portfolio",
  description: "ERP Technical Consultant & Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={bricolageGrotesque.className}>
        {/* TIDAK ADA HEADER DI ROOT LAYOUT */}
        {children}
        {/* TIDAK ADA FOOTER DI ROOT LAYOUT */}
      </body>
    </html>
  );
}

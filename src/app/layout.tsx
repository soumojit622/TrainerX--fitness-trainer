import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import MainNavbar from "@/components/MainNavbar";
// import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrainerX - AI-Powered Fitness Revolution",
  description: "Unlock your full potential with personalized fitness and nutrition plans, driven by cutting-edge AI technology.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* <MainNavbar /> */}
          {/* GRID BACKGROUND */}
          <div className="fixed inset-0 -z-1">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background"></div>
            <div className="absolute inset-0 bg-[linear-gradient(var(--cyber-grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--cyber-grid-color)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </div>

          <main className="min-h-screen">{children}</main>
          {/* <Footer /> */}
        </body>
      </html>
    </ConvexClerkProvider>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { cn } from "@/utils/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rupee Clicker",
  description:
    "Afk clicker game where the goal is to increase your Rupee income as much as possible.",
};

const fontSans = localFont({
  src: "../../assets/fonts/TASAOrbiterVF.woff2",
  variable: "--font-sans",
});

const fontHeading = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

const fontLink = localFont({
  src: "../../assets/fonts/Bowman.ttf",
  variable: "--font-link",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased overflow-x-hidden",
          fontSans.variable,
          fontHeading.variable,
          fontLink.variable,
        )}
        suppressHydrationWarning={true}>
        <main className={`min-h-screen ${inter.className}`}>{children}</main>
      </body>
    </html>
  );
}

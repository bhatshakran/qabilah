import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StreakProvider } from "./contexts/streakContext";
import { AuthProvider } from "./contexts/authContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Qabilah | Master Arabic through Context",
    template: "%s | Qabilah",
  },
  description:
    "Experience Arabic through classical poetry, historical narratives, and a spatial curriculum. Master the top 1000 words with our interactive frequency-based map.",
  keywords: [
    "Arabic language",
    "Learn Arabic",
    "Classical Arabic",
    "Arabic Poetry",
    "Language Learning App",
  ],
  authors: [{ name: "Qabilah Team" }],
  creator: "Qabilah Team",
  openGraph: {
    title: "Qabilah | Master Arabic through Context",
    description:
      "Unlock the eloquence of Arabic with a spatial map and interactive literature.",
    url: "https://qabilah.vercel.app",
    siteName: "Qabilah",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qabilah | Master Arabic through Context",
    description: "Master the top 1000 Arabic words through history and poetry.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <StreakProvider>{children}</StreakProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

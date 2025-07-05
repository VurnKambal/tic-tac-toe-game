import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Space Battle Tic-Tac-Toe",
  description:
    "A fun and playful space-themed Tic-Tac-Toe game featuring rockets and aliens!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        suppressHydrationWarning
      >
        <div
          className="fixed inset-0 -z-10"
          style={{
            background: `
              linear-gradient(to bottom right, rgba(0,0,0,0.92), rgba(19,21,26,0.92)),
              radial-gradient(circle at top left, rgba(37,99,235,0.15) 0%, transparent 60%),
              radial-gradient(circle at top right, rgba(168,85,247,0.15) 0%, transparent 60%)
            `,
          }}
        />
        <div className="space-background" />
        <div className="space-glow" />
        <main className="min-h-screen flex items-center justify-center">
          {children}
        </main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "AI Code Generator | Powered by Mimo V2.5 Pro",
  description:
    "Generate production-ready code from natural language descriptions. Supports Python, JavaScript, TypeScript, Solidity, Rust, Go, Java, and C++.",
  keywords: [
    "AI code generator",
    "code generation",
    "Mimo V2.5 Pro",
    "programming assistant",
    "developer tools",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

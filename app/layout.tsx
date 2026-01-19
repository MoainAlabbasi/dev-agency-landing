import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEXUS | We Build The Future",
  description: "A state-of-the-art dev agency crafting futuristic digital experiences",
  keywords: ["web development", "design agency", "digital experiences", "WebGL", "creative development"],
  authors: [{ name: "NEXUS Agency" }],
  openGraph: {
    title: "NEXUS | We Build The Future",
    description: "A state-of-the-art dev agency crafting futuristic digital experiences",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lenis">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}

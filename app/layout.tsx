import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import { Toaster } from "sonner";
import { ErrorBoundary } from "@/components/error-boundary";

export const metadata: Metadata = {
  metadataBase: new URL("https://masteringbackend.com"),
  title: {
    default: "MasteringBackend — Backend, AI & Engineering Courses",
    template: "%s | MasteringBackend",
  },
  description:
    "Master backend development with structured courses, projects, and learning paths. Learn backend engineering, AI, cloud, DevOps, and more.",
  keywords: [
    "backend engineering",
    "backend courses",
    "learn backend development",
    "API development",
    "Node.js courses",
    "software engineering",
    "cloud engineering",
    "DevOps",
    "AI engineering",
  ],
  authors: [{ name: "MasteringBackend" }],
  creator: "MasteringBackend",
  publisher: "MasteringBackend",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    siteName: "MasteringBackend",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@masteringbackend",
    creator: "@masteringbackend",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="masteringbackend-theme"
        >
          {/* <Toaster /> */}
          <ErrorBoundary>{children}</ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}

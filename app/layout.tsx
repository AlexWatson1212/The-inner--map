import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://theinnermap.co.uk"),
  title: {
    default: "The Inner Map — Understand your mind. Build a life that fits.",
    template: "%s — The Inner Map",
  },
  description:
    "A practical, non-diagnostic field guide for neurodivergent adults who want to understand their patterns, capacity and needs.",
  applicationName: "The Inner Map",
  keywords: [
    "neurodivergent self-understanding",
    "ADHD adults",
    "autistic adults",
    "AuDHD",
    "capacity mapping",
    "masking",
    "burnout",
  ],
  authors: [{ name: "The Inner Map" }],
  creator: "Alexander Watson",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "The Inner Map",
    title: "Understand what changes. Build around what helps.",
    description:
      "A calm, practical field guide for learning how your mind works and building a life that fits.",
    url: "https://theinnermap.co.uk",
    images: [
      {
        url: "/brand/social-share.png",
        width: 1200,
        height: 630,
        alt: "The Inner Map — Understand what changes. Build around what helps.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Inner Map",
    description: "Understand your mind. Map your patterns. Build a life that fits.",
    images: ["/brand/social-share.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  other: {
    "codex-preview": "development",
  },
};

export const viewport: Viewport = {
  themeColor: "#f2f7f6",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}

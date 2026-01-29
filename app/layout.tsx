import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tailored Spirits | We create extraordinary",
  description: "Design your bottling with Tailored Spirits. Your cask, your spirit, your creation - bespoke whisky experiences crafted for you.",
  metadataBase: new URL('https://tailored-spirits.vercel.app'),
  openGraph: {
    title: "Tailored Spirits | We create extraordinary",
    description: "Design your bottling with Tailored Spirits. Your cask, your spirit, your creation - bespoke whisky experiences crafted for you.",
    images: [
      {
        url: "/tailored-spirits-og.png",
        width: 1200,
        height: 630,
        alt: "Tailored Spirits",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tailored Spirits | We create extraordinary",
    description: "Design your bottling with Tailored Spirits. Your cask, your spirit, your creation - bespoke whisky experiences crafted for you.",
    images: ["/tailored-spirits-og.png"],
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
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

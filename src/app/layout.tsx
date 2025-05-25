import "../assets/styles/globals.css";

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Latam Airlines",
  keywords: ["Latam", "Airlines", "Next.js", "React"],
  authors: [{ name: "Latam Airlines" }],
  creator: "Latam Airlines",
  description: "User management system for Latam Airlines",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        {children}
        <Toaster position="bottom-left" closeButton expand={false} />
      </body>
    </html>
  );
}

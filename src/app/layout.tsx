import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instagram",
  description: "Instagram Clone by Yayan Faturrohman",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.instagram.com/",
    title: "Instagram Clone",
    description: "Instagram Clone by Yayan Faturrohman",
    images: [
      {
        url: "/favicon-32x32.png",
      },
    ],
  },
  authors: [
    {
      name: "Yayan Faturrohman",
      url: "https://github.com/yayanfr20",
    },
  ],
  manifest: "/manifest.json",
  icons: { apple: "/apple-touch-icon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

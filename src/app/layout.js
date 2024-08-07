import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Instagram",
  description: "Instagram Clone By yayandev.com",

  openGraph: {
    title: "Instagram",
    description: "Instagram Clone By yayandev.com",
    url: "https://instagram-clone-yayandev.vercel.app",
    siteName: "Instagram",
    images: [
      {
        url: "/android-chrome-192x192.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "in",
    type: "website",
    icons: {
      url: "/android-chrome-192x192.png",
      type: "image/png",
      sizes: "192x192",
      alt: "Instagram",
    },
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

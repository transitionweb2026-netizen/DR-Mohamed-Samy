import type { Metadata } from "next";
import { Anton, Archivo_Narrow, Be_Vietnam_Pro } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

// The original pages loaded these exact families/weights from Google Fonts
// via <link> tags. next/font self-hosts the same families/weights instead,
// which preserves the visual result while avoiding an external render-
// blocking request (a like-for-like technical upgrade, not a font change).
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const archivoNarrow = Archivo_Narrow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-archivo-narrow",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumina Liver Care - Dr. Mohamed Samy Abdelwahid",
  description:
    "Consultant Hepatobiliary & Liver Transplant Surgeon - advanced liver surgery, transplantation and treatment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`scroll-smooth ${anton.variable} ${archivoNarrow.variable} ${beVietnamPro.variable}`}
      lang="en"
    >
      <head>
        {/* Material Symbols is not a standard next/font Google family, so it
            keeps its original <link> tag exactly as every source page had it. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body-md text-on-background bg-background relative overflow-x-hidden min-h-screen antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

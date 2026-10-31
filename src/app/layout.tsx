import type { Metadata } from "next";
import { Libre_Baskerville, Source_Sans_3 } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const heading = Libre_Baskerville({
  variable: "--font-heading",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://www.${site.domain}`),
  title: {
    default: `${site.name} | Handmade flag art for veterans`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

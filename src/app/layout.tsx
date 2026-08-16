import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Noto_Sans_Kannada } from "next/font/google";
import { weddingConfig } from "@/config/wedding";
import { InvitationProvider } from "@/components/providers/InvitationProvider";
import { ContentProtection } from "@/components/providers/ContentProtection";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const kannada = Noto_Sans_Kannada({
  subsets: ["kannada"],
  weight: ["300", "400", "500"],
  variable: "--font-kannada",
  display: "swap",
});

const title = `${weddingConfig.groom.shortName} & ${weddingConfig.bride.shortName} — Wedding Invitation`;
const description =
  "With joy in our hearts, we invite you to celebrate our wedding.";

export const metadata: Metadata = {
  metadataBase: new URL(weddingConfig.site.url),
  title,
  description,
  applicationName: title,
  keywords: [
    "wedding invitation",
    weddingConfig.groom.shortName,
    weddingConfig.bride.shortName,
    "Kerala wedding",
    weddingConfig.wedding.venue,
  ],
  openGraph: {
    title,
    description,
    type: "website",
    url: weddingConfig.site.url,
    siteName: title,
    // The share image comes from app/opengraph-image.tsx, so it is always
    // generated and always matches wedding.ts. Setting `images` here would
    // override that file convention.
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#f8f3e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} ${kannada.variable}`}>
      <body>
        <InvitationProvider>
          <ContentProtection />
          {children}
        </InvitationProvider>
      </body>
    </html>
  );
}

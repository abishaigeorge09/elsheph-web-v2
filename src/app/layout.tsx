import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import PortalFix from "@/components/PortalFix";
import SiteHeader from "@/components/layout/SiteHeader";
import ConditionalFooter from "@/components/layout/ConditionalFooter";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/content/site";

/**
 * The type pairing lives behind two variables, --font-display and --font-body,
 * so swapping either family is a change to this file alone. globals.css never
 * names a font family directly.
 *
 * The reference (a16z.com) sets its display serif in Orpheus Pro and its sans
 * role in the Domaine family, both Klim Type Foundry faces under commercial
 * license. They cannot legally be embedded here — same constraint that ruled
 * out museo-sans on the previous pass. Free substitutes, chosen and justified
 * rather than defaulted to:
 *
 * - Fraunces for the display serif role, loaded as a VARIABLE font. Next 16's
 *   Fraunces typing rejects a "300 600" range string, so weight is "variable"
 *   (the full wght axis — the type scale's 380/420 registers render as true
 *   variable weights instead of snapping to static instances) plus the opsz,
 *   SOFT and WONK axes. opsz is what gives the face its warmth at display
 *   sizes — globals.css sets `font-optical-sizing: auto` to engage it. Weight
 *   300 is inside the loaded range but banned from the type scale (it shimmers
 *   on cream at Retina scaling); the scale starts at 380.
 * - Inter for the sans/UI role: nav, filters, buttons, eyebrows. Neutral,
 *   does not compete with the serif, and is not the face the previous rebuild
 *   pass used (Inter Tight), so this reads as its own system rather than a
 *   reskin of the last one.
 *
 * Playfair Display was ruled out earlier this session as an overused default
 * for this exact role.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  /* 300 is the .prose long-form weight (the audit's body register). */
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: site.description,
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        <PortalFix />
        <SiteHeader />
        <main id="top">{children}</main>
        {/* The homepage bakes its own footer into the single non-scrolling
            viewport, so the global footer renders on every other route only.
            See ConditionalFooter for the reasoning. */}
        <ConditionalFooter />
        <Toaster />
      </body>
    </html>
  );
}

"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "@/components/layout/SiteFooter";

/**
 * The homepage bakes its footer into the single non-scrolling hero viewport
 * (small mark + tagline bottom-left, socials + legal bottom-right, no
 * separate scrollable footer section). See src/components/home/CrookLine.tsx.
 *
 * Every other route still needs the real, full footer: nav groups, contact
 * addresses, socials. Rather than forking layout.tsx per route, this one
 * client component decides at render time, so layout.tsx stays a plain
 * server component everywhere else.
 */
export default function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <SiteFooter />;
}

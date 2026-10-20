import type { Metadata } from "next";

/** Hero direction prototypes. Temporary, never indexed. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return children;
}

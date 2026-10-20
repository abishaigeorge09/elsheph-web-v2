import type { Metadata } from "next";
import ArchedWindows from "@/components/lab/b/ArchedWindows";

export const metadata: Metadata = {
  title: "Lab B: Arched windows",
};

/** Hero direction B: the brand's arches as windows onto real running products. */
export default function LabBPage() {
  return <ArchedWindows />;
}

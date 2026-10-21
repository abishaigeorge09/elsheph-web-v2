import type { Metadata } from "next";
import CrookLine from "@/components/lab/a/CrookLine";

export const metadata: Metadata = {
  title: "Lab A: The Crook line",
};

export default function LabAPage() {
  return <CrookLine />;
}

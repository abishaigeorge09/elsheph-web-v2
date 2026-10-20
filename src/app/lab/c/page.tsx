import type { Metadata } from "next";
import IdeaToRunning from "@/components/lab/c/IdeaToRunning";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Lab C, Idea to running | ${site.name}`,
};

export default function LabCPage() {
  return <IdeaToRunning />;
}

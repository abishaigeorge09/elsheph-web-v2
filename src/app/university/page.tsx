import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UniversityPage from "@/components/sections/UniversityPage";

export const metadata: Metadata = {
  title: "University Collaborations | Elsheph Systems",
  description:
    "Elsheph partners with universities to deliver structured training, product internships, verified certifications, and corporate placement pathways.",
};

export default function UniversityRoute() {
  return (
    <>
      <Navbar />
      <UniversityPage />
      <Footer />
    </>
  );
}

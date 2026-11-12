import type { Metadata } from "next";
import NewsletterBand from "@/components/layout/NewsletterBand";
import LabProjects from "@/components/products/LabProjects";
import ProductsView from "@/components/products/ProductsView";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Products | ${site.name}`,
  description: "Everything Elsheph has actually shipped, live and in progress.",
};

export default function ProductsPage() {
  return (
    <>
      <ProductsView />
      <div className="border-t border-border bg-page">
        <LabProjects />
      </div>
      <NewsletterBand />
    </>
  );
}

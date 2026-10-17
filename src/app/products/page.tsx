import type { Metadata } from "next";
import NewsletterBand from "@/components/layout/NewsletterBand";
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
      <NewsletterBand />
    </>
  );
}

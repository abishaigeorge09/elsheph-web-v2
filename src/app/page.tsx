import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import HowWeWork from "@/components/sections/HowWeWork";
import Products from "@/components/sections/Products";
import VisionMission from "@/components/sections/VisionMission";
import Partners from "@/components/sections/Partners";
import InvestorPositioning from "@/components/sections/InvestorPositioning";
import Contact from "@/components/sections/Contact";
import AnnouncementStrip from "@/components/sections/AnnouncementStrip";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";
export const revalidate = 0;
console.log("Homepage rendered at", Date.now());

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <HowWeWork />
      <Products />
      <VisionMission />
      <Partners />
      <InvestorPositioning />
      <Contact />
      <AnnouncementStrip />
      <Footer />
    </>
  );
}

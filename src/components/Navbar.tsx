"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B0B0B]/80 backdrop-blur-md border-b border-[#1C1C1C]"
          : "bg-transparent"
      }`}
    >
      <div className="relative max-w-6xl mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                const heroSection = document.getElementById("hero");
                if (heroSection) {
                  heroSection.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="cursor-pointer"
            >
              <Image
                src="/logos/elsheph-full.png"
                alt="Elsheph"
                width={140}
                height={40}
                className="h-[135px] w-auto"
                priority
              />
            </a>
          </div>

          {/* Center: Links */}
          <div className="hidden md:flex items-center gap-12 flex-1 justify-center">
            <a
              href="#services"
              className="text-sm font-medium text-[#FFFFFF] hover:text-[#A1A1A1] transition-colors duration-200"
            >
              Services
            </a>
            <a
              href="#company"
              className="text-sm font-medium text-[#FFFFFF] hover:text-[#A1A1A1] transition-colors duration-200"
            >
              Company
            </a>
          </div>

          {/* Right: Contact Button */}
          <div className="flex-shrink-0">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-8 py-2.5 rounded-full text-sm font-semibold bg-[#8B6F47] text-white hover:bg-[#6B5230] transition-all duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

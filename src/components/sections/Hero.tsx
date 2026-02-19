"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image - dominates the screen */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="Hero background"
          fill
          priority
          className={`object-cover transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          quality={90}
        />
        {/* Enhanced overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        {/* Bottom fade to dark for seamless transition */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/80 to-transparent" />
        {/* Subtle animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B6F47]/5 via-transparent to-[#8B6F47]/5 animate-pulse-slow" />
      </div>

      {/* Content - overlays lightly on image */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12 text-center">
        {/* Subtle product launch pill */}
        <a
          href="#products"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById("products");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className={`inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-xs font-medium tracking-wider uppercase mb-8 hover:bg-white/15 hover:text-white/90 transition-colors duration-300 transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          • Product Launch — March 31{" "}&gt;
        </a>

        {/* Headline - Large serif, editorial style (Playfair Display) - restrained sizing */}
        <h1
          className={`font-heading text-5xl sm:text-6xl lg:text-7xl font-normal text-white mb-4 lg:mb-6 leading-[1.1] tracking-tight transition-all duration-1000 delay-300 ${
            isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          Products built from ideas.
          <br />
          Shipped for the real world.
        </h1>

        {/* Subtext - Light weight, restrained (Inter) - smaller */}
        <p
          className={`text-base sm:text-lg lg:text-xl text-white/90 mb-6 lg:mb-10 max-w-2xl mx-auto leading-relaxed font-light transition-all duration-1000 delay-500 ${
            isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
        >
          Product development, IT services, and staffing
        </p>

        {/* Contact Us button - mobile only, below promise */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            const contactSection = document.getElementById("contact");
            if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
          }}
          className={`md:hidden inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-[#8B6F47] text-white hover:bg-[#6B5230] transition-all duration-200 shadow-lg shadow-[#8B6F47]/20 transition-all duration-1000 delay-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Contact Us
        </a>
      </div>

      {/* Scroll indicator */}
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          const contactSection = document.getElementById("contact");
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce cursor-pointer hover:text-white/80 transition-colors duration-200"
      >
        <svg
          className="w-6 h-6 text-white/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </a>
    </section>
  );
}

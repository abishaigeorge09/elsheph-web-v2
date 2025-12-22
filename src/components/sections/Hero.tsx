"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image - dominates the screen */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
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
        {/* Product Launch Banner */}
        <a
          href="#announcement-strip"
          onClick={(e) => {
            e.preventDefault();
            const announcementStrip = document.getElementById("announcement-strip");
            if (announcementStrip) {
              announcementStrip.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/40 backdrop-blur-sm hover:bg-gray-800/60 transition-all duration-300 mb-6 cursor-pointer ${
            isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ fontFamily: 'var(--font-body), Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
          <span className="text-xs text-white font-medium uppercase tracking-wide">
            Product Launch — December 24
          </span>
          <svg
            className="w-3 h-3 text-white transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
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
          className={`text-base sm:text-lg lg:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed font-light transition-all duration-1000 delay-500 ${
            isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
        >
          Product development, IT services, and staffing
        </p>

        {/* Single primary CTA */}
        <a
          href="#contact"
          className={`group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#8B6F47] text-white text-sm font-medium hover:bg-[#6B5230] focus:outline-none focus:ring-2 focus:ring-[#8B6F47]/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#8B6F47]/30 transition-all duration-1000 delay-700 ${
            isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          Contact Us
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
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

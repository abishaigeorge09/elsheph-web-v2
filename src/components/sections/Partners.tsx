"use client";

import ScrollAnimation from "@/components/ScrollAnimation";

export default function Partners() {
  return (
    <section className="relative bg-[#0B0B0B] text-white py-12 lg:py-16 overflow-hidden">
      {/* Top fade transition */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#0B0B0B] pointer-events-none z-10" />
      <div className="relative max-w-6xl mx-auto px-8 lg:px-12">
        <ScrollAnimation>
          <div className="text-center mb-8 lg:mb-12">
            <p className="text-xs text-[#A1A1A1] mb-4 uppercase tracking-wider font-medium">
              Technology Partner
            </p>
          </div>
        </ScrollAnimation>

        {/* Scrolling marquee container */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0B0B0B] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0B0B0B] to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling text */}
          <div className="flex animate-scroll">
            <div className="flex whitespace-nowrap">
              {/* Repeat the text multiple times for seamless loop */}
              {Array.from({ length: 10 }).map((_, i) => (
                <a
                  href="https://elberttech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  key={i}
                  className="flex items-center mx-8 lg:mx-12 group cursor-pointer"
                >
                  <span className="text-base lg:text-lg text-white/70 font-medium group-hover:text-[#8B6F47] transition-colors duration-300">
                    Elbert Technology
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#8B6F47]/30 mx-4 group-hover:bg-[#8B6F47] transition-colors duration-300" />
                </a>
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex whitespace-nowrap" aria-hidden="true">
              {Array.from({ length: 10 }).map((_, i) => (
                <a
                  href="https://elberttech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  key={i}
                  className="flex items-center mx-8 lg:mx-12 group cursor-pointer"
                >
                  <span className="text-base lg:text-lg text-white/70 font-medium group-hover:text-[#8B6F47] transition-colors duration-300">
                    Elbert Technology
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#8B6F47]/30 mx-4 group-hover:bg-[#8B6F47] transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0B0B0B] to-transparent pointer-events-none z-10" />
    </section>
  );
}

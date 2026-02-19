"use client";

import ScrollAnimation from "@/components/ScrollAnimation";

export default function Announcement() {
  return (
    <section className="relative bg-gradient-to-b from-[#FAFAF7] to-white py-40 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#8B6F47]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8B6F47]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="relative max-w-6xl mx-auto px-8 lg:px-12 text-center">
        {/* Pill Label */}
        <ScrollAnimation>
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-[#8B6F47]/10 border border-[#8B6F47]/20 mb-8 hover:bg-[#8B6F47]/15 transition-colors duration-300">
            <span className="text-xs font-medium text-[#8B6F47] tracking-wider uppercase">
              Announcement
            </span>
          </div>
        </ScrollAnimation>

        {/* Headline */}
        <ScrollAnimation delay={100}>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-medium mb-6 text-black">
            Introducing{" "}
            <a
              href="https://jobsudarshan.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B6F47] hover:text-[#6B5230] transition-colors duration-300"
            >
              Jobsudarshan.com
            </a>
          </h2>
        </ScrollAnimation>

        {/* Description */}
        <ScrollAnimation delay={200}>
          <p className="text-xl text-black/60 mb-6 max-w-3xl mx-auto leading-relaxed">
            A new platform focused on simplifying job discovery
          </p>
        </ScrollAnimation>

        {/* Status Highlight */}
        <ScrollAnimation delay={300}>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20 mb-12 hover:bg-green-500/15 transition-colors duration-300">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-sm font-medium text-green-600">
              Now Live
            </p>
          </div>
        </ScrollAnimation>

        {/* CTA Button */}
        <ScrollAnimation delay={400}>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-black/15 text-sm font-medium hover:border-[#8B6F47] hover:bg-[#8B6F47] hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#8B6F47]/20"
          >
            Get updates
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </ScrollAnimation>
      </div>
    </section>
  );
}


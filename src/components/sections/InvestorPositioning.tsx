"use client";

import ScrollAnimation from "@/components/ScrollAnimation";

export default function InvestorPositioning() {
  return (
    <section className="relative bg-[#0B0B0B] text-white py-24 lg:py-32">
      {/* Top fade transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0B0B0B] pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto px-8 lg:px-12">
        <div className="text-center max-w-4xl mx-auto">
          <ScrollAnimation>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#8B6F47]" />
              <span className="text-xs font-medium text-[#A1A1A1] uppercase tracking-wider">
                Investment
              </span>
            </div>
            
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-white mb-6 leading-tight">
              Built for Scale. Ready for Growth.
            </h2>
            
            <p className="text-lg text-[#A1A1A1] leading-relaxed mb-10 max-w-2xl mx-auto">
              Elsheph builds scalable digital products with disciplined execution. We are open to strategic investors who align with long term impact.
            </p>
            
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#8B6F47] text-white text-sm font-medium hover:bg-[#6B5230] focus:outline-none focus:ring-2 focus:ring-[#8B6F47]/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#8B6F47]/30"
            >
              Connect With Us
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </ScrollAnimation>
        </div>
      </div>
      
      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0B] to-transparent pointer-events-none" />
    </section>
  );
}

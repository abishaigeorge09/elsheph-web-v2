"use client";

import ScrollAnimation from "@/components/ScrollAnimation";
import Contact from "./Contact";

export default function UniversityCollaboration() {
  const whatWeOffer = [
    "Product based internships",
    "Structured engineering training",
    "Live product exposure",
    "Industry aligned mentorship",
    "Real world execution workflows",
  ];

  const whatWeSeek = [
    "Incubation support",
    "Access to student talent",
    "Academic collaboration",
    "Mentorship and ecosystem access",
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#0B0B0B] text-white py-24 lg:py-32">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0B0B0B] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-8 lg:px-12 text-center">
          <ScrollAnimation>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#8B6F47]" />
              <span className="text-xs font-medium text-[#A1A1A1] uppercase tracking-wider">
                University Partnerships
              </span>
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-normal text-white mb-6 leading-tight">
              Building With Universities
            </h1>
            <p className="text-xl text-[#A1A1A1] mb-4 max-w-3xl mx-auto leading-relaxed">
              Incubation, Internships, Training
            </p>
          </ScrollAnimation>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0B] to-transparent pointer-events-none" />
      </section>

      {/* What We Offer */}
      <section className="relative bg-[#0B0B0B] text-white py-24 lg:py-32">
        <div className="relative max-w-6xl mx-auto px-8 lg:px-12">
          <ScrollAnimation>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal mb-12 lg:mb-16 text-center text-white leading-tight">
              What We Offer
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {whatWeOffer.map((item, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="group p-6 rounded-xl bg-[#141414] border border-[#1C1C1C] hover:border-[#8B6F47]/30 transition-all duration-300 hover:bg-[#1a1a1a]">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1 text-[#8B6F47] group-hover:text-[#A67C52] transition-colors duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-[#A1A1A1] leading-relaxed text-sm lg:text-base group-hover:text-white/80 transition-colors duration-300">
                      {item}
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* What We Seek */}
      <section className="relative bg-[#0B0B0B] text-white py-24 lg:py-32">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0B0B0B] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-8 lg:px-12">
          <ScrollAnimation>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal mb-12 lg:mb-16 text-center text-white leading-tight">
              What We Seek From Universities
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {whatWeSeek.map((item, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="group p-6 rounded-xl bg-[#141414] border border-[#1C1C1C] hover:border-[#8B6F47]/30 transition-all duration-300 hover:bg-[#1a1a1a]">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1 text-[#8B6F47] group-hover:text-[#A67C52] transition-colors duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-[#A1A1A1] leading-relaxed text-sm lg:text-base group-hover:text-white/80 transition-colors duration-300">
                      {item}
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0B] to-transparent pointer-events-none" />
      </section>

      {/* CTA Section */}
      <section className="relative bg-[#0B0B0B] text-white py-24 lg:py-32">
        <div className="relative max-w-6xl mx-auto px-8 lg:px-12 text-center">
          <ScrollAnimation>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal mb-6 text-white leading-tight">
              Partner With Us
            </h2>
            <p className="text-lg text-[#A1A1A1] mb-12 max-w-2xl mx-auto">
              Let's build the future together. Connect with us to explore collaboration opportunities.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Contact Form */}
      <Contact />
    </>
  );
}

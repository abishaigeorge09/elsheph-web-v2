"use client";

import Image from "next/image";
import ScrollAnimation from "@/components/ScrollAnimation";

export default function Services() {
  const services = [
    {
      title: "Product Development",
      description: "End-to-end product development services, from concept to deployment, delivering scalable solutions that drive business growth.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: "IT Services",
      description: "Comprehensive technology solutions tailored to your business needs, from infrastructure to cloud migration.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "IT Staffing",
      description: "Access top-tier talent across all technology disciplines, matched to your specific requirements.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="relative bg-[#0B0B0B] text-white py-24 lg:py-32">
      {/* Top fade transition from hero */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0B0B0B] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <ScrollAnimation>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#8B6F47]" />
                <span className="text-xs font-medium text-[#A1A1A1] uppercase tracking-wider">
                  Our Services
                </span>
              </div>
              
              {/* Main Heading */}
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight mb-8">
                Built to support modern businesses
              </h2>
            </ScrollAnimation>

            {/* Services List - Vertical */}
            <div className="space-y-0">
              {services.map((service, index) => (
                <ScrollAnimation key={index} delay={index * 100}>
                  <div className="group">
                    <div className="py-6 border-b border-[#1C1C1C] last:border-b-0 hover:border-[#8B6F47]/30 transition-colors duration-300">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="flex-shrink-0 mt-1 text-[#8B6F47] group-hover:text-[#A67C52] transition-colors duration-300">
                          {service.icon}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading text-xl lg:text-2xl font-normal mb-2 text-white group-hover:text-[#8B6F47] transition-colors duration-300">
                            {service.title}
                          </h3>
                          <p className="text-[#A1A1A1] leading-relaxed text-sm lg:text-base group-hover:text-white/80 transition-colors duration-300">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>

          {/* Right Column - Image Container */}
          <ScrollAnimation delay={200}>
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden group">
              <div className="relative w-full h-full bg-[#141414]">
                {/* Your image */}
                <Image
                  src="/services-image.png"
                  alt="Our services"
                  fill
                  className="object-cover rounded-2xl"
                  quality={90}
                  priority
                />

                {/* Border with glow effect - on top of image */}
                <div className="absolute inset-0 rounded-2xl border border-[#1C1C1C] group-hover:border-[#8B6F47]/40 transition-all duration-300 shadow-[0_0_0_0_rgba(139,111,71,0)] group-hover:shadow-[0_0_40px_-10px_rgba(139,111,71,0.3)] z-10 pointer-events-none" />
                
                {/* Subtle vignette effect - overlay on top of image */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0B0B0B]/40 via-transparent to-transparent pointer-events-none z-10" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#0B0B0B]/30 via-transparent to-transparent pointer-events-none z-10" />
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0B] to-transparent pointer-events-none" />
    </section>
  );
}

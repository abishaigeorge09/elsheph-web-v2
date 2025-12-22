"use client";

import Image from "next/image";
import ScrollAnimation from "@/components/ScrollAnimation";

export default function HowWeWork() {
  const steps = [
    {
      number: "01",
      title: "Understand the problem",
      description: "We dive deep into your business challenges, technical requirements, and strategic goals to build a comprehensive understanding.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Design the solution",
      description: "Our team crafts tailored approaches that align with your objectives, ensuring scalability and long-term success.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Build & support",
      description: "We deliver high-quality implementations with dedicated support, maintaining clear communication throughout the process.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Improve continuously",
      description: "Through ongoing monitoring and optimization, we refine solutions to drive better outcomes over time.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-we-work" className="relative bg-[#0B0B0B] text-white py-24 lg:py-32">
      {/* Top fade transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0B0B0B] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image Container */}
          <ScrollAnimation>
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden group">
              <div className="relative w-full h-full bg-[#141414]">
                {/* Your image */}
                <Image
                  src="/how-we-work-image.png"
                  alt="How we work"
                  fill
                  className="object-cover rounded-2xl"
                  quality={90}
                  priority
                />

                {/* Border with glow effect */}
                <div className="absolute inset-0 rounded-2xl border border-[#1C1C1C] group-hover:border-[#8B6F47]/40 transition-all duration-300 shadow-[0_0_0_0_rgba(139,111,71,0)] group-hover:shadow-[0_0_40px_-10px_rgba(139,111,71,0.3)] z-10 pointer-events-none" />
                
                {/* Subtle vignette effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0B0B0B]/40 via-transparent to-transparent pointer-events-none z-10" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#0B0B0B]/30 via-transparent to-transparent pointer-events-none z-10" />
              </div>
            </div>
          </ScrollAnimation>

          {/* Right Column - Visual Process Flow */}
          <ScrollAnimation delay={200}>
            <div className="relative space-y-12">
              {/* Badge and Heading */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#8B6F47]" />
                  <span className="text-xs font-medium text-[#A1A1A1] uppercase tracking-wider">
                    Our Process
                  </span>
                </div>
                
                <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight">
                  How Elsheph works
                </h2>
              </div>

              {/* Process Flow Visualization - No container */}
              <div className="relative space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="relative flex items-start gap-6 group">
                    {/* Connecting Line */}
                    {index < steps.length - 1 && (
                      <div className="absolute left-6 top-14 w-0.5 h-full bg-gradient-to-b from-[#8B6F47]/20 via-[#8B6F47]/10 to-transparent" />
                    )}
                    
                    {/* Step Number Circle */}
                    <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-[#8B6F47]/10 border-2 border-[#8B6F47]/30 flex items-center justify-center group-hover:border-[#8B6F47]/50 transition-colors duration-300">
                      <span className="font-heading text-sm font-medium text-[#8B6F47]">
                        {step.number}
                      </span>
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-1 pt-1 space-y-3">
                      <div className="text-[#8B6F47] group-hover:text-[#A67C52] transition-colors duration-300">
                        {step.icon}
                      </div>
                      <h4 className="font-heading text-xl lg:text-2xl font-normal text-white group-hover:text-[#8B6F47] transition-colors duration-300">
                        {step.title}
                      </h4>
                      <p className="text-sm lg:text-base text-[#A1A1A1] leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
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

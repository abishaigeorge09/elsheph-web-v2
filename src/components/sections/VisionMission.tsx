"use client";

import { useState, useEffect, useRef } from "react";
import ScrollAnimation from "@/components/ScrollAnimation";

// Animated Counter Component
function AnimatedCounter({ target, suffix = "", prefix = "", duration = 2000 }: { target: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const startValue = 0;
    const endValue = target;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    animate();
  }, [isVisible, target, duration]);

  return (
    <div ref={ref} className="inline-block">
      <span className="font-heading text-4xl lg:text-5xl font-bold text-[#8B6F47]">
        {prefix}{count.toLocaleString()}{suffix}
      </span>
    </div>
  );
}

export default function VisionMission() {
  // Stats for inline display with title
  const stats = [
    { value: 3, suffix: "", label: "Projects" },
    { value: 20, suffix: "+", label: "Team" },
    { value: 10000, suffix: "+", label: "Connects" },
    { value: 98, suffix: "%", label: "Satisfaction" },
  ];

  const values = [
    {
      name: "Transparency",
      description: "Open communication and clear processes in every engagement. We believe in building trust through honest dialogue, setting realistic expectations, and maintaining complete visibility into our work processes.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      name: "Reliability",
      description: "Consistent delivery and dependable partnerships that stand the test of time. Our commitment to meeting deadlines, exceeding expectations, and providing unwavering support ensures your projects succeed.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: "Long-term thinking",
      description: "Strategic solutions designed for sustainable growth and lasting impact. We don't just solve today's problems—we architect systems and partnerships that evolve with your business for years to come.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const principles = [
    {
      title: "Quality First",
      description: "Every project undergoes rigorous quality assurance processes to ensure excellence.",
    },
    {
      title: "Client-Centric",
      description: "Your success is our success. We align our goals with yours to deliver maximum value.",
    },
    {
      title: "Innovation Driven",
      description: "We stay ahead of technology trends to provide cutting-edge solutions.",
    },
    {
      title: "Continuous Improvement",
      description: "We constantly refine our processes and skills to deliver better results.",
    },
  ];

  return (
    <section id="company" className="relative bg-[#0B0B0B] text-white py-16 lg:py-24">
      {/* Top fade transition */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#0B0B0B] pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-8 lg:px-12">
        {/* Single column layout - centered and clean */}
        <div className="space-y-12">
          {/* Header Section */}
          <ScrollAnimation>
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#8B6F47]" />
                <span className="text-xs font-medium text-[#A1A1A1] uppercase tracking-wider">
                  Our Foundation
                </span>
              </div>
              
              {/* Main Heading with Inline Stats */}
              <div className="mb-8">
                <div className="flex flex-wrap items-baseline justify-center gap-4 lg:gap-6 mb-6">
                  <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight text-center">
                    Built on precision and professionalism
                  </h2>
                </div>
                {/* Stats below title */}
                <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-baseline gap-2">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                      <span className="text-sm lg:text-base text-[#A1A1A1] font-medium">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Vision & Mission - Side by side on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Vision */}
            <ScrollAnimation delay={100}>
              <div className="group p-6 rounded-xl bg-[#141414] border border-[#1C1C1C] hover:border-[#8B6F47]/30 transition-all duration-300 hover:bg-[#1a1a1a] h-full flex flex-col">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 mt-1 text-[#8B6F47] group-hover:text-[#A67C52] transition-colors duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl lg:text-2xl font-normal mb-3 text-white group-hover:text-[#8B6F47] transition-colors duration-300">
                      Vision
                    </h3>
                    <p className="text-[#A1A1A1] leading-relaxed text-sm lg:text-base group-hover:text-white/80 transition-colors duration-300">
                      To become the most trusted partner for businesses seeking exceptional technology talent and innovative solutions, driving digital transformation across industries.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Mission */}
            <ScrollAnimation delay={200}>
              <div className="group p-6 rounded-xl bg-[#141414] border border-[#1C1C1C] hover:border-[#8B6F47]/30 transition-all duration-300 hover:bg-[#1a1a1a] h-full flex flex-col">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 mt-1 text-[#8B6F47] group-hover:text-[#A67C52] transition-colors duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl lg:text-2xl font-normal mb-3 text-white group-hover:text-[#8B6F47] transition-colors duration-300">
                      Mission
                    </h3>
                    <p className="text-[#A1A1A1] leading-relaxed text-sm lg:text-base group-hover:text-white/80 transition-colors duration-300">
                      We connect world-class technology professionals with forward-thinking companies, delivering scalable solutions that enable sustainable growth and operational excellence.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Values List */}
          <div className="space-y-0 pt-6 border-t border-[#1C1C1C]">
            {values.map((value, index) => (
              <ScrollAnimation key={index} delay={300 + index * 100}>
                <div className="group">
                  <div className="py-6 border-b border-[#1C1C1C] last:border-b-0 hover:border-[#8B6F47]/30 transition-colors duration-300">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-1 text-[#8B6F47] group-hover:text-[#A67C52] transition-colors duration-300">
                        {value.icon}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading text-xl lg:text-2xl font-normal mb-2 text-white group-hover:text-[#8B6F47] transition-colors duration-300">
                          {value.name}
                        </h4>
                        <p className="text-[#A1A1A1] leading-relaxed text-sm lg:text-base group-hover:text-white/80 transition-colors duration-300">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          {/* Principles Grid */}
          <div className="pt-6 border-t border-[#1C1C1C]">
            <ScrollAnimation delay={600}>
              <h3 className="font-heading text-2xl lg:text-3xl font-normal mb-8 text-white text-center">
                Our Principles
              </h3>
            </ScrollAnimation>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {principles.map((principle, index) => (
                <ScrollAnimation key={index} delay={700 + index * 100}>
                  <div className="group p-5 rounded-lg bg-[#141414] border border-[#1C1C1C] hover:border-[#8B6F47]/30 transition-all duration-300 hover:bg-[#1a1a1a]">
                    <h4 className="font-heading text-lg font-normal mb-2 text-white group-hover:text-[#8B6F47] transition-colors duration-300">
                      {principle.title}
                    </h4>
                    <p className="text-sm text-[#A1A1A1] leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                      {principle.description}
                    </p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0B] to-transparent pointer-events-none" />
    </section>
  );
}

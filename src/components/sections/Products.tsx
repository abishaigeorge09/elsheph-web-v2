"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ScrollAnimation from "@/components/ScrollAnimation";

// Countdown Timer Component
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="flex gap-3">
        {[0, 0, 0, 0].map((_, i) => (
          <div key={i} className="w-16 h-16 rounded-lg bg-[#141414] animate-pulse" />
        ))}
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className="flex gap-3 flex-wrap">
      {timeUnits.map((unit, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-1 animate-pulse-slow"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-lg bg-gradient-to-br from-[#8B6F47]/20 to-[#8B6F47]/5 border-2 border-[#8B6F47]/30 flex items-center justify-center overflow-hidden group">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8B6F47]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative z-10 font-heading text-xl lg:text-2xl font-bold text-[#8B6F47]">
              {String(unit.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs text-[#A1A1A1] uppercase tracking-wider">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Products() {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  // Calculate target dates - Job Sudarshan launches in exactly 25 hours
  const jobSudarshanDate = new Date();
  jobSudarshanDate.setTime(jobSudarshanDate.getTime() + (25 * 60 * 60 * 1000));

  const atlitosDate = new Date();
  atlitosDate.setDate(atlitosDate.getDate() + 4);
  atlitosDate.setHours(0, 0, 0, 0);

  const products = [
    {
      id: "job-sudarshan",
      name: "Job Sudarshan",
      description: "Job Sudarshan is an online Telugu Christian bookstore featuring books written by Job Sudarshan himself, a renowned Telugu Christian author. The platform is dedicated to serving Telugu readers with faith-centered literature for spiritual growth.",
      status: "Launching Soon",
      launchDate: jobSudarshanDate,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: "atlitos",
      name: "Atlitos",
      description: "Atlitos is a sports technology platform designed to help athletes, coaches, and academies train smarter, track progress, and grow together.",
      status: "Launching Soon",
      launchDate: atlitosDate,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: "follow-me",
      name: "Follow Me",
      description: "A tourist app that helps travelers discover places, plan itineraries, and connect with local guides.",
      status: "Coming Soon",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const toggleProduct = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  return (
    <section id="products" className="relative bg-[#0B0B0B] text-white py-24 lg:py-32">
      {/* Top fade transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0B0B0B] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Products List */}
          <div className="space-y-8">
            <ScrollAnimation>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#8B6F47]" />
                <span className="text-xs font-medium text-[#A1A1A1] uppercase tracking-wider">
                  Our Products
                </span>
              </div>
              
              {/* Main Heading */}
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight mb-8">
                Products
              </h2>
            </ScrollAnimation>

            {/* Products List - Vertical */}
            <div className="space-y-0">
              {products.map((product, index) => {
                const isExpanded = expandedProduct === product.id;
                return (
                  <ScrollAnimation key={product.id} delay={index * 100}>
                    <div className="group">
                      <div className="py-6 border-b border-[#1C1C1C] last:border-b-0 hover:border-[#8B6F47]/30 transition-colors duration-300">
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className="flex-shrink-0 mt-1 text-[#8B6F47] group-hover:text-[#A67C52] transition-colors duration-300 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                            {product.icon}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 flex-wrap">
                                  {product.id === "atlitos" ? (
                                    <a
                                      href="https://www.atlitos.com/"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="font-heading text-xl lg:text-2xl font-normal text-white group-hover:text-[#8B6F47] transition-colors duration-300 cursor-pointer"
                                    >
                                      {product.name}
                                    </a>
                                  ) : product.id === "job-sudarshan" ? (
                                    <a
                                      href="https://jobsudarshan.com/"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="font-heading text-xl lg:text-2xl font-normal text-white group-hover:text-[#8B6F47] transition-colors duration-300 cursor-pointer"
                                    >
                                      {product.name}
                                    </a>
                                  ) : (
                                    <h3 className="font-heading text-xl lg:text-2xl font-normal text-white group-hover:text-[#8B6F47] transition-colors duration-300">
                                      {product.name}
                                    </h3>
                                  )}
                                  {product.status && (
                                    <span className="text-xs font-medium text-[#8B6F47] px-3 py-1 rounded-full bg-[#8B6F47]/10 border border-[#8B6F47]/30 animate-pulse">
                                      {product.status}
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              {/* Collapse/Expand Button */}
                              <button
                                onClick={() => toggleProduct(product.id)}
                                className="flex-shrink-0 mt-1 p-2 rounded-lg text-[#8B6F47] hover:bg-[#8B6F47]/10 transition-all duration-300 group/btn"
                                aria-label={isExpanded ? "Collapse" : "Expand"}
                              >
                                <svg
                                  className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </button>
                            </div>
                            
                            {/* Collapsible Content */}
                            <div
                              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                isExpanded ? "max-h-[1000px] opacity-100 mt-3" : "max-h-0 opacity-0"
                              }`}
                            >
                              <div className="space-y-3 pt-3">
                                <p className="text-[#A1A1A1] leading-relaxed text-sm lg:text-base group-hover:text-white/80 transition-colors duration-300">
                                  {product.description}
                                </p>
                                
                                {/* Countdown Timer for products with launch dates */}
                                {product.launchDate && (
                                  <div className="pt-2 space-y-3">
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-[#8B6F47] animate-pulse" />
                                      <span className="text-xs font-medium text-[#8B6F47] uppercase tracking-wider">
                                        Launching In
                                      </span>
                                    </div>
                                    <CountdownTimer targetDate={product.launchDate} />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>
                );
              })}
            </div>
          </div>

          {/* Right Column - Image Container */}
          <ScrollAnimation delay={200}>
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden group">
              <div className="relative w-full h-full bg-[#141414]">
                {/* Your image */}
                <Image
                  src="/products-image.png"
                  alt="Our products"
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
        </div>
      </div>
      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0B] to-transparent pointer-events-none" />
    </section>
  );
}

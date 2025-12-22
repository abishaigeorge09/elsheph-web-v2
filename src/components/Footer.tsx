"use client";

import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer className="relative bg-[#FAFAF7] text-black border-t border-black/10">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B6F47]/30 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-8 lg:px-12 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-8 lg:mb-10">
          {/* Logo & Description - Takes 4 columns */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <Image
                src="/logos/elsheph-full.png"
                alt="Elsheph"
                width={140}
                height={40}
                className="h-[120px] w-auto"
                priority
              />
            </div>
            <p className="text-sm text-black/60 leading-relaxed mb-6 max-w-sm">
              Connecting world-class technology professionals with forward-thinking companies, delivering scalable solutions for sustainable growth.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-xs font-medium mb-3 text-black/70 uppercase tracking-wider">
                Stay Updated
              </h4>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 text-sm bg-white border border-black/10 rounded-lg focus:outline-none focus:border-[#8B6F47] focus:ring-1 focus:ring-[#8B6F47] transition-all duration-200 placeholder:text-black/30"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#8B6F47] text-white text-sm font-medium rounded-lg hover:bg-[#6B5230] transition-colors duration-200"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Links Grid - Takes 8 columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Services Column */}
            <div>
              <h3 className="text-xs font-semibold mb-6 text-black uppercase tracking-wider">
                Services
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#services"
                    className="text-sm text-black/60 hover:text-[#8B6F47] transition-colors duration-200 inline-block"
                  >
                    IT Services
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-sm text-black/60 hover:text-[#8B6F47] transition-colors duration-200 inline-block"
                  >
                    IT Staffing
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-sm text-black/60 hover:text-[#8B6F47] transition-colors duration-200 inline-block"
                  >
                    Product Development
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-xs font-semibold mb-6 text-black uppercase tracking-wider">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#company"
                    className="text-sm text-black/60 hover:text-[#8B6F47] transition-colors duration-200 inline-block"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-sm text-black/60 hover:text-[#8B6F47] transition-colors duration-200 inline-block"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#how-we-work"
                    onClick={(e) => {
                      e.preventDefault();
                      const howWeWorkSection = document.getElementById("how-we-work");
                      if (howWeWorkSection) {
                        howWeWorkSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-sm text-black/60 hover:text-[#8B6F47] transition-colors duration-200 inline-block"
                  >
                    How We Work
                  </a>
                </li>
              </ul>
            </div>

            {/* Products Column */}
            <div>
              <h3 className="text-xs font-semibold mb-6 text-black uppercase tracking-wider">
                Products
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://jobsudarshan.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-black/60 hover:text-[#8B6F47] transition-colors duration-200 inline-block"
                  >
                    Job Sudarshan
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.atlitos.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-black/60 hover:text-[#8B6F47] transition-colors duration-200 inline-block"
                  >
                    Atlitos
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-2">
                    <a
                      href="#products"
                      className="text-sm text-black/60 hover:text-[#8B6F47] transition-colors duration-200 inline-block"
                    >
                      Follow Me
                    </a>
                    <span className="text-xs text-black/40 bg-black/5 px-2 py-0.5 rounded">
                      Soon
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-xs font-semibold mb-6 text-black uppercase tracking-wider">
                Connect
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#contact"
                    className="text-sm text-black/60 hover:text-[#8B6F47] transition-colors duration-200 inline-block"
                  >
                    Get in Touch
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:sales@elsheph.com"
                    className="text-sm text-black/60 hover:text-[#8B6F47] transition-colors duration-200 inline-block"
                  >
                    sales@elsheph.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="pt-6 lg:pt-8">
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-black/70 uppercase tracking-wider">
              Follow Us
            </span>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/company/elshephsystem"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/60 hover:text-[#8B6F47] transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 lg:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-black/50">
              © {new Date().getFullYear()} Elsheph Systems India Pvt Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-black/50">
                Privacy Policy
              </span>
              <span className="text-xs text-black/50">
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const { data, error } = await supabase
        .from("newsletter_subscriptions")
        .insert([{ email: email.toLowerCase().trim() }]);

      if (error) {
        // Check if it's a duplicate email error
        if (error.code === "23505") {
          setMessage({ type: "error", text: "This email is already subscribed" });
        } else {
          // Log full error details for debugging
          console.error("Subscription error details:", {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint
          });
          setMessage({ type: "error", text: `Error: ${error.message || "Something went wrong. Please try again."}` });
        }
      } else {
        setMessage({ type: "success", text: "Successfully subscribed!" });
        setEmail("");
        // Clear success message after 3 seconds
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      console.error("Subscription catch error:", error);
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
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
            <div className="mb-6 relative inline-block">
              <span className="absolute -inset-2 rounded-lg bg-black/8 backdrop-blur-sm -z-10" />
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
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setMessage(null);
                    }}
                    placeholder="Enter your email"
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 text-sm bg-white border border-black/10 rounded-lg focus:outline-none focus:border-[#8B6F47] focus:ring-1 focus:ring-[#8B6F47] transition-all duration-200 placeholder:text-black/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2.5 bg-[#8B6F47] text-white text-sm font-medium rounded-lg hover:bg-[#6B5230] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isLoading ? "..." : "Subscribe"}
                  </button>
                </div>
                {message && (
                  <p
                    className={`text-xs mt-1 ${
                      message.type === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {message.text}
                  </p>
                )}
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
                    Product Development
                  </a>
                </li>
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
                    Corporate L&D
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
                    href="/university"
                    className="text-sm text-black/60 hover:text-[#8B6F47] transition-colors duration-200 inline-block"
                  >
                    University Collaboration
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
                  <a
                    href="#products"
                    className="text-sm text-black/60 hover:text-[#8B6F47] transition-colors duration-200 inline-block"
                  >
                    International Hymn Book
                  </a>
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
              <a
                href="https://instagram.com/elshephsystem"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/60 hover:text-[#8B6F47] transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849 2.664-.148 4.771-1.691 4.919-4.919.059-1.265.07-1.644.07-4.85 0-3.239-.012-3.617-.07-4.97-.149-3.28-1.664-4.771-4.919-4.919-1.266-.059-1.645-.07-4.849-.07-3.204 0-3.584.012-4.849.07-3.259.149-4.771 1.699-4.919 4.92-.059 1.265-.07 1.644-.07 4.849 0 3.204.013 3.583.07 4.849.149 3.28 1.664 4.771 4.919 4.919 1.266.059 1.644.07 4.85.07zm0-2.163c-3.259 0-3.667.014-4.947.072-3.183.15-4.261 1.685-4.394 4.814-.059 1.269-.071 1.644-.071 4.849 0 3.204.013 3.583.071 4.849.132 3.164 1.21 4.661 4.394 4.814 1.281.058 1.689.071 4.947.071 3.259 0 3.668-.014 4.948-.072 3.184-.15 4.261-1.686 4.394-4.814.06-1.269.072-1.644.072-4.849 0-3.204-.014-3.583-.073-4.849-.132-3.163-1.211-4.661-4.395-4.814-1.281-.058-1.69-.071-4.948-.071zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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
              <a href="/privacy" className="text-xs text-black/50 hover:text-black/70 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="text-xs text-black/50 hover:text-black/70 transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

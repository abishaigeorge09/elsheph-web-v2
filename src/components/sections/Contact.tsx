/**
 * Contact Form Component
 * 
 * Testing Checklist:
 * 1) Run npm run dev
 * 2) Submit the form
 * 3) Verify in Supabase Table Editor -> contacts
 */
"use client";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import ScrollAnimation from "@/components/ScrollAnimation";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const { error: insertError } = await supabase
        .from("contacts")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      // Success
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Dev-only check for missing Supabase keys
  const isDev = process.env.NODE_ENV === "development";
  const hasSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const missingKeys = isDev && (!hasSupabaseUrl || !hasSupabaseKey);

  return (
    <section id="contact" className="relative bg-[#FAFAF7] text-black py-32 lg:py-48">
      <div className="relative max-w-6xl mx-auto px-8 lg:px-12">
        {/* Card-style container */}
        <div className="relative bg-white/95 border-2 border-black rounded-3xl px-8 py-10 lg:px-12 lg:py-14 shadow-[12px_12px_0px_#000000]">
          {/* Section Title */}
          <ScrollAnimation>
            <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 lg:mb-8 text-center text-black leading-tight">
              Get in touch
            </h2>
            <p className="text-base lg:text-lg text-black/70 text-center mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Have a project in mind? Let's discuss how we can help bring your vision to life.
            </p>
          </ScrollAnimation>

          <div className="max-w-2xl mx-auto">
            {/* Dev-only: Missing Supabase Keys Warning */}
            {missingKeys && (
              <div className="mb-8 p-6 rounded-xl bg-yellow-50 border border-yellow-200 text-center">
                <p className="text-sm text-yellow-800 font-medium">
                  Supabase keys missing in .env.local
                </p>
              </div>
            )}
            {/* Success Message */}
            {isSuccess && (
              <div className="mb-8 p-6 rounded-xl bg-black/5 border border-black/10 text-center">
                <p className="text-sm text-black/60">
                  Thank you for your message. We'll get back to you soon.
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-8 p-6 rounded-xl bg-red-50 border border-red-200 text-center">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <div className="group">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black/60 mb-3 group-focus-within:text-[#8B6F47] transition-colors duration-200"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-5 py-4 rounded-xl border-2 border-black bg-white focus:outline-none focus:border-[#8B6F47] focus:ring-2 focus:ring-[#8B6F47]/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-black/60"
                  placeholder="Your name"
                />
              </div>

              {/* Email Field */}
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black/60 mb-3 group-focus-within:text-[#8B6F47] transition-colors duration-200"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-5 py-4 rounded-xl border-2 border-black bg-white focus:outline-none focus:border-[#8B6F47] focus:ring-2 focus:ring-[#8B6F47]/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-black/60"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message Field */}
              <div className="group">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-black/60 mb-3 group-focus-within:text-[#8B6F47] transition-colors duration-200"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  disabled={isLoading}
                  className="w-full px-5 py-4 rounded-xl border-2 border-black bg-white focus:outline-none focus:border-[#8B6F47] focus:ring-2 focus:ring-[#8B6F47]/20 transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed hover:border-black/60"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full px-10 py-4 rounded-full bg-[#8B6F47] text-white text-sm font-semibold hover:bg-[#6B5230] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-lg hover:shadow-[#8B6F47]/30 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </span>
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </button>
            </form>

            {/* Contact Email Placeholder */}
            <div className="mt-10 lg:mt-12 text-center">
              <p className="text-sm text-black/50 mb-3">
                Or reach us directly at
              </p>
              <a
                href="mailto:contact@elsheph.com"
                className="text-sm text-[#8B6F47] hover:text-[#6B5230] font-semibold transition-colors duration-200"
              >
                contact@elsheph.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

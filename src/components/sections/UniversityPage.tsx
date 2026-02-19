"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ScrollAnimation from "@/components/ScrollAnimation";
import { supabase } from "@/lib/supabase";

const OFFER_CARDS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Product-Based Internships",
    description:
      "Students contribute to live Elsheph products — Atlitos, Jobsudarshan, and other platforms — shipping real code with real users.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Structured Engineering Training",
    description:
      "Full-stack product development exposure — requirement gathering, architecture, development, testing, and deployment.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Corporate Exposure & Placement Pipeline",
    description:
      "Industry network connecting students to L&T, Capgemini, Cognizant, and other corporate partners for placements and career growth.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Verified Certification",
    description:
      "Performance-based certification validated by real project delivery — not just attendance. Industry-recognised and outcome-driven.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Campus Innovation Cell Support",
    description:
      "We partner with innovation cells and student communities to co-develop projects, run hackathons, and mentor emerging builders.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: "Global University Network",
    description:
      "Students gain access to Elsheph's international network spanning Netherlands, India, and beyond — opening pathways for global internships and research opportunities.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Initial Partnership Discussion",
    description: "We meet with department heads, placement cells, and innovation leads to align on goals and structure.",
  },
  {
    step: "02",
    title: "Program Design",
    description: "Custom training curriculum and internship structure designed around your students' semester calendar.",
  },
  {
    step: "03",
    title: "Onboarding & Execution",
    description: "Students are onboarded to live product teams with mentorship, sprints, and regular reviews.",
  },
  {
    step: "04",
    title: "Certification & Placement",
    description: "Performance-based certification issued with placement support and industry referrals.",
  },
];

const STATS = [
  { value: "350+", label: "Students Trained", sub: "Across structured programs" },
  { value: "12+", label: "Corporate Partners", sub: "For placements & exposure" },
  { value: "3", label: "Countries Active", sub: "India, Netherlands & more" },
  { value: "100%", label: "Project-Based", sub: "Hands-on real-world delivery" },
];

const COMPANY_NAMES = ["L&T", "ServiceNow", "Capgemini", "Cognizant", "Infosys", "Accenture", "Wipro", "TCS"];

const ROLES = [
  "Department Head / HOD",
  "Placement Officer",
  "Innovation / Incubation Cell Lead",
  "Faculty Member",
  "Student",
  "Other",
];

export default function UniversityPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [heroError, setHeroError] = useState(false);

  // University contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    role: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    setHeroLoaded(true);
  }, []);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("uni-contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);
    setIsSuccess(false);
    try {
      const { error: insertError } = await supabase.from("university_contacts").insert([{
        name: formData.name,
        email: formData.email,
        university: formData.university,
        role: formData.role,
        message: formData.message,
      }]);
      if (insertError) throw insertError;
      setIsSuccess(true);
      setFormData({ name: "", email: "", university: "", role: "", message: "" });
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          {!heroError && (
            <Image
              src="/university-campus.png"
              alt="University campus"
              fill
              priority
              className={`object-cover transition-opacity duration-1000 ${
                heroLoaded ? "opacity-100" : "opacity-0"
              }`}
              quality={90}
              onError={() => setHeroError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/70 to-transparent" />
        </div>

        {/* Centred content */}
        <div className="relative z-10 max-w-4xl mx-auto px-8 lg:px-12 text-center">
          {/* Pill */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-xs font-medium tracking-wider uppercase mb-8 transition-all duration-700 delay-100 ${
              heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B6F47] animate-pulse" />
            University Partnerships
          </div>

          <h1
            className={`font-heading text-5xl sm:text-6xl lg:text-7xl font-normal text-white mb-6 leading-[1.08] tracking-tight transition-all duration-1000 delay-200 ${
              heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Partnering With Universities<br className="hidden sm:block" /> To Build Real-World Engineers.
          </h1>

          <p
            className={`text-lg sm:text-xl text-white/95 mb-10 max-w-2xl mx-auto leading-relaxed font-light transition-all duration-1000 delay-400 ${
              heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Elsheph bridges classroom learning with live product development, structured mentorship, and direct pathways into global careers.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-500 ${
              heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <a
              href="#contact"
              onClick={scrollToContact}
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#8B6F47] text-white text-sm font-medium hover:bg-[#6B5230] transition-all duration-300 shadow-lg shadow-[#8B6F47]/30"
            >
              Explore Collaboration
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/60 text-white text-sm font-medium bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/80 transition-all duration-300"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="relative bg-[#0B0B0B] border-y border-[#1C1C1C]">
        <div className="max-w-6xl mx-auto px-8 lg:px-12 py-12 lg:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {STATS.map((stat, i) => (
              <ScrollAnimation key={i} delay={i * 80}>
                <div className="text-center lg:border-r lg:border-[#1C1C1C] last:border-0 px-4">
                  <p className="font-heading text-4xl lg:text-5xl font-normal text-[#C4A882] mb-1 tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-white text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-[#555] text-xs">{stat.sub}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACADEMIC COLLABORATIONS ─── */}
      <section className="relative bg-[#0B0B0B] text-white py-20 lg:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-8 lg:px-12 mb-12">
          <ScrollAnimation>
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="w-2 h-2 rounded-full bg-[#8B6F47]" />
              <span className="text-xs font-medium text-[#8B6F47] uppercase tracking-wider">Academic Partners</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-center text-white mb-4 leading-tight">
              Our Academic Collaborations
            </h2>
            <p className="text-[#A1A1A1] text-center max-w-xl mx-auto">
              Working closely with forward-thinking institutions committed to experiential learning and industry readiness.
            </p>
          </ScrollAnimation>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0B0B0B] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0B0B0B] to-transparent z-10 pointer-events-none" />
          <div className="flex animate-scroll items-center">
            {[1, 2].map((copy) => (
              <div key={copy} className="flex items-center shrink-0" aria-hidden={copy === 2}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <a
                    href="https://www.srmist.edu.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    key={`${copy}-${i}`}
                    className="flex items-center mx-10 lg:mx-14 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500"
                  >
                    <Image
                      src="/SRM_Institute_of_Science_and_Technology_Logo.svg"
                      alt="SRM Institute of Science and Technology"
                      width={160}
                      height={64}
                      className="h-12 lg:h-14 w-auto object-contain"
                    />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ─── WHAT WE OFFER ─── */}
      <section className="relative bg-[#080808] text-white py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <ScrollAnimation>
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="w-2 h-2 rounded-full bg-[#8B6F47]" />
              <span className="text-xs font-medium text-[#8B6F47] uppercase tracking-wider">What We Bring</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-center text-white mb-4 leading-tight">
              What We Bring to Your Campus
            </h2>
            <p className="text-[#A1A1A1] text-center max-w-2xl mx-auto mb-16">
              A complete university partnership model — from training to placement, with real projects at the core.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {OFFER_CARDS.map((card, index) => (
              <ScrollAnimation key={index} delay={index * 70}>
                <div className="group h-full p-8 rounded-2xl bg-[#0f0f0f] border border-[#1C1C1C] hover:border-[#8B6F47]/30 transition-all duration-300 hover:-translate-y-1 hover:bg-[#111]">
                  <div className="w-10 h-10 rounded-xl bg-[#8B6F47]/10 border border-[#8B6F47]/20 flex items-center justify-center text-[#8B6F47] mb-5 group-hover:bg-[#8B6F47]/20 transition-colors duration-300">
                    {card.icon}
                  </div>
                  <h3 className="font-heading text-lg lg:text-xl font-normal text-white mb-3 group-hover:text-[#C4A882] transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-[#888] leading-relaxed text-sm">
                    {card.description}
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="relative bg-[#0B0B0B] text-white py-24 lg:py-32 border-t border-[#1C1C1C]">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <ScrollAnimation>
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="w-2 h-2 rounded-full bg-[#8B6F47]" />
              <span className="text-xs font-medium text-[#8B6F47] uppercase tracking-wider">Partnership Process</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-center text-white mb-4 leading-tight">
              How a Partnership Works
            </h2>
            <p className="text-[#A1A1A1] text-center max-w-xl mx-auto mb-16">
              A clear, structured process from first conversation to student outcomes.
            </p>
          </ScrollAnimation>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-8 left-[calc(12.5%)] right-[calc(12.5%)] h-px bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
              {PROCESS_STEPS.map((step, i) => (
                <ScrollAnimation key={i} delay={i * 100}>
                  <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="relative z-10 w-16 h-16 rounded-full bg-[#0f0f0f] border-2 border-[#8B6F47]/40 flex items-center justify-center mb-6 group-hover:border-[#8B6F47] transition-colors">
                      <span className="font-heading text-lg font-normal text-[#8B6F47]">{step.step}</span>
                    </div>
                    <h3 className="font-heading text-lg font-normal text-white mb-3 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-[#888] text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── IMPACT & ALUMNI ─── */}
      <section className="relative bg-[#080808] text-white py-24 lg:py-32 border-t border-[#1C1C1C]">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#8B6F47]" />
                <span className="text-xs font-medium text-[#8B6F47] uppercase tracking-wider">Impact</span>
              </div>
              <h2 className="font-heading text-4xl sm:text-5xl font-normal text-white mb-6 leading-tight">
                Building Engineers Who Ship, Not Just Study
              </h2>
              <p className="text-[#A1A1A1] leading-relaxed mb-6">
                Elsheph has trained over 350 students through structured, hands-on programs focused on product engineering, real-world problem solving, and startup execution.
              </p>
              <p className="text-[#A1A1A1] leading-relaxed mb-8">
                Students have gone on to pursue higher studies at leading global universities and secure placements at multinational corporations across India, Europe, and the US.
              </p>
              <a
                href="#contact"
                onClick={scrollToContact}
                className="group inline-flex items-center gap-2 text-[#C4A882] text-sm font-medium hover:text-white transition-colors duration-300"
              >
                Join our university program
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </ScrollAnimation>

            <ScrollAnimation delay={100}>
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-[#1C1C1C]">
                  <p className="text-[#A1A1A1] text-sm leading-relaxed mb-3 italic">
                    "The internship at Elsheph gave me real shipping experience before I ever stepped into a company. I was writing production code within two weeks."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#8B6F47]/20 border border-[#8B6F47]/30 flex items-center justify-center text-[#8B6F47] text-xs font-medium">A</div>
                    <div>
                      <p className="text-white text-sm font-medium">Program Alumni</p>
                      <p className="text-[#555] text-xs">Now at Capgemini</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-[#1C1C1C]">
                  <p className="text-[#A1A1A1] text-sm leading-relaxed mb-3 italic">
                    "The program structure is different. It's not just coding exercises — it's ownership. Students own a feature, from design to deployment."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#8B6F47]/20 border border-[#8B6F47]/30 flex items-center justify-center text-[#8B6F47] text-xs font-medium">P</div>
                    <div>
                      <p className="text-white text-sm font-medium">Department Head</p>
                      <p className="text-[#555] text-xs">Faculty Partner</p>
                    </div>
                  </div>
                </div>
                {/* Company placement logos */}
                <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-[#1C1C1C]">
                  <p className="text-xs text-[#555] uppercase tracking-wider mb-4">Placement Destinations</p>
                  <div className="flex flex-wrap gap-2">
                    {COMPANY_NAMES.map((name) => (
                      <span key={name} className="px-3 py-1.5 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] text-xs font-medium">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* ─── INCUBATION CTA ─── */}
      <section className="relative bg-[#0B0B0B] text-white py-24 lg:py-32 border-t border-[#1C1C1C] overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] rounded-full bg-[#8B6F47]/5 blur-[120px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-8 lg:px-12 text-center">
          <ScrollAnimation>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B6F47]/10 border border-[#8B6F47]/20 text-[#C4A882] text-xs font-medium uppercase tracking-wider mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B6F47] animate-pulse" />
              Long-Term Ecosystem
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-white mb-6 leading-tight">
              Incubation. Collaboration.<br />Long-Term Impact.
            </h2>
            <p className="text-lg text-[#A1A1A1] leading-relaxed mb-10 max-w-2xl mx-auto">
              Elsheph is building a sustained ecosystem where academia, industry, and product innovation intersect. We partner with universities for long-term impact — not just internship seasons.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-left">
              {[
                { title: "Innovation Labs", desc: "Co-develop research projects and startup ideas with faculty guidance." },
                { title: "Semester Integration", desc: "Our curriculum can be integrated into elective credits and academic calendars." },
                { title: "Placement MOUs", desc: "Formal MOU-backed partnerships for structured campus recruitment pipelines." },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-white text-sm font-medium mb-2">{item.title}</p>
                  <p className="text-[#666] text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              onClick={scrollToContact}
              className="group inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#8B6F47] text-white text-sm font-semibold hover:bg-[#6B5230] transition-all duration-300 shadow-lg shadow-[#8B6F47]/25 hover:shadow-[#8B6F47]/40"
            >
              Start a University Collaboration
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <p className="text-sm text-[#555] mt-6">
              We welcome conversations with academic leaders, HODs, placement officers, and innovation cells.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* ─── UNIVERSITY CONTACT ─── */}
      <section id="uni-contact" className="relative bg-[#FAFAF7] text-black py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

            {/* Left: copy */}
            <div className="lg:col-span-2">
              <ScrollAnimation>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8B6F47]/10 border border-[#8B6F47]/20 text-[#8B6F47] text-xs font-medium uppercase tracking-wider mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B6F47]" />
                  Start a Partnership
                </div>
                <h2 className="font-heading text-4xl sm:text-5xl font-normal text-black mb-4 leading-tight">
                  Let&apos;s Build Something Together
                </h2>
                <p className="text-black/60 leading-relaxed mb-8">
                  Whether you&apos;re an HOD looking to offer real-world internships, a placement officer building a corporate pipeline, or an innovation cell exploring co-development — we&apos;d love to connect.
                </p>
                <div className="space-y-4">
                  {[
                    { label: "Partnerships", value: "university@elsheph.com" },
                    { label: "General", value: "contact@elsheph.com" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs text-black/40 uppercase tracking-wider mb-1">{item.label}</p>
                      <a href={`mailto:${item.value}`} className="text-sm text-[#8B6F47] hover:text-[#6B5230] font-medium transition-colors duration-200">
                        {item.value}
                      </a>
                    </div>
                  ))}
                </div>
              </ScrollAnimation>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <ScrollAnimation delay={100}>
                <div className="bg-white border-2 border-black rounded-3xl px-8 py-10 shadow-[8px_8px_0px_#000000]">
                  {isSuccess && (
                    <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-center">
                      <p className="text-sm text-green-700 font-medium">Thank you! We&apos;ll be in touch shortly.</p>
                    </div>
                  )}
                  {formError && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-center">
                      <p className="text-sm text-red-700">{formError}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="group">
                        <label htmlFor="uni-name" className="block text-xs font-medium text-black/50 mb-2 uppercase tracking-wider group-focus-within:text-[#8B6F47] transition-colors">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="uni-name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={isLoading}
                          placeholder="Dr. / Prof. / Mr. / Ms."
                          className="w-full px-4 py-3 rounded-xl border-2 border-black/10 bg-white focus:outline-none focus:border-[#8B6F47] focus:ring-2 focus:ring-[#8B6F47]/10 transition-all duration-200 disabled:opacity-50 text-sm hover:border-black/30"
                        />
                      </div>
                      {/* Email */}
                      <div className="group">
                        <label htmlFor="uni-email" className="block text-xs font-medium text-black/50 mb-2 uppercase tracking-wider group-focus-within:text-[#8B6F47] transition-colors">
                          University Email
                        </label>
                        <input
                          type="email"
                          id="uni-email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={isLoading}
                          placeholder="you@university.edu"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black/10 bg-white focus:outline-none focus:border-[#8B6F47] focus:ring-2 focus:ring-[#8B6F47]/10 transition-all duration-200 disabled:opacity-50 text-sm hover:border-black/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* University */}
                      <div className="group">
                        <label htmlFor="uni-university" className="block text-xs font-medium text-black/50 mb-2 uppercase tracking-wider group-focus-within:text-[#8B6F47] transition-colors">
                          University / Institution
                        </label>
                        <input
                          type="text"
                          id="uni-university"
                          name="university"
                          value={formData.university}
                          onChange={handleChange}
                          required
                          disabled={isLoading}
                          placeholder="e.g. SRM Institute"
                          className="w-full px-4 py-3 rounded-xl border-2 border-black/10 bg-white focus:outline-none focus:border-[#8B6F47] focus:ring-2 focus:ring-[#8B6F47]/10 transition-all duration-200 disabled:opacity-50 text-sm hover:border-black/30"
                        />
                      </div>
                      {/* Role */}
                      <div className="group">
                        <label htmlFor="uni-role" className="block text-xs font-medium text-black/50 mb-2 uppercase tracking-wider group-focus-within:text-[#8B6F47] transition-colors">
                          Your Role
                        </label>
                        <select
                          id="uni-role"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          required
                          disabled={isLoading}
                          className="w-full px-4 py-3 rounded-xl border-2 border-black/10 bg-white focus:outline-none focus:border-[#8B6F47] focus:ring-2 focus:ring-[#8B6F47]/10 transition-all duration-200 disabled:opacity-50 text-sm hover:border-black/30 appearance-none cursor-pointer"
                        >
                          <option value="">Select your role</option>
                          {ROLES.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="group">
                      <label htmlFor="uni-message" className="block text-xs font-medium text-black/50 mb-2 uppercase tracking-wider group-focus-within:text-[#8B6F47] transition-colors">
                        How Can We Collaborate?
                      </label>
                      <textarea
                        id="uni-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        disabled={isLoading}
                        placeholder="Tell us about your students, what you're looking for, and any upcoming semester timelines..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-black/10 bg-white focus:outline-none focus:border-[#8B6F47] focus:ring-2 focus:ring-[#8B6F47]/10 transition-all duration-200 resize-none disabled:opacity-50 text-sm hover:border-black/30"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group relative w-full px-8 py-4 rounded-full bg-[#8B6F47] text-white text-sm font-semibold hover:bg-[#6B5230] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[#8B6F47]/30 overflow-hidden"
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
                            Send Partnership Inquiry
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </button>
                  </form>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

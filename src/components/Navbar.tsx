"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home", sectionId: "hero" },
  { href: "/#services", label: "Services", sectionId: "services" },
  { href: "/#products", label: "Products", sectionId: "products" },
  { href: "/university", label: "University", sectionId: null },
];

function isLinkActive(
  href: string,
  pathname: string,
  activeSection: string | null
) {
  if (href === "/university") return pathname === "/university";
  const link = NAV_LINKS.find((l) => l.href === href);
  if (link?.sectionId) {
    return activeSection === link.sectionId;
  }
  if (href === "/") return pathname === "/" && (!activeSection || activeSection === "hero");
  return false;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let ticking = false;
    let lastSection: string | null = null;

    const update = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 80);

      if (pathname !== "/") {
        lastSection = null;
        setActiveSection(null);
        ticking = false;
        return;
      }

      const sectionIds = ["hero", "services", "products"];
      const triggerY = scrollY + 150;

      let current = "hero";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        const bottom = top + rect.height;

        if (triggerY >= top && triggerY < bottom) {
          current = id;
          break;
        }
        if (triggerY < top) {
          current = sectionIds[Math.max(0, sectionIds.indexOf(id) - 1)] ?? "hero";
          break;
        }
        current = id;
      }

      if (current !== lastSection) {
        lastSection = current;
        setActiveSection(current);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[120] pt-4 transition-all duration-500 ease-out ${
          isScrolled || mobileMenuOpen
            ? "bg-[#0B0B0B]/95 backdrop-blur-xl border-b border-[#1C1C1C]"
            : "bg-transparent border-b border-transparent backdrop-blur-none"
        }`}
      >
        <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-5">
            {/* Left: Logo */}
            <div className="flex items-center flex-shrink-0">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  closeMobileMenu();
                  if (pathname === "/") {
                    const heroSection = document.getElementById("hero");
                    if (heroSection) {
                      heroSection.scrollIntoView({ behavior: "smooth" });
                    } else {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  } else {
                    router.push("/");
                  }
                }}
                className="cursor-pointer flex items-center h-full py-2"
              >
                <Image
                  src="/logos/elsheph-full.png"
                  alt="Elsheph"
                  width={140}
                  height={40}
                  className="h-[135px] w-auto"
                  priority
                />
              </a>
            </div>

            {/* Center: Links - Desktop */}
            <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link.href, pathname, activeSection);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                      active
                        ? "text-white"
                        : "text-white/60 hover:text-white/90"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C4A882]" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right: Contact Us (desktop) + Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <a
                href={pathname === "/" ? "#contact" : "/#contact"}
                onClick={(e) => {
                  if (pathname === "/") {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium border border-white/20 text-white/90 hover:border-white/40 hover:text-white transition-all duration-200"
              >
                Contact Us
              </a>
              <button
                type="button"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => (mobileMenuOpen ? closeMobileMenu() : openMobileMenu())}
                className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl text-white hover:bg-white/10 transition-colors duration-200 -mr-2"
              >
                <span className="sr-only">{mobileMenuOpen ? "Close" : "Menu"}</span>
                <div className="w-6 h-5 flex flex-col justify-center gap-1.5">
                  <span
                    className={`block h-0.5 w-6 bg-current origin-center transition-all duration-300 ${
                      mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${
                      mobileMenuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-6 bg-current origin-center transition-all duration-300 ${
                      mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu: full screen, always below fixed navbar */}
      <div
        className={`fixed inset-0 z-[110] md:hidden transition-all duration-300 ease-out ${
          mobileMenuOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[#0B0B0B] pt-20 overflow-y-auto">
          <div className="px-8 pb-12 flex flex-col gap-10">
            {/* Primary Nav */}
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link.href, pathname, activeSection);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center py-5 px-5 rounded-2xl text-lg font-medium transition-all duration-200 border-l-2 ${
                      active
                        ? "bg-white/5 text-white border-[#C4A882]"
                        : "border-transparent text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <div className="h-px bg-gradient-to-r from-transparent via-[#1C1C1C] to-transparent" />

            {/* CTA */}
            <div>
              <a
                href={pathname === "/" ? "#contact" : "/#contact"}
                onClick={(e) => {
                  closeMobileMenu();
                  if (pathname === "/") {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="block w-full py-4 text-center rounded-2xl text-base font-semibold bg-[#A07850] text-white hover:bg-[#8B6F47] transition-colors duration-200"
              >
                Contact Us
              </a>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-[#1C1C1C] to-transparent" />

            {/* Support */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-4">
                Support
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:sales@elsheph.com"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 py-3 text-white/90 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 text-[#8B6F47] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>sales@elsheph.com</span>
                </a>
                <a
                  href="mailto:contact@elsheph.com"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 py-3 text-white/90 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 text-[#8B6F47] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Contact Support</span>
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-4">
                Follow Us
              </p>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com/company/elshephsystem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/elshephsystem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849 2.664-.148 4.771-1.691 4.919-4.919.059-1.265.07-1.644.07-4.85 0-3.239-.012-3.617-.07-4.97-.149-3.28-1.664-4.771-4.919-4.919-1.266-.059-1.645-.07-4.849-.07-3.204 0-3.584.012-4.849.07-3.259.149-4.771 1.699-4.919 4.92-.059 1.265-.07 1.644-.07 4.849 0 3.204.013 3.583.07 4.849.149 3.28 1.664 4.771 4.919 4.919 1.266.059 1.644.07 4.85.07zm0-2.163c-3.259 0-3.667.014-4.947.072-3.183.15-4.261 1.685-4.394 4.814-.059 1.269-.071 1.644-.071 4.849 0 3.204.013 3.583.071 4.849.132 3.164 1.21 4.661 4.394 4.814 1.281.058 1.689.071 4.947.071 3.259 0 3.668-.014 4.948-.072 3.184-.15 4.261-1.686 4.394-4.814.06-1.269.072-1.644.072-4.849 0-3.204-.014-3.583-.073-4.849-.132-3.163-1.211-4.661-4.395-4.814-1.281-.058-1.69-.071-4.948-.071zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

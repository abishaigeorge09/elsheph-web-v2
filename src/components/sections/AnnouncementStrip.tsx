"use client";

export default function AnnouncementStrip() {
  const message = "Jobsudarshan.com — Now Live";
  
  // Create message item component
  const MessageItem = ({ index }: { index: number }) => (
    <a
      href="https://jobsudarshan.com/"
      target="_blank"
      rel="noopener noreferrer"
      key={index}
      className="flex items-center mx-6 lg:mx-10 text-white group flex-shrink-0 cursor-pointer"
    >
      <span className="text-base lg:text-lg font-semibold tracking-wide uppercase whitespace-nowrap text-white/90 group-hover:text-[#8B6F47] transition-colors duration-300">
        {message}
      </span>
      <svg
        className="w-5 h-5 ml-6 lg:ml-8 opacity-50 group-hover:opacity-100 group-hover:text-[#8B6F47] transition-all duration-300 flex-shrink-0 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </a>
  );

  return (
    <section id="announcement-strip" className="relative bg-[#0B0B0B] overflow-hidden border-t border-[#1C1C1C] border-b border-[#1C1C1C]">
      <div className="py-14 lg:py-20">
        <div className="relative overflow-hidden">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0B0B0B] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0B0B0B] to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling content - duplicated for seamless loop */}
          <div className="flex animate-scroll whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <MessageItem key={`first-${i}`} index={i} />
            ))}
            {/* Duplicate for seamless scrolling */}
            {Array.from({ length: 8 }).map((_, i) => (
              <MessageItem key={`second-${i}`} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

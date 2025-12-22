"use client";

import { useEffect } from "react";

export default function PortalFix() {
  useEffect(() => {
    const fixPortalPosition = () => {
      const portals = document.querySelectorAll("nextjs-portal");
      portals.forEach((portal) => {
        const element = portal as HTMLElement;
        // Force all positioning properties
        element.style.setProperty("position", "fixed", "important");
        element.style.setProperty("top", "0", "important");
        element.style.setProperty("left", "0", "important");
        element.style.setProperty("right", "0", "important");
        element.style.setProperty("bottom", "0", "important");
        element.style.setProperty("width", "100%", "important");
        element.style.setProperty("height", "100%", "important");
        element.style.setProperty("margin", "0", "important");
        element.style.setProperty("padding", "0", "important");
        element.style.setProperty("transform", "none", "important");
      });
    };

    // Fix immediately
    fixPortalPosition();

    // Use requestAnimationFrame for smoother updates
    let rafId: number;
    const updateLoop = () => {
      fixPortalPosition();
      rafId = requestAnimationFrame(updateLoop);
    };
    rafId = requestAnimationFrame(updateLoop);

    // Fix on DOM changes (MutationObserver)
    const observer = new MutationObserver(() => {
      fixPortalPosition();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style"],
    });

    // Also fix periodically as a fallback
    const interval = setInterval(fixPortalPosition, 50);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return null;
}


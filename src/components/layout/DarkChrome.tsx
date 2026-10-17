"use client";

import { useEffect } from "react";
import { registerDarkField } from "@/components/layout/darkField";

/**
 * Marker component for pages whose top section is a dark field. Renders
 * nothing; on mount it registers with the darkField store (which sets
 * `data-dark-field` on <html> and notifies the header), and clears on
 * unmount. Mounted by /team, /about, /careers, /offices.
 */
export default function DarkChrome() {
  useEffect(() => registerDarkField(), []);
  return null;
}

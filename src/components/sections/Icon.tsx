import { createElement } from "react";
import {
  Activity,
  BadgeCheck,
  BookOpen,
  Boxes,
  Briefcase,
  CircleCheck,
  Clock,
  Code,
  Eye,
  GraduationCap,
  Library,
  Lightbulb,
  MapPin,
  Mic,
  Music,
  NotebookPen,
  PenTool,
  Rocket,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * The content ledger stores an icon by name, so the copy files stay free of
 * React. This is the one place a name becomes rendered output.
 *
 * It resolves through `createElement` rather than assigning the looked-up
 * component to a capitalised local: a component value produced during render
 * is a fresh identity on every pass, which remounts its subtree and is what
 * `react-hooks/static-components` exists to catch.
 *
 * An unknown name falls back to a neutral mark rather than throwing, so a new
 * ledger entry can never take a page down.
 */
const icons: Record<string, LucideIcon> = {
  Activity,
  BadgeCheck,
  BookOpen,
  Boxes,
  Briefcase,
  CircleCheck,
  Clock,
  Code,
  Eye,
  GraduationCap,
  Library,
  Lightbulb,
  MapPin,
  Mic,
  Music,
  NotebookPen,
  PenTool,
  Rocket,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Users,
  Zap,
};

export default function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return createElement(icons[name] ?? Sparkles, { className });
}

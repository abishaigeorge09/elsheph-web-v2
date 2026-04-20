# Changelog

## [v1.1] — 2026-02-18

### New Features

#### University Page (`/university`)
- Full-screen hero section with `university-campus.png` background, centred layout, pill badge, and two CTAs
- **Stats bar** — 350+ students trained, 12+ corporate partners, 3 countries active, 100% project-based
- **Academic Collaborations** — scrolling marquee with SRM Institute logo
- **What We Bring** — 6 offer cards in a 3-column grid, each with an icon:
  - Product-Based Internships
  - Structured Engineering Training
  - Corporate Exposure & Placement Pipeline
  - Verified Certification
  - Campus Innovation Cell Support
  - Global University Network
- **How It Works** — 4-step process section with a desktop connecting line:
  1. Initial Partnership Discussion
  2. Program Design
  3. Onboarding & Execution
  4. Certification & Placement
- **Impact & Alumni** — two-column layout with testimonials and placement company chips (L&T, Capgemini, Cognizant, etc.)
- **Incubation CTA** — ambient glow background, 3 feature cards (Innovation Labs, Semester Integration, Placement MOUs)
- **University Contact Form** — dedicated partnership inquiry form with:
  - Name, university email, institution name, role dropdown, message fields
  - Role options: HOD, Placement Officer, Innovation Lead, Faculty, Student, Other
  - Submits to `university_contacts` Supabase table (separate from main contacts)
  - Contact email: `university@elsheph.com`

---

### Improvements

#### Hero Section (home page)
- Replaced `hero.png` with new `hero.jpg` (mountain road landscape)
- Updated headline: **"Products built from ideas. Shipped for the real world."**
- Updated subtext: **"Product development, IT services, and staffing"**
- Added Contact Us button visible on mobile only, positioned below the tagline
- Added subtle product launch pill: `• Product Launch — April 30 >`

#### Navbar
- **Transparent on landing**, smoothly transitions to dark (`bg-[#0B0B0B]/95`) on scroll (threshold: 80px, duration: 500ms ease-out)
- **Nav link order** updated: Home → Services → Products → University
- Removed "Contact" from nav links (Contact Us CTA button on the right retained)
- **Active section detection** via scroll — nav link highlights as each section enters view
- Fixed section detection ordering bug (Services comes before Products in page layout)
- Removed pill/glass background bar on mobile view
- Brighter active link background: `bg-[#8B6F47]/60`
- Contact Us button base colour brightened to `#A07850`

#### Next.js Config
- React Compiler disabled in development mode (production-only) — faster local compile times
- Turbopack root set to project directory, silencing lockfile detection warning

---

### Bug Fixes
- University page stat cards 2 & 3 had no numbers — fixed with consistent number/label/sub layout
- Removed dead `#` link ("Download Partnership Overview")
- Removed SRM Institute name from testimonial attributions
- Removed stray "Actively engaging with departments..." footer text in university page
- Fixed navbar background transition — no more flicker on scroll
- Fixed Services button active-state glitch caused by wrong section ordering

---

### Database
- New Supabase table: `university_contacts`
  - Columns: `id`, `name`, `email`, `university`, `role`, `message`, `created_at`
  - Row Level Security enabled with public insert policy
  - University page form now inserts here instead of the shared `contacts` table

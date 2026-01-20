# AI/ML Portfolio

Modern portfolio website built with Next.js 16, featuring Aceternity UI components and advanced animations.

**Live:** [https://codexmanvik.github.io](https://codexmanvik.github.io)

## Tech Stack

- **Framework:** Next.js 16 (App Router, Static Export)
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion 11
- **Icons:** Lucide React
- **Testing:** Vitest + Playwright
- **Deployment:** GitHub Pages (GitHub Actions)

## Features

- ✨ Aceternity UI components (Spotlight, Bento Grid, Infinite Marquee, Tracing Beam)
- 🎯 Interactive project modals with detailed views
- 📱 Fully responsive (mobile-first design)
- ⚡ Optimized performance (static export, code splitting)
- 🎨 Glassmorphism design with gradient effects
- 📧 Contact form with Formspree integration
- 🔍 SEO optimized
- ♿ WCAG 2.1 AA accessibility compliant
- 🧪 Comprehensive test coverage (unit + E2E)

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# E2E tests
npm run test:e2e
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx
│   │   ├── ProjectsGrid.tsx
│   │   ├── ExperienceTimeline.tsx
│   │   ├── TechStackMarquee.tsx
│   │   └── Contact.tsx
│   └── ui/                # Reusable UI components
│       ├── spotlight.tsx
│       ├── bento-grid.tsx
│       ├── infinite-cards.tsx
│       ├── tracing-beam.tsx
│       ├── moving-border.tsx
│       └── project-modal.tsx
├── data/                  # Content configuration
│   ├── projects.ts        # Project data
│   ├── experience.ts      # Work/education history
│   ├── types.ts           # TypeScript interfaces
│   └── schemas.ts         # Zod validation schemas
├── lib/
│   ├── hooks/             # Custom React hooks
│   └── utils.ts           # Utility functions
├── e2e/                   # Playwright E2E tests
└── public/
    └── assets/            # Static assets (resume, etc.)
```

## Configuration

### Update Personal Info

**Hero Section** (`components/sections/Hero.tsx`):
```typescript
// Update name, title, description
```

**Contact Form** (`components/sections/Contact.tsx`):
```typescript
// Replace PLACEHOLDER_FORMSPREE_ID with your Formspree form ID
fetch('https://formspree.io/f/YOUR_FORM_ID', ...)
```

**Social Links** (already configured):
- Email: manvik.talwar@gmail.com
- GitHub: https://github.com/CodexManvik
- LinkedIn: https://linkedin.com/in/manvik-talwar

### Update Projects

Edit `data/projects.ts`:
```typescript
export const projects: Project[] = [
  {
    id: 'unique-id',
    title: 'Project Name',
    company: 'Company/Type',
    description: 'Short description',
    fullDetail: 'Detailed description for modal',
    technologies: ['Tech1', 'Tech2'],
    repoUrl: 'https://github.com/...',
    demoUrl: 'https://youtu.be/...',  // Optional
    metrics: [
      { label: 'Metric', value: 'Value' }
    ],
    gridSpan: { cols: 2, rows: 1 }
  }
]
```

### Update Experience

Edit `data/experience.ts`:
```typescript
export const experience: ExperienceEntry[] = [
  {
    id: 'unique-id',
    type: 'work' | 'education',
    title: 'Position/Degree',
    organization: 'Company/University',
    duration: 'Jan 2023 - Present',
    description: ['Point 1', 'Point 2'],
    achievements: ['Achievement 1']  // Optional
  }
]
```

## Deployment

### GitHub Pages (Automated)

1. Push to `main` branch:
```bash
git add .
git commit -m "feat: update portfolio"
git push origin main
```

2. Enable GitHub Pages:
   - Go to repo Settings → Pages
   - Source: GitHub Actions
   - Workflow auto-deploys on push

3. Site live at: `https://codexmanvik.github.io`

### Manual Deployment

```bash
npm run build
# Upload ./out directory to hosting provider
```

## Testing

```bash
# Unit tests (Vitest)
npm test

# E2E tests (Playwright)
npm run test:e2e

# Visual regression tests
npm run test:e2e -- visual-regression

# Accessibility tests
npm run test:e2e -- accessibility

# Performance tests (Lighthouse)
npm run lighthouse
```

## Performance

- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Lighthouse Score:** 90+
- **Bundle Size:** Optimized with code splitting

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## License

MIT

## Contact

- **Email:** manvik.talwar@gmail.com
- **GitHub:** [@CodexManvik](https://github.com/CodexManvik)
- **LinkedIn:** [manvik-talwar](https://linkedin.com/in/manvik-talwar)

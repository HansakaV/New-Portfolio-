/* ─────────────────────────────────────────────────
   src/data/experience.js
   All domain data for the Skills / Experience section
───────────────────────────────────────────────── */

import logoDpComm from '../assets/dp-communication.png';
import logoJezzy  from '../assets/jezzy.jpg';
import logoSaman  from '../assets/saman.png';
import logoSmart  from '../assets/smart.jpg';

/** Services offered — rendered as 3-col card grid */
export const services = [
  {
    id: '01',
    icon: '◈',
    title: 'Web Development',
    tagline: 'Pixel-perfect, blazing fast',
    desc: 'End-to-end web solutions from architecture to deployment. I craft responsive, performant applications with clean, maintainable code that scales.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript', 'REST API'],
    accent: '#00ff88',
    glow: 'rgba(0,255,136,0.12)',
  },
  {
    id: '02',
    icon: '⬡',
    title: 'Web Applications',
    tagline: 'Complex logic, simple UX',
    desc: 'Full-stack SaaS platforms, dashboards, and enterprise apps. From real-time collaboration tools to data-heavy analytics systems.',
    tags: ['PostgreSQL', 'MongoDB', 'GraphQL', 'WebSockets', 'AWS'],
    accent: '#00ff88',
    glow: 'rgba(0,255,136,0.12)',
  },
  {
    id: '03',
    icon: '◻',
    title: 'Mobile Apps',
    tagline: 'Native feel, cross-platform',
    desc: 'Cross-platform mobile applications with fluid UX, offline support, and native device integrations shipped to both iOS and Android.',
    tags: ['React Native', 'Expo', 'Firebase', 'Push Notifications'],
    accent: '#00ff88',
    glow: 'rgba(0,255,136,0.12)',
  },
  {
    id: '04',
    icon: '⟁',
    title: 'SEO Optimisation',
    tagline: 'Rank higher, convert more',
    desc: 'Technical SEO audits, Core Web Vitals optimisation, structured data, and performance tuning that moves the needle on organic search.',
    tags: ['Core Web Vitals', 'Schema.org', 'Lighthouse', 'Sitemap', 'Meta'],
    accent: '#00ff88',
    glow: 'rgba(0,255,136,0.12)',
  },
  {
    id: '05',
    icon: '▲',
    title: 'Cloud & DevOps',
    tagline: 'Infrastructure that never sleeps',
    desc: 'Cloud architecture, CI/CD pipelines, containerisation, and serverless deployments engineered for reliability and cost efficiency.',
    tags: ['AWS', 'GCP', 'Docker', 'GitHub Actions', 'Terraform'],
    accent: '#00ff88',
    glow: 'rgba(0,255,136,0.12)',
  },
  {
    id: '06',
    icon: '✦',
    title: 'Social Media & Growth',
    tagline: 'Content that converts',
    desc: 'Social media strategy, content scheduling, analytics dashboards, and automation integrations to grow your brand across platforms.',
    tags: ['Meta Ads', 'Analytics', 'Automation', 'Branding', 'Strategy'],
    accent: '#00ff88',
    glow: 'rgba(0,255,136,0.12)',
  },
];

/** Tech stack pills shown at the bottom of the services grid */
export const techStack = [
  'React', 'Next.js', 'Node.js', 'TypeScript', 'Python',
  'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL',
  'React Native', 'Tailwind', 'GSAP', 'Three.js', 'FastAPI',
];

/** Animated stats shown in the experience banner */
export const experienceStats = [
  { num: 1,  suffix: '+', label: 'Year Freelance',      sub: 'Independent Consulting' },
  { num: 4,  suffix: '',  label: 'Happy Clients',       sub: 'Local Businesses Served' },
  { num: 8,  suffix: '',  label: 'Months Industry Exp', sub: 'At Intirx Digital' },
  { num: 10, suffix: '+', label: 'Projects Shipped',    sub: 'Web · Mobile · Cloud' },
];

/** Industry / internship experience */
export const industryExperience = [
  {
    dateRange: 'Nov 2025 — Present · 8 months',
    role: 'Associate Software Engineer Intern',
    company: 'Intirx Digital',
    companyUrl: 'https://www.intrixdigital.com/',
    badge: 'Full-Time Internship',
    desc: 'Contributed to production-grade web applications across the full stack — building React frontends, Node.js APIs, and cloud-deployed services. Collaborated within an agile team delivering client projects on tight schedules.',
    tags: ['React', 'Node.js', 'MongoDB', 'AWS', 'Agile', 'REST API'],
  },
];

/** Freelance client showcase — logo marquee */
export const freelanceClients = [
  {
    name: 'DP Communication',
    location: 'Nivithigala',
    type: 'Telecom & IT Services',
    logo: logoDpComm,
    work: 'Business website, online presence setup & digital branding.',
  },
  {
    name: 'Saman Tyre House',
    location: 'Nivithigala',
    type: 'Automotive Retail',
    logo: logoSaman,
    work: 'Product catalogue web page, inventory showcase & SEO optimisation.',
  },
  {
    name: 'Jezzy Travels & Tours',
    location: 'Sri Lanka',
    type: 'Travel & Tourism',
    logo: logoJezzy,
    work: 'Tour booking website, social media integration & Google Maps embed.',
  },
  {
    name: 'SMART Education Center',
    location: 'Nivithigala',
    type: 'EdTech & Tutoring',
    logo: logoSmart,
    work: 'Enrollment platform, class schedules & Student Management portal.',
  },
];

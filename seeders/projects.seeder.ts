import {registerSeeder, key} from './helpers.js'
import type {SanityClient} from '@sanity/client'

// All projects, inlined so the seeder is self-contained (no external JSON
// dependency). Category membership is no longer a field on the project —
// it's recorded as references on each `projectCategory.projects[]` array
// (see project-categories.seeder.ts). Display order also comes from those
// arrays.
//
// Gallery items reuse the seeder pattern: image items get a `_key` only
// here; their actual image refs are populated separately by images.seeder.ts
// (which reuses each project's thumbnail file across its image gallery
// items). Video items inline the videoUrl + caption.

interface GalleryImage {
  _key: string
  _type: 'image'
  caption: string
}
interface GalleryVideo {
  _key: string
  _type: 'galleryVideo'
  caption: string
  videoUrl: string
}
type GalleryItem = GalleryImage | GalleryVideo

interface ProjectSpec {
  id: string
  slug: string
  title: string
  description: string
  about: string
  features: string[]
  techStack: string[]
  gallery: GalleryItem[]
  liveUrl?: string
  githubUrl?: string
}

const projects: ProjectSpec[] = [
  {
    id: 'project-codemaster',
    slug: 'codemaster',
    title: 'CodeMaster',
    description: 'An interactive coding platform inspired by Codingbat that helps users practice JavaScript with real-time feedback.',
    about: 'CodeMaster is a full-stack coding practice platform designed to make learning JavaScript more engaging and efficient. It features over 130 curated problems and a built-in code editor that allows users to write and execute code directly in the browser. The platform supports authentication, multiple languages, and a modern UI with dark mode. It emphasizes performance, security, and a smooth user experience through optimized state management and sandboxed code execution.',
    features: [
      '130+ JavaScript coding problems',
      'Real-time code execution and feedback',
      'LeetCode-style in-browser code editor',
      'Secure VM-based sandbox for code execution',
      'User authentication with email support',
      'Multilingual support',
      'Dark mode UI',
      'Optimized global state management',
    ],
    techStack: ['Next.js', 'TypeScript', 'React.js', 'Node.js', 'JavaScript', 'Zustand', 'Tailwind CSS', 'Radix UI', 'Shadcn UI', 'Monaco Editor'],
    gallery: [
      {_key: 'img-b4793f36', _type: 'image', caption: 'Coding problems list'},
      {_key: 'img-726a3e81', _type: 'image', caption: 'In-browser code editor'},
    ],
    liveUrl: 'https://codingbatjs.vercel.app/',
  },
  {
    id: 'project-subject-test-platform',
    slug: 'subject-test-platform',
    title: 'Subject Test Platform',
    description: 'An interactive web app for TDPU students to prepare for exams through quizzes and practice questions.',
    about: 'Subject Test Platform is a web-based test preparation tool built to help TDPU students efficiently study for exams. It features a large, structured question bank created by parsing over 1,000 questions from a Word document into JSON format using Python. The platform delivers a smooth and accessible user experience with dynamic quizzes, responsive design, and efficient state management, making it easy for students to practice and track their learning.',
    features: [
      'Large question bank with 1,000+ questions',
      'Interactive quizzes and practice tests',
      'Dynamic question rendering from JSON data',
      'Clean and responsive UI',
      'State management using Zustand',
      'Accessible UI components with Radix UI',
      'Optimized for performance and usability',
    ],
    techStack: ['TypeScript', 'Python', 'Next.js', 'Zustand', 'Tailwind CSS', 'Radix UI'],
    gallery: [
      {_key: 'img-c122b7c1', _type: 'image', caption: 'Quiz interface'},
      {_key: 'img-16566d7e', _type: 'image', caption: 'Results screen'},
    ],
    liveUrl: 'https://tdpu-test.vercel.app/',
  },
  {
    id: 'project-smart-resume-matcher',
    slug: 'smart-resume-matcher',
    title: 'Smart Resume Matcher',
    description: 'An AI-powered platform that analyzes resumes against job descriptions and provides actionable feedback to improve job application success.',
    about: 'Smart Resume Matcher is a full-stack AI-driven web application designed to help users optimize their resumes for specific job roles. By leveraging Natural Language Processing (NLP) techniques, the platform compares resumes with job descriptions to generate match scores and detailed feedback. It uses Python-based NLP models to analyze content and highlight areas for improvement, while the frontend ensures a seamless experience for uploading and reviewing resumes. The system is deployed for easy access and scalability.',
    features: [
      'Resume and job description comparison',
      'AI-generated match scores',
      'Detailed feedback for resume improvement',
      'NLP-based text analysis using Python',
      'File upload and processing support',
      'API integration for frontend-backend communication',
      'Deployed and accessible via web',
    ],
    techStack: ['Natural Language Processing (NLP)', 'Artificial Intelligence (AI)', 'Python', 'NLTK', 'Scikit-learn', 'Node.js', 'Next.js', 'Axios', 'GitHub', 'Vercel'],
    gallery: [
      {_key: 'img-37e75157', _type: 'image', caption: 'AI match results'},
      {_key: 'img-4234dd23', _type: 'image', caption: 'Resume upload'},
    ],
    githubUrl: 'https://github.com/samabdullaev/cvchecker-frontend',
    liveUrl: 'https://cvchecker-frontend.vercel.app/',
  },
  {
    id: 'project-allmaths',
    slug: 'allmaths',
    title: 'Allmaths',
    description: 'A web-based learning platform that helps children aged 3–15 learn mathematics through interactive and engaging content.',
    about: 'Allmaths is an educational platform designed to make math learning fun and accessible for young learners. It offers a variety of interactive resources including videos, games, books, and worksheets tailored to different age groups. The project was developed following Agile methodologies, covering the full Software Development Life Cycle—from requirements gathering and design to implementation and testing. With a focus on usability and engagement, the platform provides a structured and visually appealing learning experience.',
    features: [
      'Interactive math videos and lessons',
      'Educational games and activities',
      'Access to digital books and worksheets',
      'Age-based learning structure (3–15 years)',
      'User-friendly and engaging UI',
      'Agile-based development process',
    ],
    techStack: ['JavaScript', 'React.js', 'HTML5', 'CSS3', 'Next.js', 'GitHub', 'Balsamiq', 'Confluence'],
    gallery: [
      {_key: 'img-45b257fe', _type: 'image', caption: 'Landing page'},
      {_key: 'img-294b2d5a', _type: 'image', caption: 'Interactive math game'},
    ],
    liveUrl: 'https://allmaths.vercel.app/',
  },
  {
    id: 'project-al-khorezmi',
    slug: 'al-khorezmi',
    title: 'Al Khorezmi Community Centre Website',
    description: 'A bilingual (English & Uzbek) website for a community centre, providing event schedules, prayer times, and contact information.',
    about: 'The Al Khorezmi Community Centre Website is a customer-facing platform designed to keep the community informed about events, Ramadan schedules, visiting ulamas, and other centre activities. Built with Next.js and powered by Sanity CMS, the website allows easy content management for non-technical staff. It supports English and Uzbek languages, displays accurate prayer and Ramadan timings, and includes a gallery and contact functionality. Real-time notifications and responsive design ensure a smooth user experience for visitors across devices.',
    features: [
      'Bilingual content support (English & Uzbek)',
      'Ramadan schedule and prayer timings',
      'Community events and visiting ulama information',
      'Gallery for images and media',
      'Contact form with notifications',
      'CMS-driven content management with Sanity',
      'Responsive design for desktop and mobile',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'Sanity CMS', 'next-intl', 'Zustand', 'Zod', 'Radix UI', 'Axios', 'Telegram Bot API', 'Vercel'],
    gallery: [
      {_key: 'img-f2806265', _type: 'image', caption: 'Prayer times widget'},
      {_key: 'img-4f878ceb', _type: 'image', caption: 'Community events page'},
    ],
    liveUrl: 'https://al-khorezmi.vercel.app/',
  },
  {
    id: 'project-shirina',
    slug: 'shirina',
    title: 'Shirina',
    description: 'A bilingual website for a local brand selling semi-frozen homemade products, offering SEO optimization and easy content management.',
    about: 'Shirina is a web platform developed for a local food brand to provide product information and improve online visibility. The site supports both Uzbek and Russian languages, allowing customers to access product details via QR codes on packaging. A Telegram Bot integration delivers inquiries in real time to the client, and Sanity CMS with custom multilingual schemas enables effortless content updates without developer intervention. The website is fully responsive, SEO-friendly, and designed for easy maintenance by non-technical staff.',
    features: [
      'Bilingual content support (Uzbek & Russian)',
      'Product information accessible via QR codes',
      'SEO-optimized website for improved search visibility',
      'Real-time inquiry notifications via Telegram Bot',
      'CMS-driven content management with Sanity',
      'Custom multilingual schemas for easy updates',
      'Responsive and user-friendly design',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'Sanity CMS', 'next-intl', 'Zustand', 'Zod', 'Radix UI', 'Axios', 'Telegram Bot API', 'Vercel'],
    gallery: [
      {_key: 'img-3bfc0738', _type: 'image', caption: 'Product page'},
      {_key: 'img-2d638b07', _type: 'image', caption: 'Homemade dumplings'},
    ],
    liveUrl: 'https://shirina.uz/',
  },
  {
    id: 'project-actyble',
    slug: 'actyble',
    title: 'Actyble',
    description: 'A modern, SEO-optimized landing page for a social planning startup, designed to showcase features and drive user signups.',
    about: 'Actyble is a high-performance marketing website built for a social planning startup to help users organize and experience events together. Developed with Next.js and powered by Sanity CMS, the platform enables real-time content management while maintaining a fast and responsive user experience. The website is designed to clearly communicate the product vision, build trust, and convert visitors into early users through a waitlist system. It includes structured landing sections, legal and manifesto pages, and a fully integrated contact flow with backend email handling for efficient lead management.',
    features: [
      'SEO-optimized marketing landing page',
      'Structured content sections for product storytelling',
      'Manifesto and legal pages',
      'Waitlist signup with form validation',
      'Contact flow with backend API integration',
      'Automated email handling via server-side endpoint',
      'CMS-driven dynamic content management',
      'Responsive UI with animations and interactive components',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'Sanity CMS', 'Zustand', 'Zod', 'React Hook Form', 'Framer Motion', 'Radix UI', 'Magic UI', 'Swiper', 'Nodemailer'],
    gallery: [
      {_key: 'img-db5c4e36', _type: 'image', caption: 'Landing page'},
      {_key: 'img-8131a9a4', _type: 'image', caption: 'Waitlist signup'},
    ],
    liveUrl: 'https://www.actyble.com/',
  },
  {
    id: 'project-soffin',
    slug: 'soffin',
    title: 'Soffin Accounting Firm Website',
    description: 'A professional, fully responsive website for an accounting firm, built with SvelteKit and Sanity CMS.',
    about: 'The Soffin Accounting Firm Website is a client-focused digital solution developed to establish a strong online presence for an accounting firm in Uzbekistan. Built using SvelteKit and powered by Sanity CMS, the platform organizes company information into a clean, structured, and easy-to-navigate interface. It includes key business sections such as services, team members, articles, and certifications, allowing potential clients to quickly understand the company\'s expertise and credibility. The project emphasizes responsiveness, scalability, and content flexibility through a CMS-driven architecture.',
    features: [
      'Corporate landing and informational pages',
      'Dynamic service, article, and team detail pages',
      'FAQ and certification sections',
      'CMS-driven contact page',
      'Localized content delivery',
      'Reusable query layer for CMS data',
      'Fully responsive and client-ready design',
    ],
    techStack: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'SvelteKit', 'Sanity CMS'],
    gallery: [
      {_key: 'img-5cec11f4', _type: 'image', caption: 'Services page'},
      {_key: 'img-86ae178c', _type: 'image', caption: 'Team page'},
    ],
    liveUrl: 'https://www.soffin.uz/',
  },
  {
    id: 'project-4miles',
    slug: '4miles',
    title: '4Miles',
    description: 'A website for 4Miles, a community club promoting outdoor activities for a healthier, happier lifestyle.',
    about: '4Miles is a community-focused website developed for a club of everyday athletes who believe in the benefits of outdoor activity. The platform showcases club information, events, news, galleries, and contact details to engage members and visitors. Built with Next.js and powered by Sanity CMS, the website allows the client to easily manage content while providing a responsive and interactive experience for users.',
    features: [
      'Informational pages: Home, About, Events, Gallery, News, Contact',
      'CMS-driven content management via Sanity',
      'Responsive design for desktop and mobile',
      'Integration with Telegram Bot API for real-time notifications',
      'Event and news management',
      'Engaging gallery for club activities',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'Sanity CMS', 'Axios', 'Telegram Bot API', 'Vercel'],
    gallery: [
      {_key: 'img-e9723eb4', _type: 'image', caption: 'Landing page'},
      {_key: 'img-5810bf00', _type: 'image', caption: 'Activity gallery'},
    ],
    liveUrl: 'https://4miles.vercel.app/',
  },
  {
    id: 'project-kinaie-ecom',
    slug: 'kinaie-ecom',
    title: 'Kinaie Ecom Landing Page',
    description: 'A responsive, SEO-optimized landing page for an ACCA-approved accounting firm targeting UK eCommerce businesses.',
    about: 'The Kinaie Ecom Landing Page is a modern web solution built for an ACCA-approved accounting firm in London, focused on serving eCommerce businesses operating on platforms like Shopify, Amazon, and Etsy. The site is designed to clearly communicate services, pricing, and value propositions while offering free resources to attract potential clients. With a strong emphasis on conversion, the platform guides users toward booking strategy calls. The project also involved deploying the site to a remote server via FTP and optimizing performance for a seamless user experience.',
    features: [
      'SEO-optimized marketing landing page',
      'Clear presentation of services and pricing',
      'Free resources for lead generation',
      'Conversion-focused design for booking strategy calls',
      'Fully responsive UI',
      'Clean and modern component-based layout',
      'FTP-based deployment to remote server',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'Radix UI', 'Lucide React', 'FTP Deploy'],
    gallery: [
      {_key: 'img-aee937ae', _type: 'image', caption: 'Landing page'},
    ],
    liveUrl: 'https://ecom.kinaie.com/',
  },
  {
    id: 'project-kinaie-growth',
    slug: 'kinaie-growth',
    title: 'Kinaie Growth Landing Page',
    description: 'A responsive landing page for an ACCA-approved accounting firm, showcasing growth-focused services and driving client engagement.',
    about: 'The Kinaie Growth Landing Page is a marketing-focused web solution designed for an ACCA-approved accounting firm in London, targeting UK eCommerce businesses seeking growth-oriented accounting services. The site clearly presents service packages, features, and pricing while guiding visitors toward booking strategy calls. Built with a focus on responsiveness and usability, the platform also includes email-based contact functionality to capture client inquiries efficiently.',
    features: [
      'SEO-friendly, responsive landing page',
      'Clear presentation of packages, features, and pricing',
      'Email-based contact form for client inquiries',
      'Conversion-focused layout to drive strategy call bookings',
      'Modern, interactive UI components',
      'Component-based design for scalability',
      'FTP deployment to remote server',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'Radix UI', 'Lucide React', 'React Hook Form', 'Zod', 'Nodemailer', 'FTP Deploy'],
    gallery: [
      {_key: 'img-6f754e4e', _type: 'image', caption: 'Landing page'},
    ],
    liveUrl: 'https://gb.kinaie.com/',
  },
  {
    id: 'project-joybormi',
    slug: 'joybormi',
    title: 'JoyBormi',
    description: 'A cross-platform booking platform that simplifies reservations for various services including restaurants, game clubs, and healthcare facilities.',
    about: 'JoyBormi is an innovative booking solution developed during a 48-hour hackathon to streamline reservation processes across multiple industries such as dining, entertainment, and healthcare. The platform features a comprehensive multi-step booking system that allows users to select services, schedule appointments, and customize their experience. Built with a strong focus on user experience and design, the project was developed by a team of five and stood out among competitors, achieving 4th place out of 101 teams after multiple evaluation rounds.',
    features: [
      'Multi-service booking system (restaurants, barber shops, hospitals, etc.)',
      'Step-by-step reservation flow',
      'Table selection and food pre-ordering',
      'Time and schedule management',
      'User-focused UI/UX design',
      'Cross-platform mobile application',
    ],
    techStack: ['Flutter', 'Figma', 'Git', 'User Experience (UX)'],
    gallery: [
      {_key: 'img-c8932cae', _type: 'image', caption: 'Service categories'},
      {_key: 'img-e13ceedf', _type: 'image', caption: 'Restaurant table booking'},
      {_key: '6159a2be477c', _type: 'galleryVideo', caption: 'Hackathon presentation', videoUrl: 'https://youtu.be/LrY1Oaah-OQ?t=27728'},
    ],
    liveUrl: 'https://youtu.be/LrY1Oaah-OQ?t=27728',
  },
  {
    id: 'project-tech2',
    slug: 'tech2',
    title: 'Tech 2',
    description: 'An accessibility-focused digital solution designed to support non-traditional learners in overcoming digital literacy challenges.',
    about: 'Tech 2 is a user-centered prototype developed to address the barriers non-traditional learners face when engaging with digital platforms. The project involved in-depth research into accessibility and digital literacy challenges, followed by the design of an intuitive and inclusive solution. Built with a strong emphasis on usability, the prototype was created and presented as part of a competitive hackathon, where it stood out for its impact and innovation—winning the \'Tech\' category among six UK teams in Phase 2.',
    features: [
      'Accessibility-focused design for diverse learners',
      'Simplified and intuitive user interface',
      'Research-driven problem identification and solution design',
      'Prototype showcasing key user flows',
      'Emphasis on inclusivity and usability',
    ],
    techStack: ['Figma', 'Balsamiq', 'HTML', 'CSS', 'JavaScript', 'Canva'],
    gallery: [
      {_key: 'img-f30eb21c', _type: 'image', caption: 'Accessible UI'},
      {_key: '1740dfd3c02c', _type: 'galleryVideo', caption: 'Hackathon presentation', videoUrl: 'https://vimeo.com/779245646#t=1747'},
    ],
    liveUrl: 'https://vimeo.com/779245646#t=1747',
  },
  {
    id: 'project-locus',
    slug: 'locus',
    title: 'Locus',
    description: 'A mobile app that helps the deafblind community discover accessible venues and organize social meetups.',
    about: 'Locus is an accessibility-driven mobile application developed during the 48-hour "Code for Good" hackathon in London. Built by a team of six, the app focuses on empowering the deafblind community by enabling users to find, share, and review accessible venues while also organizing social meetups. The platform integrates a map-based interface for venue discovery and includes features for community interaction and personalization. With a full-stack architecture, Locus combines a mobile frontend with a scalable backend and cloud hosting.',
    features: [
      'Map-based venue discovery',
      'Upload and review accessible locations',
      'Meetup planning and social coordination',
      'User settings and accessibility customization',
      'Community-driven content and feedback',
      'Cross-platform mobile interface',
    ],
    techStack: ['React Native (Expo)', 'Python', 'Django', 'Amazon EC2', 'SQLite', 'REST APIs', 'GitHub'],
    gallery: [
      {_key: 'img-b889ebde', _type: 'image', caption: 'Venue map'},
      {_key: 'img-9550cd28', _type: 'image', caption: 'Meetup planning'},
    ],
  },
]

registerSeeder({
  name: 'projects',
  async up(client: SanityClient) {
    for (const p of projects) {
      await client.createOrReplace({
        _id: p.id,
        _type: 'project',
        title: p.title,
        slug: {_type: 'slug', current: p.slug},
        description: p.description,
        about: p.about,
        features: p.features,
        techStack: p.techStack,
        gallery: p.gallery,
        ...(p.liveUrl ? {liveUrl: p.liveUrl} : {}),
        ...(p.githubUrl ? {githubUrl: p.githubUrl} : {}),
      })
      console.log(`     Created project: ${p.title}`)
    }
  },
  async down(client: SanityClient) {
    const ids = projects.map((p) => p.id)
    const draftIds = ids.map((id) => `drafts.${id}`)
    await client.delete({query: `*[_id in ${JSON.stringify([...ids, ...draftIds])}]`})
  },
})

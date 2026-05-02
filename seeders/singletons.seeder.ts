import {registerSeeder, key} from './helpers.js'
import type {SanityClient} from '@sanity/client'

registerSeeder({
  name: 'singletons',
  async up(client: SanityClient) {
    await client.createOrReplace({
      _id: 'homePage',
      _type: 'homePage',
      name: 'Sam Abdullaev',
      title: 'Frontend Software Engineer',
      location: 'United Kingdom',
      socials: [
        {_key: key(), _type: 'socialLink', platform: 'LinkedIn', url: 'https://www.linkedin.com/in/samabdullaev/'},
        {_key: key(), _type: 'socialLink', platform: 'GitHub', url: 'https://github.com/samabdullaev'},
        {_key: key(), _type: 'socialLink', platform: 'Medium', url: 'https://medium.com/@samabdullaev'},
      ],
      ctaLabel: 'Learn more about me',
      ctaUrl: '/about',
    })
    console.log('     Created homePage')

    await client.createOrReplace({
      _id: 'aboutPage',
      _type: 'aboutPage',
      bioParagraphs: [
        {_key: key(), summary: 'I am a Frontend Software Engineer based in the UK, with 2+ years of experience building scalable and user-focused web applications.', expandedText: ' I have worked with startups and SMEs across ed-tech, e-commerce, and SaaS, helping design and develop fast, accessible, and performance-optimized interfaces.'},
        {_key: key(), summary: 'I graduated with First Class Honours in Computer Science (Artificial Intelligence) from the University of Hertfordshire, and spent a year at Concordia University in Montreal as part of an exchange program.', expandedText: ' My academic background, combined with hands-on industry experience, has given me a strong foundation in both engineering principles and real-world product development.'},
        {_key: key(), summary: 'Over the years, I have worked with technologies including JavaScript, TypeScript, React, Next.js, and modern UI frameworks.', expandedText: ' I focus on building clean, maintainable code and creating seamless user experiences, with an increasing interest in integrating AI into frontend applications to build smarter and more personalized products.'},
        {_key: key(), summary: 'I enjoy working on challenging problems and learning by building.', expandedText: ' I have actively participated in hackathons, placing Top 4 in Hacknovation 2024, winning UniHack 2022, and ranking in the Top 400 globally in the Meta Global Hackathon. Alongside this, I write technical blogs on Medium and LeetCode, and regularly share my learning journey and progress on LinkedIn.'},
        {_key: key(), summary: "I'm driven by continuous growth and enjoy working on products that have real impact.", expandedText: ' My long-term goal is to become a Software Engineer at Google, and I\'m consistently working towards that through building, learning, and pushing my limits.'},
      ],
      contributions: [
        {_key: key(), emoji: '🔗', title: 'LinkedIn', description: 'Share monthly updates tracking my journey toward becoming a Software Engineer at Google.', url: 'https://www.linkedin.com/in/samabdullaev/'},
        {_key: key(), emoji: '🎓', title: 'UzTech IT Society (UK)', description: 'Organise events, coordinate training, contribute to projects, and lead initiatives.', url: 'https://t.me/UzTechUK'},
        {_key: key(), emoji: '💻', title: 'GitHub', description: 'Build and maintain personal projects to showcase my coding skills.', url: 'https://github.com/samabdullaev'},
        {_key: key(), emoji: '📝', title: 'Publink', description: 'Publish mentorship articles in Uzbek on technology, education, and personal growth.', url: 'https://publink.uz/profile/samandar-abdullaev'},
        {_key: key(), emoji: '✍️', title: 'Medium', description: 'Write blogs on studying abroad, self-improvement, and technology.', url: 'https://samabdullaev.medium.com/'},
        {_key: key(), emoji: '🎯', title: 'Kompas', description: 'Guide school students on university choices and career development.', url: 'https://t.me/kompas_17'},
        {_key: key(), emoji: '🧩', title: 'LeetCode', description: 'Solve coding problems and share solutions in Python, MySQL, and JavaScript.', url: 'https://leetcode.com/samabdullaev'},
      ],
      hobbies: [
        {_key: key(), emoji: '✍️', label: 'Writing'},
        {_key: key(), emoji: '🚶', label: 'Walking'},
        {_key: key(), emoji: '♟️', label: 'Playing Chess'},
        {_key: key(), emoji: '🧩', label: 'Puzzle Games'},
        {_key: key(), emoji: '🤝', label: 'Volunteering'},
        {_key: key(), emoji: '🥋', label: 'Taekwondo'},
        {_key: key(), emoji: '🏓', label: 'Ping-Pong'},
        {_key: key(), emoji: '✈️', label: 'Travelling'},
      ],
    })
    console.log('     Created aboutPage')

    await client.createOrReplace({
      _id: 'siteSettings',
      _type: 'siteSettings',
      siteTitle: 'Sam Abdullaev',
      footerText: '© samabdullaev.com',
    })
    console.log('     Created siteSettings')
  },
  async down(client: SanityClient) {
    await client.delete({query: '*[_id in ["homePage", "aboutPage", "siteSettings", "drafts.homePage", "drafts.aboutPage", "drafts.siteSettings"]]'})
  },
})

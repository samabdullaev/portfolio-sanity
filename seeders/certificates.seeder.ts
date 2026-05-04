import {registerSeeder} from './helpers.js'
import type {SanityClient} from '@sanity/client'

// issuerId references the _id of a certificateIssuer document (see certificate-issuers.seeder.ts)
const issuerGroups = [
  {
    issuerId: 'issuer-cs50',
    certs: [
      {title: "CS50's Introduction to Programming with Python", date: 'Dec 2023', verifyUrl: 'https://www.edx.org/learn/python/harvard-university-cs50-s-introduction-to-programming-with-python'},
      {title: "CS50's Introduction to Databases with SQL",      date: 'Dec 2023', verifyUrl: 'https://www.edx.org/learn/sql/harvard-university-cs50-s-introduction-to-databases-with-sql'},
    ],
  },
  {
    issuerId: 'issuer-python-institute',
    certs: [
      {title: 'PCAP – Certified Associate Python Programmer',  date: 'Jul 2022', verifyUrl: 'https://pythoninstitute.org/pcap'},
      {title: 'PCEP – Certified Entry-Level Python Programmer', date: 'Jul 2022', verifyUrl: 'https://pythoninstitute.org/pcep'},
    ],
  },
  {
    issuerId: 'issuer-hackerrank',
    certs: [
      {title: 'Software Engineer Intern', date: 'May 2024', verifyUrl: 'https://www.hackerrank.com/skills-verification/software_engineer_intern'},
      {title: 'SQL (Intermediate)',       date: 'Sep 2022', verifyUrl: 'https://www.hackerrank.com/skills-verification/sql_intermediate'},
      {title: 'SQL (Basic)',              date: 'Sep 2022', verifyUrl: 'https://www.hackerrank.com/skills-verification/sql_basic'},
      {title: 'Python (Basic)',           date: 'Sep 2022', verifyUrl: 'https://www.hackerrank.com/skills-verification/python_basic'},
      {title: 'CSS',                      date: 'Sep 2022', verifyUrl: 'https://www.hackerrank.com/skills-verification/css'},
    ],
  },
  {
    issuerId: 'issuer-awards-hackathons',
    certs: [
      {title: 'Hacknovation 2024 — 4th Place Finisher',                date: 'May 2024', verifyUrl: null},
      {title: 'Bright Network IEUK 2023: Technology Participant',      date: 'Jul 2023', verifyUrl: null},
      {title: 'Gold Go Herts Award Achiever',                          date: 'Jun 2023', verifyUrl: null},
      {title: 'High Achiever 21/22 Academic Year',                     date: 'Dec 2022', verifyUrl: null},
      {title: 'UniHack 2022 "Tech" Winner',                            date: 'Dec 2022', verifyUrl: null},
      {title: '"Code for Good" Hackathon Participant',                 date: 'Oct 2022', verifyUrl: null},
      {title: 'Meta Global Hackathon 2022 — Top 400 Finisher',         date: 'Sep 2022', verifyUrl: null},
    ],
  },
  {
    issuerId: 'issuer-coursera',
    certs: [
      {title: 'Version Control',                       date: 'Aug 2022', verifyUrl: 'https://www.coursera.org/learn/introduction-to-version-control'},
      {title: 'Programming with JavaScript',           date: 'Aug 2022', verifyUrl: 'https://www.coursera.org/learn/programming-with-javascript'},
      {title: 'Introduction to Front-End Development', date: 'Aug 2022', verifyUrl: 'https://www.coursera.org/learn/introduction-to-front-end-development'},
      {title: 'Learning How to Learn',                 date: 'Aug 2022', verifyUrl: 'https://www.coursera.org/learn/learning-how-to-learn'},
    ],
  },
  {
    issuerId: 'issuer-freecodecamp',
    certs: [
      {title: 'Responsive Web Design', date: 'Oct 2024', verifyUrl: 'https://www.freecodecamp.org/learn/2022/responsive-web-design'},
    ],
  },
  {
    issuerId: 'issuer-forage',
    certs: [
      {title: 'JPMorganChase Software Engineering Virtual Experience',          date: 'Nov 2022', verifyUrl: 'https://www.theforage.com/simulations'},
      {title: 'Accenture Developer Virtual Experience Program',                 date: 'Nov 2022', verifyUrl: 'https://www.theforage.com/simulations'},
      {title: 'Accenture Developer and Technology Virtual Experience Program',  date: 'Nov 2022', verifyUrl: 'https://www.theforage.com/simulations'},
      {title: 'Align Technology Software Engineering Virtual Experience Program', date: 'Nov 2022', verifyUrl: 'https://www.theforage.com/simulations'},
      {title: 'JPMorganChase Agile Virtual Experience Program',                 date: 'Nov 2022', verifyUrl: 'https://www.theforage.com/simulations'},
    ],
  },
  {
    issuerId: 'issuer-linkedin-learning',
    certs: [
      {title: 'How to Have a Great Day at Work With Caroline Webb',              date: 'Nov 2022', verifyUrl: 'https://www.linkedin.com/learning/how-to-have-a-great-day-at-work-with-caroline-webb'},
      {title: 'Programming Foundations: Fundamentals',                           date: 'Sep 2022', verifyUrl: 'https://www.linkedin.com/learning/programming-foundations-fundamentals-3'},
      {title: 'Learning Python',                                                 date: 'Sep 2022', verifyUrl: 'https://www.linkedin.com/learning/learning-python-14393370'},
      {title: 'Introduction to Web Design and Development',                      date: 'Sep 2022', verifyUrl: 'https://www.linkedin.com/learning/introduction-to-web-design-and-development-14628245'},
      {title: 'Microsoft Cloud Fundamentals: SharePoint Online, OneDrive, and Teams', date: 'Sep 2022', verifyUrl: 'https://www.linkedin.com/learning/microsoft-cloud-fundamentals-sharepoint-online-onedrive-and-teams'},
      {title: 'Digital Accessibility for the Modern Workplace',                  date: 'Sep 2022', verifyUrl: 'https://www.linkedin.com/learning/digital-accessibility-for-the-modern-workplace'},
      {title: 'Zoom Essential Training',                                         date: 'Sep 2022', verifyUrl: 'https://www.linkedin.com/learning/zoom-essential-training'},
      {title: 'Microsoft Teams Tips and Tricks',                                 date: 'Sep 2022', verifyUrl: 'https://www.linkedin.com/learning/microsoft-teams-tips-and-tricks-2022'},
      {title: 'Microsoft Planner Essential Training',                            date: 'Sep 2022', verifyUrl: 'https://www.linkedin.com/learning/microsoft-planner-essential-training-2021'},
      {title: 'SharePoint Online: Managing Documents',                           date: 'Sep 2022', verifyUrl: 'https://www.linkedin.com/learning/sharepoint-online-managing-documents'},
      {title: 'Learning OneDrive',                                               date: 'Sep 2022', verifyUrl: 'https://www.linkedin.com/learning/learning-onedrive-2021'},
      {title: 'Learning LinkedIn',                                               date: 'Sep 2022', verifyUrl: 'https://www.linkedin.com/learning/learning-linkedin-2022/get-started-with-linkedin'},
      {title: 'PowerPoint: Eight Easy Ways to Make Your Presentation Stand Out', date: 'Sep 2022', verifyUrl: 'https://www.linkedin.com/learning/powerpoint-eight-easy-ways-to-make-your-presentation-stand-out'},
      {title: 'Excel: VLOOKUP and XLOOKUP for Beginners',                        date: 'Sep 2022', verifyUrl: 'https://www.linkedin.com/learning/excel-vlookup-and-xlookup-for-beginners-11690751'},
      {title: 'Introduction to Video Editing',                                   date: 'Sep 2022', verifyUrl: 'https://www.linkedin.com/learning/introduction-to-video-editing'},
    ],
  },
  {
    issuerId: 'issuer-springpod',
    certs: [
      {title: '"Inclusive Futures: Technology" Insight Event', date: 'Dec 2022', verifyUrl: 'https://www.springpod.com/'},
    ],
  },
]

registerSeeder({
  name: 'certificates',
  async up(client: SanityClient) {
    let order = 1
    for (const group of issuerGroups) {
      for (const cert of group.certs) {
        const id = `cert-${order}`
        // Create if missing so the existing image-asset reference (uploaded by images.seeder)
        // is preserved on re-runs.
        await client.createIfNotExists({
          _id: id,
          _type: 'certificate',
          title: cert.title,
        })
        await client.patch(id).set({
          title: cert.title,
          issuer: {_type: 'reference', _ref: group.issuerId},
          date: cert.date,
          ...(cert.verifyUrl ? {verifyUrl: cert.verifyUrl} : {}),
          order,
        }).commit()
        order++
      }
      console.log(`     Seeded ${group.certs.length} certs for: ${group.issuerId}`)
    }
  },
  async down(client: SanityClient) {
    await client.delete({query: '*[_type == "certificate"]'})
  },
})

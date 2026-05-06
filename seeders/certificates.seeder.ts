import {registerSeeder} from './helpers.js'
import type {SanityClient} from '@sanity/client'

// Issuer membership now lives on certificateIssuer.certificates[] (array of
// references) — see certificate-issuers.seeder.ts. Each cert here is a flat
// document; its issuer + display order are determined by which issuer's
// array contains it.
//
// IDs (cert-1 through cert-42) are referenced by certificate-issuers.seeder.ts
// and images.seeder.ts, so the order MUST stay stable.
//
// Dates are ISO YYYY-MM-DD. Source records were month-precision only
// ("Aug 2022"), so the day is fixed to the 1st — display layer formats
// back to "Aug 2022" via formatMonthYear().
const certs = [
  // CS50
  {id: 'cert-1', title: "CS50's Introduction to Programming with Python", date: '2023-12-01', verifyUrl: 'https://www.edx.org/learn/python/harvard-university-cs50-s-introduction-to-programming-with-python'},
  {id: 'cert-2', title: "CS50's Introduction to Databases with SQL",      date: '2023-12-01', verifyUrl: 'https://www.edx.org/learn/sql/harvard-university-cs50-s-introduction-to-databases-with-sql'},
  // Python Institute
  {id: 'cert-3', title: 'PCAP – Certified Associate Python Programmer',   date: '2022-07-01', verifyUrl: 'https://pythoninstitute.org/pcap'},
  {id: 'cert-4', title: 'PCEP – Certified Entry-Level Python Programmer', date: '2022-07-01', verifyUrl: 'https://pythoninstitute.org/pcep'},
  // HackerRank
  {id: 'cert-5', title: 'Software Engineer Intern', date: '2024-05-01', verifyUrl: 'https://www.hackerrank.com/skills-verification/software_engineer_intern'},
  {id: 'cert-6', title: 'SQL (Intermediate)',       date: '2022-09-01', verifyUrl: 'https://www.hackerrank.com/skills-verification/sql_intermediate'},
  {id: 'cert-7', title: 'SQL (Basic)',              date: '2022-09-01', verifyUrl: 'https://www.hackerrank.com/skills-verification/sql_basic'},
  {id: 'cert-8', title: 'Python (Basic)',           date: '2022-09-01', verifyUrl: 'https://www.hackerrank.com/skills-verification/python_basic'},
  {id: 'cert-9', title: 'CSS',                      date: '2022-09-01', verifyUrl: 'https://www.hackerrank.com/skills-verification/css'},
  // Awards & Hackathons
  {id: 'cert-10', title: 'Hacknovation 2024 — 4th Place Finisher',                date: '2024-05-01', verifyUrl: null},
  {id: 'cert-11', title: 'Bright Network IEUK 2023: Technology Participant',      date: '2023-07-01', verifyUrl: null},
  {id: 'cert-12', title: 'Gold Go Herts Award Achiever',                          date: '2023-06-01', verifyUrl: null},
  {id: 'cert-13', title: 'High Achiever 21/22 Academic Year',                     date: '2022-12-01', verifyUrl: null},
  {id: 'cert-14', title: 'UniHack 2022 "Tech" Winner',                            date: '2022-12-01', verifyUrl: null},
  {id: 'cert-15', title: '"Code for Good" Hackathon Participant',                 date: '2022-10-01', verifyUrl: null},
  {id: 'cert-16', title: 'Meta Global Hackathon 2022 — Top 400 Finisher',         date: '2022-09-01', verifyUrl: null},
  // Coursera
  {id: 'cert-17', title: 'Version Control',                       date: '2022-08-01', verifyUrl: 'https://www.coursera.org/learn/introduction-to-version-control'},
  {id: 'cert-18', title: 'Programming with JavaScript',           date: '2022-08-01', verifyUrl: 'https://www.coursera.org/learn/programming-with-javascript'},
  {id: 'cert-19', title: 'Introduction to Front-End Development', date: '2022-08-01', verifyUrl: 'https://www.coursera.org/learn/introduction-to-front-end-development'},
  {id: 'cert-20', title: 'Learning How to Learn',                 date: '2022-08-01', verifyUrl: 'https://www.coursera.org/learn/learning-how-to-learn'},
  // FreeCodeCamp
  {id: 'cert-21', title: 'Responsive Web Design', date: '2024-10-01', verifyUrl: 'https://www.freecodecamp.org/learn/2022/responsive-web-design'},
  // Forage
  {id: 'cert-22', title: 'JPMorganChase Software Engineering Virtual Experience',            date: '2022-11-01', verifyUrl: 'https://www.theforage.com/simulations'},
  {id: 'cert-23', title: 'Accenture Developer Virtual Experience Program',                   date: '2022-11-01', verifyUrl: 'https://www.theforage.com/simulations'},
  {id: 'cert-24', title: 'Accenture Developer and Technology Virtual Experience Program',    date: '2022-11-01', verifyUrl: 'https://www.theforage.com/simulations'},
  {id: 'cert-25', title: 'Align Technology Software Engineering Virtual Experience Program', date: '2022-11-01', verifyUrl: 'https://www.theforage.com/simulations'},
  {id: 'cert-26', title: 'JPMorganChase Agile Virtual Experience Program',                   date: '2022-11-01', verifyUrl: 'https://www.theforage.com/simulations'},
  // LinkedIn Learning
  {id: 'cert-27', title: 'How to Have a Great Day at Work With Caroline Webb',                   date: '2022-11-01', verifyUrl: 'https://www.linkedin.com/learning/how-to-have-a-great-day-at-work-with-caroline-webb'},
  {id: 'cert-28', title: 'Programming Foundations: Fundamentals',                                date: '2022-09-01', verifyUrl: 'https://www.linkedin.com/learning/programming-foundations-fundamentals-3'},
  {id: 'cert-29', title: 'Learning Python',                                                      date: '2022-09-01', verifyUrl: 'https://www.linkedin.com/learning/learning-python-14393370'},
  {id: 'cert-30', title: 'Introduction to Web Design and Development',                           date: '2022-09-01', verifyUrl: 'https://www.linkedin.com/learning/introduction-to-web-design-and-development-14628245'},
  {id: 'cert-31', title: 'Microsoft Cloud Fundamentals: SharePoint Online, OneDrive, and Teams', date: '2022-09-01', verifyUrl: 'https://www.linkedin.com/learning/microsoft-cloud-fundamentals-sharepoint-online-onedrive-and-teams'},
  {id: 'cert-32', title: 'Digital Accessibility for the Modern Workplace',                       date: '2022-09-01', verifyUrl: 'https://www.linkedin.com/learning/digital-accessibility-for-the-modern-workplace'},
  {id: 'cert-33', title: 'Zoom Essential Training',                                              date: '2022-09-01', verifyUrl: 'https://www.linkedin.com/learning/zoom-essential-training'},
  {id: 'cert-34', title: 'Microsoft Teams Tips and Tricks',                                      date: '2022-09-01', verifyUrl: 'https://www.linkedin.com/learning/microsoft-teams-tips-and-tricks-2022'},
  {id: 'cert-35', title: 'Microsoft Planner Essential Training',                                 date: '2022-09-01', verifyUrl: 'https://www.linkedin.com/learning/microsoft-planner-essential-training-2021'},
  {id: 'cert-36', title: 'SharePoint Online: Managing Documents',                                date: '2022-09-01', verifyUrl: 'https://www.linkedin.com/learning/sharepoint-online-managing-documents'},
  {id: 'cert-37', title: 'Learning OneDrive',                                                    date: '2022-09-01', verifyUrl: 'https://www.linkedin.com/learning/learning-onedrive-2021'},
  {id: 'cert-38', title: 'Learning LinkedIn',                                                    date: '2022-09-01', verifyUrl: 'https://www.linkedin.com/learning/learning-linkedin-2022/get-started-with-linkedin'},
  {id: 'cert-39', title: 'PowerPoint: Eight Easy Ways to Make Your Presentation Stand Out',      date: '2022-09-01', verifyUrl: 'https://www.linkedin.com/learning/powerpoint-eight-easy-ways-to-make-your-presentation-stand-out'},
  {id: 'cert-40', title: 'Excel: VLOOKUP and XLOOKUP for Beginners',                             date: '2022-09-01', verifyUrl: 'https://www.linkedin.com/learning/excel-vlookup-and-xlookup-for-beginners-11690751'},
  {id: 'cert-41', title: 'Introduction to Video Editing',                                        date: '2022-09-01', verifyUrl: 'https://www.linkedin.com/learning/introduction-to-video-editing'},
  // Springpod
  {id: 'cert-42', title: '"Inclusive Futures: Technology" Insight Event', date: '2022-12-01', verifyUrl: 'https://www.springpod.com/'},
]

registerSeeder({
  name: 'certificates',
  async up(client: SanityClient) {
    for (const cert of certs) {
      // createIfNotExists so the existing image-asset reference (uploaded by
      // images.seeder) is preserved on re-runs.
      await client.createIfNotExists({
        _id: cert.id,
        _type: 'certificate',
        title: cert.title,
      })
      await client.patch(cert.id).set({
        title: cert.title,
        date: cert.date,
        ...(cert.verifyUrl ? {verifyUrl: cert.verifyUrl} : {}),
      }).commit()
    }
    console.log(`     Seeded ${certs.length} certificates`)
  },
  async down(client: SanityClient) {
    await client.delete({query: '*[_type == "certificate"]'})
  },
})

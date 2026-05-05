import {registerSeeder, uploadImage, imageRef} from './helpers.js'
import {readFileSync} from 'fs'
import {resolve} from 'path'
import type {SanityClient} from '@sanity/client'

// Projects: thumbnail field
const projectImages: [string, string][] = [
  ['project-4miles',                 'assets/projects/4Miles.png'],
  ['project-actyble',                'assets/projects/Actyble.png'],
  ['project-al-khorezmi',            'assets/projects/Al Khorezmi Community Centre Website.png'],
  ['project-allmaths',               'assets/projects/AllMaths.png'],
  ['project-codemaster',             'assets/projects/CodeMaster.jpeg'],
  ['project-joybormi',               'assets/projects/JoyBormi.jpeg'],
  ['project-kinaie-ecom',            'assets/projects/Kinaie Ecom Landing Page.png'],
  ['project-kinaie-growth',          'assets/projects/Kinaie Growth Landing Page.png'],
  ['project-locus',                  'assets/projects/Locus.jpeg'],
  ['project-shirina',                'assets/projects/Shirina.png'],
  ['project-smart-resume-matcher',   'assets/projects/Smart Resume Matcher.png'],
  ['project-soffin',                 'assets/projects/Soffin.png'],
  ['project-subject-test-platform',  'assets/projects/Subject Test Platform.jpeg'],
  ['project-tech2',                  'assets/projects/Tech2.jpeg'],
]

// Blog articles: thumbnail field (series 0 = part01–10, ordered newest→oldest in seeder)
const blogImages: [string, string][] = [
  ['blog-article-0-0', 'assets/blog/part10.png'],
  ['blog-article-0-1', 'assets/blog/part09.png'],
  ['blog-article-0-2', 'assets/blog/part08.png'],
  ['blog-article-0-3', 'assets/blog/part07.png'],
  ['blog-article-0-4', 'assets/blog/part06.png'],
  ['blog-article-0-5', 'assets/blog/part05.png'],
  ['blog-article-0-6', 'assets/blog/part04.png'],
  ['blog-article-0-7', 'assets/blog/part03.png'],
  ['blog-article-0-8', 'assets/blog/part02.png'],
  ['blog-article-0-9', 'assets/blog/part01.png'],
  ['blog-article-1-0', 'assets/blog/life-in-canada.png'],
  ['blog-article-1-1', 'assets/blog/preparing-canada.png'],
  ['blog-article-1-2', 'assets/blog/canadian-visa.png'],
  ['blog-article-1-3', 'assets/blog/applied-canada.png'],
  ['blog-article-2-0', 'assets/blog/hackathon.png'],
  ['blog-article-2-1', 'assets/blog/linkedin-guide.png'],
  ['blog-article-2-2', 'assets/blog/coding-journey.png'],
  ['blog-article-3-0', 'assets/blog/accommodation.png'],
  ['blog-article-3-1', 'assets/blog/academic-year.jpeg'],
  ['blog-article-3-2', 'assets/blog/first-year.jpg'],
  ['blog-article-3-3', 'assets/blog/post-arrival.png'],
  ['blog-article-3-4', 'assets/blog/visa-tips.png'],
  ['blog-article-3-5', 'assets/blog/international-student.png'],
]

// Travel destinations: thumbnail field
const travelImages: [string, string][] = [
  ['travel-belgium',      'assets/travel/belgium.png'],
  ['travel-canada',       'assets/travel/canada.png'],
  ['travel-france',       'assets/travel/france.png'],
  ['travel-hungary',      'assets/travel/hungary.png'],
  ['travel-netherlands',  'assets/travel/netherlands.png'],
  ['travel-spain',        'assets/travel/spain.png'],
  ['travel-switzerland',  'assets/travel/switzerland.png'],
  ['travel-travel-tips',  'assets/travel/travel tips.png'],
  ['travel-turkey',       'assets/travel/turkey.png'],
  ['travel-uk',           'assets/travel/uk.png'],
  ['travel-uzbekistan',   'assets/travel/uzbekistan.png'],
]

// Journey updates: thumbnail field (Month_N maps to chronological order from Oct 2023)
const journeyImages: [string, string][] = [
  ['journey-2023-10', 'assets/journey/Month_1_-_October_2023__Month_of_Growth.png'],
  ['journey-2023-11', 'assets/journey/Month_2_-_November_2023__Progression.png'],
  ['journey-2023-12', 'assets/journey/Month_3_-_December_2023__Community.png'],
  ['journey-2024-01', 'assets/journey/Month_4_-_January_2024__Creativity.png'],
  ['journey-2024-02', 'assets/journey/Month_5_-_February_2024__Learning.png'],
  ['journey-2024-03', 'assets/journey/Month_6_-_March_2024__Connections.png'],
  ['journey-2024-04', 'assets/journey/Month_7_-_April_2024__Adventures.png'],
  ['journey-2024-05', 'assets/journey/Month_8_-_May_2024__Innovation.png'],
  ['journey-2024-06', 'assets/journey/Month_9_-_June_2024__Perseverance.png'],
  ['journey-2024-07', 'assets/journey/Month_10_-_July_2024__Preparation.png'],
  ['journey-2024-08', 'assets/journey/Month_11_-_August_2024__Initiatives.png'],
  ['journey-2024-09', 'assets/journey/Month_12_-_September_2024__Reunion.png'],
  ['journey-2024-10', 'assets/journey/Month_13_-_October_2024__Exploration.png'],
  ['journey-2024-11', 'assets/journey/Month_14_-_November_2024__Advancement.png'],
  ['journey-2024-12', 'assets/journey/Month_15_-_December_2024__Development.png'],
  ['journey-2025-01', 'assets/journey/Month_16_-_January_2025__Refinement.png'],
  ['journey-2025-02', 'assets/journey/Month_17_-_February_2025__Application.png'],
  ['journey-2025-03', 'assets/journey/Month_18_-_March_2025__Quest.png'],
  ['journey-2025-04', 'assets/journey/Month_19_-_April_2025__Completion.png'],
  ['journey-2025-05', 'assets/journey/Month_20_-_May_2025__Hustle.png'],
  ['journey-2025-06', 'assets/journey/Month_21_-_June_2025__Momentum.png'],
  ['journey-2025-07', 'assets/journey/Month_22_-_July_2025__Execution.png'],
  ['journey-2025-08', 'assets/journey/Month_23_-_August_2025__Pursuit.png'],
  ['journey-2025-09', 'assets/journey/Month_24_-_September_2025__Recharge.png'],
  ['journey-2025-10', 'assets/journey/Month_25_-_October_2025__Effort.png'],
  ['journey-2025-11', 'assets/journey/Month_26_-_November_2025__Creation.png'],
  ['journey-2025-12', 'assets/journey/Month_27_-_December_2025__Journey.png'],
  ['journey-2026-01', 'assets/journey/Month_28_-_January_2026__Resilience.png'],
  ['journey-2026-02', 'assets/journey/Month_29_-_February_2026__Interviews.png'],
  ['journey-2026-03', 'assets/journey/Month_30_-_March_2026__Networking.png'],
  ['journey-2026-04', 'assets/journey/Month_31_-_April_2026__Iteration.png'],
]

// Certificates: image field
const certImages: [string, string][] = [
  ['cert-1',  'assets/certificates/CS50 - CS50 Python.png'],
  ['cert-2',  'assets/certificates/CS50 - CS50 SQL.png'],
  ['cert-3',  'assets/certificates/Python Institute - PCAP Certificate.png'],
  ['cert-4',  'assets/certificates/Python Institute - PCEP Certificate.png'],
  ['cert-5',  'assets/certificates/HackerRank - Software Engineer Intern.png'],
  ['cert-6',  'assets/certificates/HackerRank - SQL Intermediate.png'],
  ['cert-7',  'assets/certificates/HackerRank - SQL Basic.png'],
  ['cert-8',  'assets/certificates/HackerRank - Python Basic.png'],
  ['cert-9',  'assets/certificates/HackerRank - CSS.png'],
  ['cert-10', 'assets/certificates/Hacknovation 2024 - 4th Place Finisher.jpeg'],
  ['cert-11', 'assets/certificates/Bright Network IEUK 2023 - Technology Participant.png'],
  ['cert-12', 'assets/certificates/Gold Go Herts Award Achiever.jpeg'],
  ['cert-13', 'assets/certificates/High Achiever 21:22 Academic Year.jpeg'],
  ['cert-14', 'assets/certificates/UniHack 2022 Tech Winner.png'],
  ['cert-15', 'assets/certificates/Code for Good Hackathon Participant.jpeg'],
  ['cert-16', 'assets/certificates/Meta Global Hackathon 2022 - Top 400 Finisher.jpeg'],
  ['cert-17', 'assets/certificates/Coursera - Version Control.png'],
  ['cert-18', 'assets/certificates/Coursera - Programming with JavaScript.png'],
  ['cert-19', 'assets/certificates/Coursera - Introduction to Fron-End Development.png'],
  ['cert-20', 'assets/certificates/Coursera - Learning How to Learn.png'],
  ['cert-21', 'assets/certificates/FreeCodeCamp - Responsive Web Design.png'],
  ['cert-22', 'assets/certificates/Forage - JPMorganChase Software Engineering Virtual Experience.png'],
  ['cert-23', 'assets/certificates/Forage - Accenture Developer Virtual Experience Program.png'],
  ['cert-24', 'assets/certificates/Forage - Accenture Developer and Technology Virtual Experience Program.png'],
  ['cert-25', 'assets/certificates/Forage - Align Technology Software Engineering Virtual Experience Program.png'],
  ['cert-26', 'assets/certificates/Forage - JPMorganChase Agile Virtual Experience Program.png'],
  ['cert-27', 'assets/certificates/LinkedIn - How to Have a Great Day at Work With Caroline Webb.png'],
  ['cert-28', 'assets/certificates/LinkedIn - Programming Foundations - Fundamentals.png'],
  ['cert-29', 'assets/certificates/LinkedIn - Learning Python.png'],
  ['cert-30', 'assets/certificates/LinkedIn - Introduction to Web Design and Development.png'],
  ['cert-31', 'assets/certificates/LinkedIn - Microsoft Cloud Fundamentals - SharePoint Online, OneDrive, and Teams.png'],
  ['cert-32', 'assets/certificates/LinkedIn - Digital Accessibility for the Modern Workplace.png'],
  ['cert-33', 'assets/certificates/LinkedIn - Zoom Essential Training.png'],
  ['cert-34', 'assets/certificates/LinkedIn - Microsoft Teams Tips and Tricks.png'],
  ['cert-35', 'assets/certificates/LinkedIn - Microsoft Planner Essential Training.png'],
  ['cert-36', 'assets/certificates/LinkedIn - SharePoint Online - Managing Documents.png'],
  ['cert-37', 'assets/certificates/LinkedIn - Learning OneDrive.png'],
  ['cert-38', 'assets/certificates/LinkedIn - Learning LinkedIn.png'],
  ['cert-39', 'assets/certificates/LinkedIn - PowerPoint - Eight Easy Ways to Make Your Presentation Stand Out.png'],
  ['cert-40', 'assets/certificates/LinkedIn - Excel - VLOOKUP and XLOOKUP for Beginners.png'],
  ['cert-41', 'assets/certificates/LinkedIn - Introduction to Video Editing.png'],
  ['cert-42', 'assets/certificates/Springpod - Inclusive Futures - Technology Insight Event.png'],
]

registerSeeder({
  name: 'images',
  async up(client: SanityClient) {
    // Profile image → homePage + aboutPage
    const profileId = await upload('assets/profile.jpeg')
    await client.patch('homePage').set({profileImage: imageRef(profileId)}).commit()
    await client.patch('aboutPage').set({profileImage: imageRef(profileId)}).commit()
    console.log('     Uploaded profile image')

    // Resume PDF → homePage
    const resumePath = resolve(__dirname, 'assets', 'assets', 'Sam_Abdullaev_Resume.pdf')
    const resumeBuffer = readFileSync(resumePath)
    const resumeAsset = await client.assets.upload('file', resumeBuffer, {
      filename: 'Sam_Abdullaev_Resume.pdf',
      contentType: 'application/pdf',
    })
    await client.patch('homePage').set({resumeFile: {_type: 'file', asset: {_type: 'reference', _ref: resumeAsset._id}}}).commit()
    console.log('     Uploaded resume PDF')

    const delay = (ms = 200) => new Promise(r => setTimeout(r, ms))
    async function upload(path: string): Promise<string> {
      for (let attempt = 1; attempt <= 5; attempt++) {
        try { return await uploadImage(client, path) } catch (e: any) {
          if (attempt === 5) throw e
          console.log(`     Retry ${attempt} for ${path.split('/').pop()} (${e.statusCode ?? e.message})`)
          await delay(attempt * 1000)
        }
      }
      throw new Error('unreachable')
    }

    // Projects
    for (const [id, path] of projectImages) {
      const assetId = await upload(path)
      await client.patch(id).set({thumbnail: imageRef(assetId)}).commit()
      // Populate image-type gallery items with the same thumbnail
      const doc = await client.getDocument(id) as any
      if (doc?.gallery?.length) {
        const updatedGallery = doc.gallery.map((item: any) =>
          item.type === 'image' ? { ...item, image: imageRef(assetId) } : item
        )
        await client.patch(id).set({ gallery: updatedGallery }).commit()
      }
      await delay()
    }
    console.log(`     Uploaded ${projectImages.length} project thumbnails`)

    // Blog articles
    for (const [id, path] of blogImages) {
      const assetId = await upload(path)
      await client.patch(id).set({thumbnail: imageRef(assetId)}).commit()
      await delay()
    }
    console.log(`     Uploaded ${blogImages.length} blog article thumbnails`)

    // Travel destinations
    for (const [id, path] of travelImages) {
      const assetId = await upload(path)
      await client.patch(id).set({thumbnail: imageRef(assetId)}).commit()
      await delay()
    }
    console.log(`     Uploaded ${travelImages.length} travel thumbnails`)

    // Journey updates
    for (const [id, path] of journeyImages) {
      const assetId = await upload(path)
      await client.patch(id).set({thumbnail: imageRef(assetId)}).commit()
      await delay()
    }
    console.log(`     Uploaded ${journeyImages.length} journey thumbnails`)

    // Certificates
    for (const [id, path] of certImages) {
      const assetId = await upload(path)
      await client.patch(id).set({image: imageRef(assetId)}).commit()
      await delay()
    }
    console.log(`     Uploaded ${certImages.length} certificate images`)

    // Mentorship
    const mentorshipId = await upload('assets/mentorship/Publink - Article 1 Cover Image.jpg')
    await client.patch('mentorship-1').set({thumbnail: imageRef(mentorshipId)}).commit()
    console.log('     Uploaded mentorship thumbnail')
  },
  async down(client: SanityClient) {
    const allIds = [
      'homePage', 'aboutPage',
      ...projectImages.map(([id]) => id),
      ...blogImages.map(([id]) => id),
      ...travelImages.map(([id]) => id),
      ...journeyImages.map(([id]) => id),
      ...certImages.map(([id]) => id),
      'mentorship-1',
    ]
    for (const id of allIds) {
      const fields = id === 'homePage' ? ['profileImage', 'resumeFile']
        : id === 'aboutPage' ? ['profileImage']
        : certImages.some(([cid]) => cid === id) ? ['image']
        : ['thumbnail']
      await client.patch(id).unset(fields).commit()
    }
    // Clear gallery images for projects
    for (const [id] of projectImages) {
      const doc = await client.getDocument(id) as any
      if (doc?.gallery?.length) {
        const updatedGallery = doc.gallery.map((item: any) => {
          const {image, ...rest} = item
          return rest
        })
        await client.patch(id).set({ gallery: updatedGallery }).commit()
      }
    }
  },
})

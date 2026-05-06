import {registerSeeder} from './helpers.js'
import type {SanityClient} from '@sanity/client'

// Each entry's `date` is the publish date (1st of the month AFTER the recap
// month, since the user publishes the monthly retrospective once the month
// ends). Sort newest-first by date in Studio + on the website.
const entries: {title: string; url: string; date: string}[] = [
  {title: "April 2026: Iteration",       url: "https://www.linkedin.com/pulse/april-2026-iteration-sam-abdullaev-xjcre",         date: "2026-05-01"},
  {title: "March 2026: Networking",      url: "https://www.linkedin.com/pulse/march-2026-networking-sam-abdullaev-6djfe",        date: "2026-04-01"},
  {title: "February 2026: Interviews",   url: "https://www.linkedin.com/pulse/february-2026-interviews-sam-abdullaev-lqr5e",     date: "2026-03-01"},
  {title: "January 2026: Resilience",    url: "https://www.linkedin.com/pulse/january-2026-resilience-sam-abdullaev-8dsae",      date: "2026-02-01"},
  {title: "December 2025: Journey",      url: "https://www.linkedin.com/pulse/december-2025-journey-sam-abdullaev-eg1je",        date: "2026-01-01"},
  {title: "November 2025: Creation",     url: "https://www.linkedin.com/pulse/november-2025-creation-sam-abdullaev-umjie",       date: "2025-12-01"},
  {title: "October 2025: Effort",        url: "https://www.linkedin.com/pulse/october-2025-effort-sam-abdullaev-8wtne",          date: "2025-11-01"},
  {title: "September 2025: Recharge",    url: "https://www.linkedin.com/pulse/september-2025-recharge-sam-abdullaev-xzh1e",      date: "2025-10-01"},
  {title: "August 2025: Pursuit",        url: "https://www.linkedin.com/pulse/august-2025-pursuit-sam-abdullaev-2lrfe",          date: "2025-09-01"},
  {title: "July 2025: Execution",        url: "https://www.linkedin.com/posts/samabdullaev_month-22-heres-my-progress-in-july-toward-activity-7357077680900427777-obbo", date: "2025-08-01"},
  {title: "June 2025: Momentum",         url: "https://www.linkedin.com/pulse/june-2025momentum-sam-abdullaev-kekme",            date: "2025-07-01"},
  {title: "May 2025: Hustle",            url: "https://www.linkedin.com/pulse/may-2025-hustle-sam-abdullaev-qdoze",              date: "2025-06-01"},
  {title: "April 2025: Completion",      url: "https://www.linkedin.com/pulse/april-2025completion-sam-abdullaev-jymge",         date: "2025-05-01"},
  {title: "March 2025: Quest",           url: "https://www.linkedin.com/pulse/march-2025quest-sam-abdullaev-okive",              date: "2025-04-01"},
  {title: "February 2025: Application",  url: "https://www.linkedin.com/pulse/february-2025-application-sam-abdullaev-jzftf",    date: "2025-03-01"},
  {title: "January 2025: Refinement",    url: "https://www.linkedin.com/pulse/january-2025-refinement-sam-abdullaev-j4ede",      date: "2025-02-01"},
  {title: "December 2024: Development",  url: "https://www.linkedin.com/pulse/december-2024-development-sam-abdullaev-9htse",    date: "2025-01-01"},
  {title: "November 2024: Advancement",  url: "https://www.linkedin.com/pulse/november-2024-advancement-sam-abdullaev-hwise",    date: "2024-12-01"},
  {title: "October 2024: Exploration",   url: "https://www.linkedin.com/pulse/october-2024-exploration-sam-abdullaev-smx7e",     date: "2024-11-01"},
  {title: "September 2024: Reunion",     url: "https://www.linkedin.com/pulse/september-2024reunion-sam-abdullaev-op2ue",        date: "2024-10-01"},
  {title: "August 2024: Initiatives",    url: "https://www.linkedin.com/pulse/august-2024-initiatives-sam-abdullaev-yp4ee",      date: "2024-09-01"},
  {title: "July 2024: Preparation",      url: "https://www.linkedin.com/pulse/july-2024-preparation-sam-abdullaev-bxmse",        date: "2024-08-01"},
  {title: "June 2024: Perseverance",     url: "https://www.linkedin.com/pulse/june-2024-perseverance-sam-abdullaev-qaxve",       date: "2024-07-01"},
  {title: "May 2024: Innovation",        url: "https://www.linkedin.com/pulse/may-2024-innovation-sam-abdullaev-h0kee",          date: "2024-06-01"},
  {title: "April 2024: Adventures",      url: "https://www.linkedin.com/pulse/april-2024-adventures-sam-abdullaev-nmjne",        date: "2024-05-01"},
  {title: "March 2024: Connections",     url: "https://www.linkedin.com/pulse/march-2024-connections-sam-abdullaev-t1zpe",       date: "2024-04-01"},
  {title: "February 2024: Learning",     url: "https://www.linkedin.com/pulse/february-learning-sam-abdullaev-hkn9f",            date: "2024-03-01"},
  {title: "January 2024: Creativity",    url: "https://www.linkedin.com/pulse/january-2024-creativity-sam-abdullaev-w2y9e",      date: "2024-02-01"},
  {title: "December 2023: Community",    url: "https://www.linkedin.com/pulse/december-2023-community-sam-abdullaev-2pzge",      date: "2024-01-01"},
  {title: "November 2023: Progression",  url: "https://www.linkedin.com/pulse/november-2023-progression-samandar-abdullaev-780te", date: "2023-12-01"},
  {title: "October 2023: Growth",        url: "https://www.linkedin.com/pulse/october-2023-month-growth-samandar-abdullaev-ettae", date: "2023-11-01"},
]

// Doc IDs are derived from the recap month (one before publish), keeping
// stability with images.seeder.ts which references journey-YYYY-MM.
function recapMonthFromPublish(publishDate: string): {y: number; m: number} {
  const [yStr, mStr] = publishDate.split('-')
  let m = parseInt(mStr, 10) - 1
  let y = parseInt(yStr, 10)
  if (m === 0) {
    m = 12
    y -= 1
  }
  return {y, m}
}

registerSeeder({
  name: 'journey',
  async up(client: SanityClient) {
    for (const e of entries) {
      const {y, m} = recapMonthFromPublish(e.date)
      await client.createOrReplace({
        _id: `journey-${y}-${String(m).padStart(2, '0')}`,
        _type: 'journeyUpdate',
        title: e.title,
        date: e.date,
        linkedInUrl: e.url,
      })
    }
    console.log(`     Created ${entries.length} journey entries`)
  },
  async down(client: SanityClient) {
    await client.delete({query: '*[_type == "journeyUpdate"]'})
  },
})

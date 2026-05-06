import {registerSeeder, key} from './helpers.js'
import type {SanityClient} from '@sanity/client'

// Each series has its own ordered articles[] array — the article's "Part N"
// label on the website is computed from its index in this array (1-based),
// not from a field on the article. Drag-reorder in Studio to renumber
// automatically.
//
// Articles are listed OLDEST → NEWEST within each series so Part 1 is the
// foundational article (chronologically first) and Part N is the latest.
// The Studio "All Blog Articles" flat list still sorts date desc — only
// inside-a-series ordering is ascending.
//
// orderRank values for blogSeries are zero-padded strings; the orderable
// plugin sorts them lexicographically and inserts new ranks between adjacent
// strings as the user drags series.
//
// Dates are ISO YYYY-MM-DD; display layer formats them via formatLongDate()
// to "Aug 11, 2025" on the website.
const seriesData = [
  {
    title: "Concept to Launch: Build SvelteKit & Sanity Website",
    slug: "concept-to-launch-sveltekit-sanity",
    orderRank: '0001',
    articles: [
      {title: "How I Planned the Project and Picked the Stack", date: "2025-08-02", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-1eeb10ef2ded"},
      {title: "How I Turned a Template into a Prototype", date: "2025-08-03", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-2bc1fe9b3540"},
      {title: "How I Set Up the Repo and Development Environment", date: "2025-08-04", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-6f2369c50234"},
      {title: "How I Built Reusable Components for a Modular UI", date: "2025-08-05", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-8462179a07d7"},
      {title: "How I Used Props to Make Components Dynamic", date: "2025-08-06", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-3a74d03b10ef"},
      {title: "How I Integrated Sanity and Structured the CMS", date: "2025-08-07", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-c5f8dfb35369"},
      {title: "How I Integrated Telegram for Instant Alerts", date: "2025-08-08", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-96e6848a6ad8"},
      {title: "How I Deployed the Website and Configured the Domain", date: "2025-08-09", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-fe6f345c33e7"},
      {title: "How I Tested and Delivered the Project to the Client", date: "2025-08-10", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-51a6b18d1c62"},
      {title: "How I Improved My Skills and Workflow in One Project", date: "2025-08-11", url: "https://samabdullaev.medium.com/build-a-sanity-cms-powered-sveltekit-website-e0f7460a79a0"},
    ],
  },
  {
    title: "My Study Abroad Journey from UK to Canada",
    slug: "study-abroad-uk-to-canada",
    orderRank: '0002',
    articles: [
      {title: "How I Applied to Study in Canada", date: "2024-07-23", url: "https://samabdullaev.medium.com/how-i-applied-to-study-in-canada-3db47c5e2afc"},
      {title: "How I Got My Canadian Visa", date: "2025-02-09", url: "https://samabdullaev.medium.com/how-i-got-my-canadian-visa-644e3c828937"},
      {title: "Preparing for Student Life in Canada", date: "2025-02-27", url: "https://samabdullaev.medium.com/preparing-for-student-life-in-canada-c12b770c55cf"},
      {title: "Life in Canada", date: "2025-04-20", url: "https://samabdullaev.medium.com/life-in-canada-df91389dd0bc"},
    ],
  },
  {
    title: "Professional Development Guide",
    slug: "professional-development-guide",
    orderRank: '0003',
    articles: [
      {title: "My Coding Journey: Online Learning Platforms That I Use", date: "2023-11-20", url: "https://samabdullaev.medium.com/my-coding-journey-online-learning-platforms-that-i-use-f6c15501a94"},
      {title: "Your Ultimate LinkedIn Guide", date: "2024-03-01", url: "https://samabdullaev.medium.com/your-ultimate-linkedin-guide-09c8167ce528"},
      {title: "My Hackathon Journey: Lessons Learned", date: "2024-03-04", url: "https://samabdullaev.medium.com/my-hackathon-journey-lessons-learned-8501b5a362ce"},
    ],
  },
  {
    title: "Studying in the UK: A Comprehensive Guide",
    slug: "studying-in-the-uk",
    orderRank: '0004',
    articles: [
      {title: "Guide to Become an International Student in the UK", date: "2023-02-08", url: "https://samabdullaev.medium.com/guide-to-become-an-international-student-in-the-uk-b903ec53a790"},
      {title: "UK VISA Application Procedure and Pre-Arrival Tips", date: "2023-10-20", url: "https://samabdullaev.medium.com/uk-visa-application-procedure-and-pre-arrival-tips-6de31ddc1219"},
      {title: "UK Post-Arrival Essentials and Tips", date: "2023-10-23", url: "https://samabdullaev.medium.com/uk-post-arrival-essentials-and-tips-11e1e9c6854c"},
      {title: "My First Year Abroad in the UK", date: "2023-10-27", url: "https://samabdullaev.medium.com/my-first-year-abroad-in-the-uk-15dc475748f1"},
      {title: "My First Academic Year in the UK", date: "2023-12-08", url: "https://samabdullaev.medium.com/my-first-academic-year-in-the-uk-3ff026beb3e6"},
      {title: "My UK Student Accommodation Journey", date: "2024-01-28", url: "https://samabdullaev.medium.com/my-uk-student-accommodation-journey-8a8817a9a49f"},
    ],
  },
]

registerSeeder({
  name: 'blog',
  async up(client: SanityClient) {
    for (const [si, series] of seriesData.entries()) {
      const articleIds: string[] = []
      for (const [ai, article] of series.articles.entries()) {
        const id = `blog-article-${si}-${ai}`
        await client.createOrReplace({
          _id: id,
          _type: 'blogArticle',
          title: article.title,
          date: article.date,
          externalUrl: article.url,
        })
        articleIds.push(id)
      }
      await client.createOrReplace({
        _id: `blog-series-${si}`,
        _type: 'blogSeries',
        title: series.title,
        slug: {_type: 'slug', current: series.slug},
        articles: articleIds.map(id => ({_key: key(), _type: 'reference', _ref: id})),
        orderRank: series.orderRank,
      })
      console.log(`     Created series: ${series.title} (${articleIds.length} articles)`)
    }
  },
  async down(client: SanityClient) {
    await client.delete({query: '*[_type in ["blogArticle", "blogSeries"]]'})
  },
})

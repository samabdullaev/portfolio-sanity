import {registerSeeder, key, uploadImage, imageRef} from './helpers.js'
import type {SanityClient} from '@sanity/client'

interface BaseSpec {
  id: string
  slug: string
  title: string
  subtitle: string
  thumbnail: string
}

interface ExternalSpec extends BaseSpec {
  kind: 'resource'
  externalUrl: string
}

interface CategorySpec extends BaseSpec {
  kind: 'resourceCategory'
  // Drag-orderable in Studio via @sanity/orderable-document-list. Used by
  // the "Resource Categories" desk list. The website renders by
  // topic.items[] order.
  orderRank: string
}

type Spec = ExternalSpec | CategorySpec

// 23 external resources + 11 categories with detail pages.
const specs: Spec[] = [
  // Tools
  {kind: 'resource', id: 'resource-postspark',     slug: 'postspark',     title: 'PostSpark',     subtitle: 'Image Summarization',          thumbnail: 'assets/resources/PostSpark.jpg',     externalUrl: 'https://postspark.app/'},
  {kind: 'resource', id: 'resource-screen-studio', slug: 'screen-studio', title: 'Screen Studio', subtitle: 'Screen Recorder',              thumbnail: 'assets/resources/Screen Studio.jpg', externalUrl: 'https://screen.studio/'},
  {kind: 'resource', id: 'resource-howdygo',       slug: 'howdygo',       title: 'HowdyGo',       subtitle: 'Scrolling Website Generator',  thumbnail: 'assets/resources/HowdyGo.jpg',       externalUrl: 'https://www.howdygo.com/free-tools/scrolling-website-video-generator'},
  {kind: 'resource', id: 'resource-whimsical',     slug: 'whimsical',     title: 'Whimsical',     subtitle: 'Collaborative whiteboard app', thumbnail: 'assets/resources/Whimsical.jpg',     externalUrl: 'https://whimsical.com/'},

  // Apps
  {kind: 'resource', id: 'resource-quran-com',   slug: 'quran-com',   title: 'Quran.com',   subtitle: 'Quran Recitation',       thumbnail: 'assets/resources/Quran.com.jpg',   externalUrl: 'https://quran.com/'},
  {kind: 'resource', id: 'resource-cleve-ai',    slug: 'cleve-ai',    title: 'Cleve.ai',    subtitle: 'LinkedIn Summarization', thumbnail: 'assets/resources/Cleve.ai.png',    externalUrl: 'http://cleve.ai/'},
  {kind: 'resource', id: 'resource-git-wrapped', slug: 'git-wrapped', title: 'Git-Wrapped', subtitle: 'GitHub Summarization',   thumbnail: 'assets/resources/Git-Wrapped.jpg', externalUrl: 'https://git-wrapped.com/'},
  {kind: 'resource', id: 'resource-ticktick',    slug: 'ticktick',    title: 'TickTick',    subtitle: 'To-do app',              thumbnail: 'assets/resources/TickTick.jpg',    externalUrl: 'https://ticktick.com/'},
  {kind: 'resource', id: 'resource-carbon',      slug: 'carbon',      title: 'Carbon',      subtitle: 'Code Image',             thumbnail: 'assets/resources/Carbon.png',      externalUrl: 'https://carbon.now.sh/'},

  // SaaS
  {kind: 'resource', id: 'resource-featurebase', slug: 'featurebase', title: 'Featurebase', subtitle: 'Changelog & Roadmap', thumbnail: 'assets/resources/Featurebase.jpg', externalUrl: 'https://www.featurebase.app/'},
  {kind: 'resource', id: 'resource-mintlify',    slug: 'mintlify',    title: 'Mintlify',    subtitle: 'Documentation',       thumbnail: 'assets/resources/Mintlify.jpg',    externalUrl: 'https://mintlify.com/'},

  // UI Libraries
  {kind: 'resource', id: 'resource-shadcn',     slug: 'shadcn',     title: 'Shadcn',     subtitle: 'UI component library', thumbnail: 'assets/resources/Shadcn.jpg',    externalUrl: 'https://ui.shadcn.com/'},
  {kind: 'resource', id: 'resource-magic-ui',   slug: 'magic-ui',   title: 'Magic UI',   subtitle: 'UI component library', thumbnail: 'assets/resources/Magic UI.jpg',  externalUrl: 'https://magicui.design/'},
  {kind: 'resource', id: 'resource-aceternity', slug: 'aceternity', title: 'Aceternity', subtitle: 'UI component library', thumbnail: 'assets/resources/Aceternity.jpg', externalUrl: 'https://ui.aceternity.com/'},
  {kind: 'resource', id: 'resource-21st-dev',   slug: '21st-dev',   title: '21st.dev',   subtitle: 'UI component library', thumbnail: 'assets/resources/21st.dev.jpg',  externalUrl: 'https://21st.dev/'},
  {kind: 'resource', id: 'resource-ui-verse',   slug: 'ui-verse',   title: 'UI verse',   subtitle: 'UI component library', thumbnail: 'assets/resources/UI verse.jpg',  externalUrl: 'https://uiverse.io/'},
  {kind: 'resource', id: 'resource-reactbits',  slug: 'reactbits',  title: 'ReactBits',  subtitle: 'Animations',           thumbnail: 'assets/resources/ReactBits.jpg', externalUrl: 'https://reactbits.dev/'},
  {kind: 'resource', id: 'resource-spline',     slug: 'spline',     title: 'Spline',     subtitle: 'Animations',           thumbnail: 'assets/resources/Spline.jpg',    externalUrl: 'https://spline.design/'},

  // Dev Platforms
  {kind: 'resource', id: 'resource-v0',      slug: 'v0',      title: 'v0',      subtitle: 'AI-powered UI generation', thumbnail: 'assets/resources/v0.jpg',      externalUrl: 'https://v0.dev/'},
  {kind: 'resource', id: 'resource-bolt',    slug: 'bolt',    title: 'Bolt',    subtitle: 'AI-powered development',   thumbnail: 'assets/resources/Bolt.jpg',    externalUrl: 'https://bolt.new/'},
  {kind: 'resource', id: 'resource-lovable', slug: 'lovable', title: 'Lovable', subtitle: 'AI-powered development',   thumbnail: 'assets/resources/Lovable.jpg', externalUrl: 'https://lovable.dev/'},

  // No-code Tools
  {kind: 'resource', id: 'resource-framer', slug: 'framer', title: 'Framer', subtitle: 'No-code website builder', thumbnail: 'assets/resources/Framer.jpg', externalUrl: 'https://www.framer.com/'},
  {kind: 'resource', id: 'resource-canva',  slug: 'canva',  title: 'Canva',  subtitle: 'AI Code Generator',       thumbnail: 'assets/resources/Canva.jpg',  externalUrl: 'https://www.canva.com/ai-code-generator/'},

  // Categories with detail pages (Playbooks)
  {kind: 'resourceCategory', id: 'resource-interview-prep',     slug: 'interview-prep',     title: 'Interview Prep',     subtitle: 'NeetCode, GreatFrontEnd, Algochurn, and more',     thumbnail: 'assets/resources/Interview Prep.jpg',     orderRank: '0001'},
  {kind: 'resourceCategory', id: 'resource-system-design',      slug: 'system-design',      title: 'System Design',      subtitle: 'System Design School, Primer, NeetCodeIO',         thumbnail: 'assets/resources/System Design.jpg',      orderRank: '0002'},
  {kind: 'resourceCategory', id: 'resource-career-toolkit',     slug: 'career-toolkit',     title: 'Career Toolkit',     subtitle: 'Interview Warmup, NotebookLM, Cloud Skills Boost', thumbnail: 'assets/resources/Career Toolkit.jpg',     orderRank: '0003'},
  {kind: 'resourceCategory', id: 'resource-video-learning',     slug: 'video-learning',     title: 'Video Learning',     subtitle: 'YouTube, Coursera, Udemy, Scrimba, and more',      thumbnail: 'assets/resources/Video Learning.jpg',     orderRank: '0004'},
  {kind: 'resourceCategory', id: 'resource-programming-guides', slug: 'programming-guides', title: 'Programming Guides', subtitle: 'FreeCodeCamp, W3Schools, GeeksforGeeks, and more', thumbnail: 'assets/resources/Programming Guides.jpg', orderRank: '0005'},
  {kind: 'resourceCategory', id: 'resource-problem-solving',    slug: 'problem-solving',    title: 'Problem Solving',    subtitle: 'LeetCode, HackerRank, Codewars, CodingBat',        thumbnail: 'assets/resources/Problem Solving.jpg',    orderRank: '0006'},
  {kind: 'resourceCategory', id: 'resource-github',             slug: 'github',             title: 'GitHub',             subtitle: 'Awesome Shadcn UI, Maker Skill Trees',             thumbnail: 'assets/resources/GitHub.jpg',             orderRank: '0007'},

  // Categories with detail pages (Personal)
  {kind: 'resourceCategory', id: 'resource-telegram-channels', slug: 'telegram-channels', title: 'Telegram Channels', subtitle: '16 tech and programming channels I follow',             thumbnail: 'assets/resources/Telegram Channels.png', orderRank: '0008'},
  {kind: 'resourceCategory', id: 'resource-newsletters',       slug: 'newsletters',       title: 'Newsletters',       subtitle: 'Engineering, career, and system design newsletters',    thumbnail: 'assets/resources/Newsletters.jpg',       orderRank: '0009'},
  {kind: 'resourceCategory', id: 'resource-portfolios-i-like', slug: 'portfolios-i-like', title: 'Portfolios I Like', subtitle: '29 developer portfolios and templates for inspiration', thumbnail: 'assets/resources/Portfolios I Like.jpg', orderRank: '0010'},
  {kind: 'resourceCategory', id: 'resource-demos-showcases',   slug: 'demos-showcases',   title: 'Demos & Showcases', subtitle: 'Tahrirchi, Pythagora 2.0, TopKadr',                     thumbnail: 'assets/resources/Demos & Showcases.jpg', orderRank: '0011'},
]

registerSeeder({
  name: 'resources',
  async up(client: SanityClient) {
    const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms))
    async function upload(path: string): Promise<string> {
      for (let attempt = 1; attempt <= 5; attempt++) {
        try {
          return await uploadImage(client, path)
        } catch (e: any) {
          if (attempt === 5) throw e
          console.log(`     Retry ${attempt} for ${path.split('/').pop()} (${e.statusCode ?? e.message})`)
          await delay(attempt * 1000)
        }
      }
      throw new Error('unreachable')
    }

    // _type is immutable in Sanity; to change a doc's type we must delete + recreate.
    // Existing references (from resourceTopic docs) block deletion, so clear any topic
    // docs first. The resource-topics seeder will recreate them afterwards.
    const topicCount = await client.fetch<number>(`count(*[_type == "resourceTopic"])`)
    if (topicCount > 0) {
      await client.delete({query: `*[_type == "resourceTopic" || _id in path("drafts.topic-*")]`})
      console.log(`     Cleared ${topicCount} existing topic doc(s) to allow type migration`)
    }

    for (const s of specs) {
      const assetId = await upload(s.thumbnail)

      if (s.kind === 'resource') {
        // External resource — delete any legacy resourceCategory doc with this id, then create.
        const existing = (await client.getDocument(s.id)) as {_type?: string} | null
        if (existing && existing._type !== 'resource') {
          await client.delete(s.id)
          await client.delete(`drafts.${s.id}`).catch(() => {})
        }
        await client.createIfNotExists({
          _id: s.id,
          _type: 'resource',
          title: s.title,
          slug: {_type: 'slug', current: s.slug},
        })
        // External resources no longer have an orderRank — the website
        // orders them by the parent topic's items[] array. Unset clears
        // the field on docs migrated from the old schema.
        await client
          .patch(s.id)
          .set({
            title: s.title,
            slug: {_type: 'slug', current: s.slug},
            subtitle: s.subtitle,
            thumbnail: imageRef(assetId),
            externalUrl: s.externalUrl,
          })
          .unset(['orderRank'])
          .commit()
      } else {
        // Categories with detail pages: createIfNotExists + patch so any
        // items/sections the user has authored in Studio are preserved.
        await client.createIfNotExists({
          _id: s.id,
          _type: 'resourceCategory',
          title: s.title,
          slug: {_type: 'slug', current: s.slug},
        })

        // One-time legacy migration: the schema used to allow either a
        // single section (sectionLabel + items[]) or multi-section
        // (sections[]). Now only sections[] is allowed. Fold the legacy
        // shape into a single sections[] entry on first encounter; later
        // re-runs are no-ops (the legacy fields no longer exist on the
        // doc after the first migration).
        const existing = (await client.getDocument(s.id)) as any
        const legacyLabel: string | undefined = existing?.sectionLabel
        const legacyItems: unknown[] = Array.isArray(existing?.items) ? existing.items : []
        const hasSections =
          Array.isArray(existing?.sections) && existing.sections.length > 0
        const sectionsPatch =
          legacyLabel && legacyItems.length > 0 && !hasSections
            ? {
                sections: [
                  {
                    _key: key(),
                    label: legacyLabel,
                    items: legacyItems,
                  },
                ],
              }
            : {}

        await client
          .patch(s.id)
          .set({
            title: s.title,
            slug: {_type: 'slug', current: s.slug},
            subtitle: s.subtitle,
            thumbnail: imageRef(assetId),
            orderRank: s.orderRank,
            ...sectionsPatch,
          })
          .unset([
            'externalUrl',
            'gradientFrom',
            'gradientTo',
            'sectionLabel',
            'items',
          ])
          .commit()
      }

      console.log(`     Seeded ${s.kind}: ${s.title}`)
      await delay()
    }
  },
  async down(client: SanityClient) {
    const ids = specs.map((s) => s.id)
    const draftIds = ids.map((id) => `drafts.${id}`)
    await client.delete({query: `*[_id in ${JSON.stringify([...ids, ...draftIds])}]`})
  },
})

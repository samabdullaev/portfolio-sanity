import {registerSeeder, key, uploadImage, imageRef} from './helpers.js'
import type {SanityClient} from '@sanity/client'

interface TopicSpec {
  id: string
  title: string
  slug: string
  logo: string
  orderRank: string
  itemIds: string[] // _id values of resource / resourceCategory documents
}

// Topics reference resource / resourceCategory documents by _id. Card content
// (name, subtitle, thumbnail, link) lives on the referenced doc — single source
// of truth. Each topic has a logo used as the filter card on /resources;
// logos are AI-generated isometric icons (JPEG) downloaded from Sanity's CDN.
const topics: TopicSpec[] = [
  {
    id: 'topic-tools',
    title: 'Tools',
    slug: 'tools',
    logo: 'assets/resource-topics/tools.jpg',
    orderRank: '0001',
    itemIds: ['resource-postspark', 'resource-screen-studio', 'resource-howdygo', 'resource-whimsical'],
  },
  {
    id: 'topic-apps',
    title: 'Apps',
    slug: 'apps',
    logo: 'assets/resource-topics/apps.jpg',
    orderRank: '0002',
    itemIds: ['resource-quran-com', 'resource-cleve-ai', 'resource-git-wrapped', 'resource-ticktick', 'resource-carbon'],
  },
  {
    id: 'topic-saas',
    title: 'SaaS',
    slug: 'saas',
    logo: 'assets/resource-topics/saas.jpg',
    orderRank: '0003',
    itemIds: ['resource-featurebase', 'resource-mintlify'],
  },
  {
    id: 'topic-ui-libraries',
    title: 'UI Libraries',
    slug: 'ui-libraries',
    logo: 'assets/resource-topics/ui-libraries.jpg',
    orderRank: '0004',
    itemIds: ['resource-shadcn', 'resource-magic-ui', 'resource-aceternity', 'resource-21st-dev', 'resource-ui-verse', 'resource-reactbits', 'resource-spline'],
  },
  {
    id: 'topic-dev-platforms',
    title: 'Dev Platforms',
    slug: 'dev-platforms',
    logo: 'assets/resource-topics/dev-platforms.jpg',
    orderRank: '0005',
    itemIds: ['resource-v0', 'resource-bolt', 'resource-lovable'],
  },
  {
    id: 'topic-no-code-tools',
    title: 'No-code Tools',
    slug: 'no-code-tools',
    logo: 'assets/resource-topics/no-code-tools.jpg',
    orderRank: '0006',
    itemIds: ['resource-framer', 'resource-canva'],
  },
  {
    id: 'topic-playbooks',
    title: 'Playbooks',
    slug: 'playbooks',
    logo: 'assets/resource-topics/playbooks.jpg',
    orderRank: '0007',
    itemIds: ['resource-interview-prep', 'resource-system-design', 'resource-career-toolkit', 'resource-video-learning', 'resource-programming-guides', 'resource-problem-solving', 'resource-github'],
  },
  {
    id: 'topic-personal',
    title: 'Personal',
    slug: 'personal',
    logo: 'assets/resource-topics/personal.jpg',
    orderRank: '0008',
    itemIds: ['resource-telegram-channels', 'resource-newsletters', 'resource-portfolios-i-like', 'resource-demos-showcases'],
  },
]

registerSeeder({
  name: 'resource-topics',
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

    for (const topic of topics) {
      const logoAssetId = await upload(topic.logo)
      await client.createOrReplace({
        _id: topic.id,
        _type: 'resourceTopic',
        title: topic.title,
        slug: {_type: 'slug', current: topic.slug},
        logo: imageRef(logoAssetId),
        orderRank: topic.orderRank,
        items: topic.itemIds.map((id) => ({
          _key: key(),
          _type: 'reference',
          _ref: id,
        })),
      })
      console.log(`     Created topic: ${topic.title} (${topic.itemIds.length} items)`)
      await delay()
    }
  },
  async down(client: SanityClient) {
    const ids = topics.map((t) => t.id)
    const draftIds = ids.map((id) => `drafts.${id}`)
    await client.delete({query: `*[_id in ${JSON.stringify([...ids, ...draftIds])}]`})
  },
})

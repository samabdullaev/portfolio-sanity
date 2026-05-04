import {registerSeeder, key} from './helpers.js'
import type {SanityClient} from '@sanity/client'

interface TopicSpec {
  id: string
  title: string
  itemIds: string[] // _id values of resourceCategory documents
}

// Topics reference resourceCategory documents by _id. Card content (name, subtitle,
// thumbnail, link) lives on the resourceCategory itself — single source of truth.
const topics: TopicSpec[] = [
  {
    id: 'topic-tools',
    title: 'Tools',
    itemIds: ['resource-postspark', 'resource-screen-studio', 'resource-howdygo', 'resource-whimsical'],
  },
  {
    id: 'topic-apps',
    title: 'Apps',
    itemIds: ['resource-quran-com', 'resource-cleve-ai', 'resource-git-wrapped', 'resource-ticktick', 'resource-carbon'],
  },
  {
    id: 'topic-saas',
    title: 'SaaS',
    itemIds: ['resource-featurebase', 'resource-mintlify'],
  },
  {
    id: 'topic-ui-libraries',
    title: 'UI Libraries',
    itemIds: ['resource-shadcn', 'resource-magic-ui', 'resource-aceternity', 'resource-21st-dev', 'resource-ui-verse', 'resource-reactbits', 'resource-spline'],
  },
  {
    id: 'topic-dev-platforms',
    title: 'Dev Platforms',
    itemIds: ['resource-v0', 'resource-bolt', 'resource-lovable'],
  },
  {
    id: 'topic-no-code-tools',
    title: 'No-code Tools',
    itemIds: ['resource-framer', 'resource-canva'],
  },
  {
    id: 'topic-playbooks',
    title: 'Playbooks',
    itemIds: ['resource-interview-prep', 'resource-system-design', 'resource-career-toolkit', 'resource-video-learning', 'resource-programming-guides', 'resource-problem-solving', 'resource-github'],
  },
  {
    id: 'topic-personal',
    title: 'Personal',
    itemIds: ['resource-telegram-channels', 'resource-newsletters', 'resource-portfolios-i-like', 'resource-demos-showcases'],
  },
]

registerSeeder({
  name: 'resource-topics',
  async up(client: SanityClient) {
    for (const [i, topic] of topics.entries()) {
      await client.createOrReplace({
        _id: topic.id,
        _type: 'resourceTopic',
        title: topic.title,
        order: i + 1,
        items: topic.itemIds.map((id) => ({
          _key: key(),
          _type: 'reference',
          _ref: id,
        })),
      })
      console.log(`     Created topic: ${topic.title} (${topic.itemIds.length} items)`)
    }
  },
  async down(client: SanityClient) {
    const ids = topics.map((t) => t.id)
    const draftIds = ids.map((id) => `drafts.${id}`)
    await client.delete({query: `*[_id in ${JSON.stringify([...ids, ...draftIds])}]`})
  },
})

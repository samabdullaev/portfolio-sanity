import {registerSeeder, key, uploadImage, imageRef} from './helpers.js'
import type {SanityClient} from '@sanity/client'

interface CategorySpec {
  id: string
  title: string
  slug: string
  logo: string
  orderRank: string
  // Project _ids in display order. The website renders project cards by
  // iterating each category's projects[] in this order; categories themselves
  // sort by orderRank.
  projectIds: string[]
}

const categories: CategorySpec[] = [
  {
    id: 'project-category-personal',
    title: 'Personal',
    slug: 'personal',
    logo: 'assets/project-categories/personal.jpg',
    orderRank: '0001',
    projectIds: [
      'project-codemaster',
      'project-subject-test-platform',
      'project-smart-resume-matcher',
      'project-allmaths',
    ],
  },
  {
    id: 'project-category-freelance',
    title: 'Freelance',
    slug: 'freelance',
    logo: 'assets/project-categories/freelance.jpg',
    orderRank: '0002',
    projectIds: [
      'project-al-khorezmi',
      'project-shirina',
      'project-actyble',
      'project-soffin',
      'project-4miles',
      'project-kinaie-ecom',
      'project-kinaie-growth',
    ],
  },
  {
    id: 'project-category-hackathon',
    title: 'Hackathon',
    slug: 'hackathon',
    logo: 'assets/project-categories/hackathon.jpg',
    orderRank: '0003',
    projectIds: ['project-joybormi', 'project-tech2', 'project-locus'],
  },
]

registerSeeder({
  name: 'project-categories',
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

    for (const c of categories) {
      const logoAssetId = await upload(c.logo)
      await client.createOrReplace({
        _id: c.id,
        _type: 'projectCategory',
        title: c.title,
        slug: {_type: 'slug', current: c.slug},
        logo: imageRef(logoAssetId),
        orderRank: c.orderRank,
        projects: c.projectIds.map((pid) => ({
          _key: key(),
          _type: 'reference',
          _ref: pid,
        })),
      })
      console.log(`     Created projectCategory: ${c.title} (${c.projectIds.length} projects)`)
      await delay()
    }
  },
  async down(client: SanityClient) {
    const ids = categories.map((c) => c.id)
    const draftIds = ids.map((id) => `drafts.${id}`)
    await client.delete({query: `*[_id in ${JSON.stringify([...ids, ...draftIds])}]`})
  },
})

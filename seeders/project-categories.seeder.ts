import {registerSeeder, uploadImage, imageRef} from './helpers.js'
import type {SanityClient} from '@sanity/client'

interface CategorySpec {
  id: string
  title: string
  slug: string
  logo: string
}

// Slug must match the project's `category` field value (the existing string enum
// on the project schema). The Projects hub joins by this string.
const categories: CategorySpec[] = [
  {id: 'project-category-personal',  title: 'Personal',  slug: 'personal',  logo: 'assets/project-categories/personal.svg'},
  {id: 'project-category-freelance', title: 'Freelance', slug: 'freelance', logo: 'assets/project-categories/freelance.svg'},
  {id: 'project-category-hackathon', title: 'Hackathon', slug: 'hackathon', logo: 'assets/project-categories/hackathon.svg'},
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

    for (const [i, c] of categories.entries()) {
      const logoAssetId = await upload(c.logo)
      await client.createOrReplace({
        _id: c.id,
        _type: 'projectCategory',
        title: c.title,
        slug: {_type: 'slug', current: c.slug},
        logo: imageRef(logoAssetId),
        order: i + 1,
      })
      console.log(`     Created projectCategory: ${c.title}`)
      await delay()
    }
  },
  async down(client: SanityClient) {
    const ids = categories.map((c) => c.id)
    const draftIds = ids.map((id) => `drafts.${id}`)
    await client.delete({query: `*[_id in ${JSON.stringify([...ids, ...draftIds])}]`})
  },
})

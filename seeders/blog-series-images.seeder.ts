import {registerSeeder, uploadImage, imageRef} from './helpers.js'
import type {SanityClient} from '@sanity/client'

interface SeriesSpec {
  id: string
  shortTitle: string
  logo: string
}

// Each series gets a compact `shortTitle` (used as the filter card label) and a
// `logo` (filter card thumbnail). Existing series fields (title, slug, articles,
// order) are preserved by patching only — articles' thumbnails uploaded by
// images.seeder are untouched.
const series: SeriesSpec[] = [
  {id: 'blog-series-0', shortTitle: 'SvelteKit + Sanity', logo: 'assets/blog-series/sveltekit-sanity.svg'},
  {id: 'blog-series-1', shortTitle: 'Study Abroad',       logo: 'assets/blog-series/study-abroad.svg'},
  {id: 'blog-series-2', shortTitle: 'Pro Dev',            logo: 'assets/blog-series/professional-dev.svg'},
  {id: 'blog-series-3', shortTitle: 'UK Guide',           logo: 'assets/blog-series/uk-guide.svg'},
]

registerSeeder({
  name: 'blog-series-images',
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

    for (const s of series) {
      const logoAssetId = await upload(s.logo)
      await client.patch(s.id).set({
        shortTitle: s.shortTitle,
        logo: imageRef(logoAssetId),
      }).commit()
      console.log(`     Patched ${s.id}: shortTitle="${s.shortTitle}" + logo`)
      await delay()
    }
  },
  async down(client: SanityClient) {
    for (const s of series) {
      await client.patch(s.id).unset(['shortTitle', 'logo']).commit()
    }
  },
})

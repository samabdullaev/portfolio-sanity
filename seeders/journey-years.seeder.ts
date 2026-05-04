import {registerSeeder, uploadImage, imageRef} from './helpers.js'
import type {SanityClient} from '@sanity/client'

interface YearSpec {
  id: string
  year: number
  logo: string
}

// Newest first — matches how the Journey hub renders the row (descending years).
const years: YearSpec[] = [
  {id: 'journey-year-2026', year: 2026, logo: 'assets/journey-years/2026.svg'},
  {id: 'journey-year-2025', year: 2025, logo: 'assets/journey-years/2025.svg'},
  {id: 'journey-year-2024', year: 2024, logo: 'assets/journey-years/2024.svg'},
  {id: 'journey-year-2023', year: 2023, logo: 'assets/journey-years/2023.svg'},
]

registerSeeder({
  name: 'journey-years',
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

    for (const [i, y] of years.entries()) {
      const logoAssetId = await upload(y.logo)
      await client.createOrReplace({
        _id: y.id,
        _type: 'journeyYear',
        year: y.year,
        slug: {_type: 'slug', current: String(y.year)},
        logo: imageRef(logoAssetId),
        order: i + 1,
      })
      console.log(`     Created journeyYear: ${y.year}`)
      await delay()
    }
  },
  async down(client: SanityClient) {
    const ids = years.map((y) => y.id)
    const draftIds = ids.map((id) => `drafts.${id}`)
    await client.delete({query: `*[_id in ${JSON.stringify([...ids, ...draftIds])}]`})
  },
})

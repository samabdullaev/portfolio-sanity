import {registerSeeder, uploadImage, imageRef} from './helpers.js'
import type {SanityClient} from '@sanity/client'

interface IssuerSpec {
  id: string
  slug: string
  name: string
  logo: string
}

// 9 issuer documents. The id is also used as the _ref target by certificate documents.
const issuers: IssuerSpec[] = [
  {id: 'issuer-cs50',                slug: 'cs50',                name: 'CS50',                logo: 'assets/certificate-issuers/cs50.png'},
  {id: 'issuer-python-institute',    slug: 'python-institute',    name: 'Python Institute',    logo: 'assets/certificate-issuers/python-institute.png'},
  {id: 'issuer-hackerrank',          slug: 'hackerrank',          name: 'HackerRank',          logo: 'assets/certificate-issuers/hackerrank.png'},
  {id: 'issuer-awards-hackathons',   slug: 'awards-hackathons',   name: 'Awards & Hackathons', logo: 'assets/certificate-issuers/awards-hackathons.svg'},
  {id: 'issuer-coursera',            slug: 'coursera',            name: 'Coursera',            logo: 'assets/certificate-issuers/coursera.png'},
  {id: 'issuer-freecodecamp',        slug: 'freecodecamp',        name: 'FreeCodeCamp',        logo: 'assets/certificate-issuers/freecodecamp.png'},
  {id: 'issuer-forage',              slug: 'forage',              name: 'Forage',              logo: 'assets/certificate-issuers/forage.png'},
  {id: 'issuer-linkedin-learning',   slug: 'linkedin-learning',   name: 'LinkedIn Learning',   logo: 'assets/certificate-issuers/linkedin-learning.png'},
  {id: 'issuer-springpod',           slug: 'springpod',           name: 'Springpod',           logo: 'assets/certificate-issuers/springpod.png'},
]

registerSeeder({
  name: 'certificate-issuers',
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

    for (const [i, issuer] of issuers.entries()) {
      const assetId = await upload(issuer.logo)
      await client.createOrReplace({
        _id: issuer.id,
        _type: 'certificateIssuer',
        name: issuer.name,
        slug: {_type: 'slug', current: issuer.slug},
        logo: imageRef(assetId),
        order: i + 1,
      })
      console.log(`     Seeded issuer: ${issuer.name}`)
      await delay()
    }
  },
  async down(client: SanityClient) {
    const ids = issuers.map((i) => i.id)
    const draftIds = ids.map((id) => `drafts.${id}`)
    await client.delete({query: `*[_id in ${JSON.stringify([...ids, ...draftIds])}]`})
  },
})

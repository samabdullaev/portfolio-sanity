import {registerSeeder, key, uploadImage, imageRef} from './helpers.js'
import type {SanityClient} from '@sanity/client'

interface IssuerSpec {
  id: string
  slug: string
  name: string
  logo: string
  orderRank: string
  // Certificate _ids in display order. The website renders cert cards
  // grouped by issuer, each issuer's certificates[] in this exact order.
  certificateIds: string[]
}

// 9 issuer documents. Logos are the AI-generated isometric icons downloaded
// from Sanity's image CDN as JPEGs. orderRank values are zero-padded; the
// orderable plugin sorts them lexicographically and assigns new ranks
// between adjacent strings as the user drags items in Studio.
const issuers: IssuerSpec[] = [
  {
    id: 'issuer-cs50',
    slug: 'cs50',
    name: 'CS50',
    logo: 'assets/certificate-issuers/cs50.jpg',
    orderRank: '0001',
    certificateIds: ['cert-1', 'cert-2'],
  },
  {
    id: 'issuer-python-institute',
    slug: 'python-institute',
    name: 'Python Institute',
    logo: 'assets/certificate-issuers/python-institute.jpg',
    orderRank: '0002',
    certificateIds: ['cert-3', 'cert-4'],
  },
  {
    id: 'issuer-hackerrank',
    slug: 'hackerrank',
    name: 'HackerRank',
    logo: 'assets/certificate-issuers/hackerrank.jpg',
    orderRank: '0003',
    certificateIds: ['cert-5', 'cert-6', 'cert-7', 'cert-8', 'cert-9'],
  },
  {
    id: 'issuer-awards-hackathons',
    slug: 'awards-hackathons',
    name: 'Awards & Hackathons',
    logo: 'assets/certificate-issuers/awards-hackathons.jpg',
    orderRank: '0004',
    certificateIds: ['cert-10', 'cert-11', 'cert-12', 'cert-13', 'cert-14', 'cert-15', 'cert-16'],
  },
  {
    id: 'issuer-coursera',
    slug: 'coursera',
    name: 'Coursera',
    logo: 'assets/certificate-issuers/coursera.jpg',
    orderRank: '0005',
    certificateIds: ['cert-17', 'cert-18', 'cert-19', 'cert-20'],
  },
  {
    id: 'issuer-freecodecamp',
    slug: 'freecodecamp',
    name: 'FreeCodeCamp',
    logo: 'assets/certificate-issuers/freecodecamp.jpg',
    orderRank: '0006',
    certificateIds: ['cert-21'],
  },
  {
    id: 'issuer-forage',
    slug: 'forage',
    name: 'Forage',
    logo: 'assets/certificate-issuers/forage.jpg',
    orderRank: '0007',
    certificateIds: ['cert-22', 'cert-23', 'cert-24', 'cert-25', 'cert-26'],
  },
  {
    id: 'issuer-linkedin-learning',
    slug: 'linkedin-learning',
    name: 'LinkedIn Learning',
    logo: 'assets/certificate-issuers/linkedin-learning.jpg',
    orderRank: '0008',
    certificateIds: [
      'cert-27', 'cert-28', 'cert-29', 'cert-30', 'cert-31',
      'cert-32', 'cert-33', 'cert-34', 'cert-35', 'cert-36',
      'cert-37', 'cert-38', 'cert-39', 'cert-40', 'cert-41',
    ],
  },
  {
    id: 'issuer-springpod',
    slug: 'springpod',
    name: 'Springpod',
    logo: 'assets/certificate-issuers/springpod.jpg',
    orderRank: '0009',
    certificateIds: ['cert-42'],
  },
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

    for (const issuer of issuers) {
      const assetId = await upload(issuer.logo)
      await client.createOrReplace({
        _id: issuer.id,
        _type: 'certificateIssuer',
        name: issuer.name,
        slug: {_type: 'slug', current: issuer.slug},
        logo: imageRef(assetId),
        orderRank: issuer.orderRank,
        certificates: issuer.certificateIds.map((cid) => ({
          _key: key(),
          _type: 'reference',
          _ref: cid,
        })),
      })
      console.log(`     Seeded issuer: ${issuer.name} (${issuer.certificateIds.length} certs)`)
      await delay()
    }
  },
  async down(client: SanityClient) {
    const ids = issuers.map((i) => i.id)
    const draftIds = ids.map((id) => `drafts.${id}`)
    await client.delete({query: `*[_id in ${JSON.stringify([...ids, ...draftIds])}]`})
  },
})

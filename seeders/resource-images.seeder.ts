import {registerSeeder, uploadImage, imageRef} from './helpers.js'
import type {SanityClient} from '@sanity/client'

// Resource categories: thumbnail field (Playbooks + Personal — the 11 internal detail pages)
const resourceImages: [string, string][] = [
  ['resource-interview-prep',     'assets/resources/Interview Prep.jpg'],
  ['resource-system-design',      'assets/resources/System Design.jpg'],
  ['resource-career-toolkit',     'assets/resources/Career Toolkit.jpg'],
  ['resource-video-learning',     'assets/resources/Video Learning.jpg'],
  ['resource-programming-guides', 'assets/resources/Programming Guides.jpg'],
  ['resource-problem-solving',    'assets/resources/Problem Solving.jpg'],
  ['resource-github',             'assets/resources/GitHub.jpg'],
  ['resource-telegram-channels',  'assets/resources/Telegram Channels.png'],
  ['resource-newsletters',        'assets/resources/Newsletters.jpg'],
  ['resource-portfolios-i-like',  'assets/resources/Portfolios I Like.jpg'],
  ['resource-demos-showcases',    'assets/resources/Demos & Showcases.jpg'],
]

registerSeeder({
  name: 'resource-images',
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

    for (const [id, path] of resourceImages) {
      const assetId = await upload(path)
      await client.patch(id).set({thumbnail: imageRef(assetId)}).commit()
      await delay()
    }
    console.log(`     Uploaded ${resourceImages.length} resource thumbnails`)
  },
  async down(client: SanityClient) {
    for (const [id] of resourceImages) {
      await client.patch(id).unset(['thumbnail']).commit()
    }
  },
})

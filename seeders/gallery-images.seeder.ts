import {registerSeeder, uploadImage} from './helpers.js'
import type {SanityClient} from '@sanity/client'

// Per-project + per-travel-destination gallery image-asset mapping.
//
// Each gallery on the source doc is an array of {_key, _type, caption, ...}
// items where image-type items have no `asset` ref out of the box (set by
// projects.seeder + travel.seeder). This seeder uploads the AI-generated
// images and patches each image-type slot in order.
//
// `paths` is the ordered list of image files for the doc's IMAGE-typed
// gallery items only — galleryVideo items are skipped over (e.g. joybormi
// has 2 images + 1 video, so paths.length === 2).
//
// Files were generated via Sanity AI in Studio, then downloaded as JPEGs
// from Sanity's CDN. Sanity asset hashes are content-addressed (SHA1), so
// re-uploading the same bytes returns the same asset _id used previously.

interface GalleryAssets {
  docId: string
  paths: string[]
}

const projectGalleries: GalleryAssets[] = [
  {docId: 'project-codemaster', paths: ['assets/projects-gallery/codemaster-1.jpg', 'assets/projects-gallery/codemaster-2.jpg']},
  {docId: 'project-subject-test-platform', paths: ['assets/projects-gallery/subject-test-platform-1.jpg', 'assets/projects-gallery/subject-test-platform-2.jpg']},
  {docId: 'project-smart-resume-matcher', paths: ['assets/projects-gallery/smart-resume-matcher-1.jpg', 'assets/projects-gallery/smart-resume-matcher-2.jpg']},
  {docId: 'project-allmaths', paths: ['assets/projects-gallery/allmaths-1.jpg', 'assets/projects-gallery/allmaths-2.jpg']},
  {docId: 'project-al-khorezmi', paths: ['assets/projects-gallery/al-khorezmi-1.jpg', 'assets/projects-gallery/al-khorezmi-2.jpg']},
  {docId: 'project-shirina', paths: ['assets/projects-gallery/shirina-1.jpg', 'assets/projects-gallery/shirina-2.jpg']},
  {docId: 'project-actyble', paths: ['assets/projects-gallery/actyble-1.jpg', 'assets/projects-gallery/actyble-2.jpg']},
  {docId: 'project-soffin', paths: ['assets/projects-gallery/soffin-1.jpg', 'assets/projects-gallery/soffin-2.jpg']},
  {docId: 'project-4miles', paths: ['assets/projects-gallery/4miles-1.jpg', 'assets/projects-gallery/4miles-2.jpg']},
  {docId: 'project-kinaie-ecom', paths: ['assets/projects-gallery/kinaie-ecom-1.jpg']},
  {docId: 'project-kinaie-growth', paths: ['assets/projects-gallery/kinaie-growth-1.jpg']},
  {docId: 'project-joybormi', paths: ['assets/projects-gallery/joybormi-1.jpg', 'assets/projects-gallery/joybormi-2.jpg']},
  {docId: 'project-tech2', paths: ['assets/projects-gallery/tech2-1.jpg']},
  {docId: 'project-locus', paths: ['assets/projects-gallery/locus-1.jpg', 'assets/projects-gallery/locus-2.jpg']},
]

const travelGalleries: GalleryAssets[] = [
  {docId: 'travel-uzbekistan', paths: ['assets/travel-gallery/uzbekistan-1.jpg', 'assets/travel-gallery/uzbekistan-2.jpg', 'assets/travel-gallery/uzbekistan-3.jpg']},
  {docId: 'travel-uk', paths: ['assets/travel-gallery/uk-1.jpg', 'assets/travel-gallery/uk-2.jpg', 'assets/travel-gallery/uk-3.jpg']},
  {docId: 'travel-turkey', paths: ['assets/travel-gallery/turkey-1.jpg', 'assets/travel-gallery/turkey-2.jpg']},
  {docId: 'travel-canada', paths: ['assets/travel-gallery/canada-1.jpg', 'assets/travel-gallery/canada-2.jpg']},
  {docId: 'travel-france', paths: ['assets/travel-gallery/france-1.jpg', 'assets/travel-gallery/france-2.jpg']},
  {docId: 'travel-spain', paths: ['assets/travel-gallery/spain-1.jpg']},
  {docId: 'travel-netherlands', paths: ['assets/travel-gallery/netherlands-1.jpg']},
]

registerSeeder({
  name: 'gallery-images',
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

    async function patch(group: GalleryAssets[]) {
      for (const {docId, paths} of group) {
        const doc = (await client.getDocument(docId)) as any
        if (!doc?.gallery?.length) {
          console.log(`     Skip ${docId} (no gallery)`)
          continue
        }
        // Upload all assets for this doc, then walk the existing gallery
        // and assign the next asset to each image-type slot in order.
        const assetIds: string[] = []
        for (const p of paths) {
          assetIds.push(await upload(p))
          await delay()
        }
        let i = 0
        const updatedGallery = doc.gallery.map((item: any) => {
          if (item._type !== 'image') return item
          const assetId = assetIds[i++]
          if (!assetId) return item
          return {...item, asset: {_type: 'reference', _ref: assetId}}
        })
        if (i !== paths.length) {
          console.warn(
            `     ${docId}: expected ${paths.length} image slots but found ${i}; some images may be unused`,
          )
        }
        await client.patch(docId).set({gallery: updatedGallery}).commit()
        console.log(`     Patched ${docId} (${i}/${paths.length} image slots)`)
      }
    }

    await patch(projectGalleries)
    await patch(travelGalleries)
  },
  async down(client: SanityClient) {
    // Strip the asset ref from every image-type gallery slot on each doc
    // we touched. Captions and galleryVideo items are preserved.
    const docs = [...projectGalleries, ...travelGalleries].map((g) => g.docId)
    for (const docId of docs) {
      const doc = (await client.getDocument(docId)) as any
      if (!doc?.gallery?.length) continue
      const updatedGallery = doc.gallery.map((item: any) => {
        if (item._type !== 'image') return item
        const {asset, ...rest} = item
        return rest
      })
      await client.patch(docId).set({gallery: updatedGallery}).commit()
    }
  },
})

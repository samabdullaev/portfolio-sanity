import {createClient, type SanityClient} from '@sanity/client'
import {readFileSync} from 'fs'
import {resolve} from 'path'
import {randomBytes} from 'crypto'

// Read configuration from .env. We parse the file directly rather than
// using dotenv to avoid the dependency for a 3-line read. Project ID and
// dataset are intentionally surfaced via env (not hardcoded) so the same
// seeders can target multiple datasets and so a public-repo forker can
// point at their own Sanity project.
const envPath = resolve(__dirname, '../.env')
const env: Record<string, string> = {}
try {
  const raw = readFileSync(envPath, 'utf8')
  for (const line of raw.split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.+)$/)
    if (m) env[m[1]] = m[2].trim()
  }
} catch {}

const token = env.SANITY_TOKEN
const projectId = env.SANITY_STUDIO_PROJECT_ID
const dataset = env.SANITY_STUDIO_DATASET

export function getClient(): SanityClient {
  if (!projectId) throw new Error('SANITY_STUDIO_PROJECT_ID not found in .env')
  if (!dataset) throw new Error('SANITY_STUDIO_DATASET not found in .env')
  if (!token) throw new Error('SANITY_TOKEN not found in .env')
  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
  })
}

export function key(): string {
  return randomBytes(4).toString('hex')
}

export async function uploadImage(client: SanityClient, filePath: string): Promise<string> {
  const absolutePath = resolve(__dirname, 'assets', filePath)
  const buffer = readFileSync(absolutePath)
  const ext = (filePath.split('.').pop() || 'png').toLowerCase()
  const contentType =
    ext === 'jpg' ? 'image/jpeg' :
    ext === 'svg' ? 'image/svg+xml' :
    `image/${ext}`
  const asset = await client.assets.upload('image', buffer, {
    filename: filePath.split('/').pop() || 'image.' + ext,
    contentType,
  })
  return asset._id
}

export function imageRef(assetId: string) {
  return {
    _type: 'image' as const,
    asset: {_type: 'reference' as const, _ref: assetId},
  }
}

interface Seeder {
  name: string
  up: (client: SanityClient) => Promise<void>
  down: (client: SanityClient) => Promise<void>
}

const seeders: Seeder[] = []

export function registerSeeder(seeder: Seeder) {
  seeders.push(seeder)
}

export function getSeeders() {
  return seeders
}

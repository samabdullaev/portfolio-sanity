import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET

if (!projectId) throw new Error('SANITY_STUDIO_PROJECT_ID is not set — see .env.example')
if (!dataset) throw new Error('SANITY_STUDIO_DATASET is not set — see .env.example')

export default defineCliConfig({
  api: {projectId, dataset},
})

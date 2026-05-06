# portfolio-sanity

Sanity Studio + content seeders for [samabdullaev.com](https://samabdullaev.com).
The website (Next.js frontend) lives in the companion repo
[samabdullaev/portfolio](https://github.com/samabdullaev/portfolio).

## What's here

- **Schemas** — typed document + object definitions for every content
  type rendered on the site (project, blog article, travel destination,
  certificate, etc.) with custom inputs (e.g. the City dropdown that
  reads from a sibling `overview.citiesVisited` field on travel docs).
- **Studio config** — flat desk structure with `@sanity/icons`, drag-and-
  drop ordering for filter-card types via `@sanity/orderable-document-list`,
  and date-based default sort for chronological types.
- **Seeders** — TypeScript scripts that create or update production
  content in bulk (`pnpm seed up`/`down`). Used to bootstrap the dataset
  and to migrate content as the schema evolves.

## Local setup

```bash
# Install dependencies
pnpm install

# Configure Sanity project + write token
cp .env.example .env
# Fill in:
#   SANITY_STUDIO_PROJECT_ID  — your Sanity project ID
#   SANITY_STUDIO_DATASET     — typically "production"
#   SANITY_TOKEN              — API token with Editor permissions
#                               (sanity.io/manage → API → Add API token)

# Run Studio locally
pnpm dev          # opens http://localhost:3333
```

## Seeders

Seeders live under `seeders/` and register themselves on import. Each one
exposes `up()` and `down()` against the Sanity client.

```bash
# Run every seeder
pnpm seed up

# Run specific ones (space-separated)
pnpm seed up images gallery-images

# Tear down (deletes documents)
pnpm seed down

# Tear down only specific types
pnpm seed down resources
```

> **Re-seed gotcha**: seeders that use `createOrReplace` (e.g. `blog`,
> `travel`, `journey`, `singletons`, `projects`) wipe the doc, including
> any image asset references that live on it. Pair them with the matching
> image seeder (`images`, `blog-series-images`, `gallery-images`) when
> re-running, or thumbnails will go blank until the next image upload.

### Seeder run order

The default order matters because parent docs reference child IDs (e.g.
`certificateIssuer.certificates[]` contains cert refs). The order is
declared in `seeders/seed.ts` — don't reshuffle without understanding
the dependency graph.

### Seeder asset folders

Image assets used by seeders live in `seeders/assets/`. Subfolders mirror
the doc type (`projects/`, `travel/`, `certificates/`, etc.). The AI-
generated isometric icons used as filter-card logos are pre-downloaded
from Sanity's CDN.

## Schema overview

Content types and their relationships are documented in the companion
repo's `CLAUDE.md`. Key shapes:

| Type | Purpose |
|------|---------|
| `homePage`, `aboutPage`, `siteSettings` | Singletons with the Hero / About / footer copy |
| `project` + `projectCategory` | Portfolio entries grouped by category (parent owns `projects[]` array) |
| `blogArticle` + `blogSeries` | Blog posts grouped by series (parent owns `articles[]`; "Part N" derived from index) |
| `journeyUpdate` + `journeyYear` | Monthly LinkedIn updates filtered by year |
| `travelDestination` | Country / location pages with overview + places + tips |
| `yearlyReview` | One per year, year-driven default sort |
| `certificate` + `certificateIssuer` | Certificates grouped by issuer (parent owns `certificates[]`) |
| `mentorshipArticle` | External Publink articles |
| `resource`, `resourceCategory`, `resourceTopic` | Three-tier model: topics group resources or curated category pages |

## Studio deploy

```bash
pnpm deploy       # publishes to <project>.sanity.studio
```

For a custom subdomain (e.g. `studio.samabdullaev.com`), point a CNAME at
the Sanity Studio URL via your DNS provider.

## License

MIT — see [LICENSE](./LICENSE).

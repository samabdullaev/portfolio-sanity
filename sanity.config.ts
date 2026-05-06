import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import './studio.css'
import {
  ActivityIcon,
  BookIcon,
  BookmarkIcon,
  CodeIcon,
  CogIcon,
  EarthGlobeIcon,
  HomeIcon,
  RocketIcon,
  StarIcon,
  TaskIcon,
  UserIcon,
} from '@sanity/icons'
import {schemaTypes} from './schemaTypes'

const singletonTypes = new Set(['homePage', 'aboutPage', 'siteSettings'])

export default defineConfig({
  name: 'portfolio-studio',
  title: 'Portfolio Studio',
  projectId: 'p43tljnq',
  dataset: 'production',
  plugins: [
    structureTool({
      // Flat list ordered to match the website nav (Home → About →
      // Projects → Journey → Blog → Mentorship → Travel → Reviews →
      // Resources → Certificates). One divider separates page singletons
      // from content collections; within collections, the icon change
      // signals each section's start. `context` is passed through to
      // orderableDocumentListDeskItem so it can wire up the rank-aware
      // list view.
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            // Pages (singletons)
            S.listItem()
              .title('Home')
              .icon(HomeIcon)
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('About')
              .icon(UserIcon)
              .id('aboutPage')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem()
              .title('Settings')
              .icon(CogIcon)
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

            S.divider(),

            // Projects
            orderableDocumentListDeskItem({
              S,
              context,
              type: 'projectCategory',
              title: 'Project Categories',
              icon: CodeIcon,
            }),
            S.documentTypeListItem('project').title('All Projects').icon(CodeIcon),

            // Journey
            orderableDocumentListDeskItem({
              S,
              context,
              type: 'journeyYear',
              title: 'Journey Years',
              icon: RocketIcon,
            }),
            S.documentTypeListItem('journeyUpdate').title('All Journey Updates').icon(RocketIcon),

            // Blog
            orderableDocumentListDeskItem({
              S,
              context,
              type: 'blogSeries',
              title: 'Blog Series',
              icon: BookIcon,
            }),
            S.documentTypeListItem('blogArticle').title('All Blog Articles').icon(BookIcon),

            // Mentorship (single-type)
            S.documentTypeListItem('mentorshipArticle').title('Mentorship').icon(StarIcon),

            // Travel (single-type)
            orderableDocumentListDeskItem({
              S,
              context,
              type: 'travelDestination',
              title: 'Travel',
              icon: EarthGlobeIcon,
            }),

            // Yearly Reviews (single-type) — sorted by year desc via schema orderings
            S.documentTypeListItem('yearlyReview').title('Yearly Reviews').icon(ActivityIcon),

            // Resources
            orderableDocumentListDeskItem({
              S,
              context,
              type: 'resourceTopic',
              title: 'Resource Topics',
              icon: BookmarkIcon,
            }),
            S.documentTypeListItem('resourceCategory').title('Resource Categories').icon(BookmarkIcon),
            orderableDocumentListDeskItem({
              S,
              context,
              type: 'resource',
              title: 'All Resources',
              icon: BookmarkIcon,
            }),

            // Certificates
            orderableDocumentListDeskItem({
              S,
              context,
              type: 'certificateIssuer',
              title: 'Certificate Issuers',
              icon: TaskIcon,
            }),
            S.documentTypeListItem('certificate').title('All Certificates').icon(TaskIcon),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
})

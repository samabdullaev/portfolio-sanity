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
      // signals each section's start.
      //
      // For "All X" flat list views we use S.documentTypeList (not
      // documentTypeListItem) so we can attach an explicit
      // .defaultOrdering — Sanity Studio's default would otherwise be
      // creation order, which is rarely what we want.
      //
      // `context` is passed through to orderableDocumentListDeskItem so
      // it can wire up the rank-aware list view.
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

            // Journey — years sort by year desc; updates by date desc.
            S.listItem()
              .title('Journey Years')
              .icon(RocketIcon)
              .child(
                S.documentTypeList('journeyYear')
                  .title('Journey Years')
                  .defaultOrdering([{field: 'year', direction: 'desc'}]),
              ),
            S.listItem()
              .title('All Journey Updates')
              .icon(RocketIcon)
              .child(
                S.documentTypeList('journeyUpdate')
                  .title('All Journey Updates')
                  .defaultOrdering([{field: 'date', direction: 'desc'}]),
              ),

            // Blog
            orderableDocumentListDeskItem({
              S,
              context,
              type: 'blogSeries',
              title: 'Blog Series',
              icon: BookIcon,
            }),
            S.listItem()
              .title('All Blog Articles')
              .icon(BookIcon)
              .child(
                S.documentTypeList('blogArticle')
                  .title('All Blog Articles')
                  .defaultOrdering([{field: 'date', direction: 'desc'}]),
              ),

            // Mentorship — sorted by publish date desc.
            S.listItem()
              .title('Mentorship')
              .icon(StarIcon)
              .child(
                S.documentTypeList('mentorshipArticle')
                  .title('Mentorship')
                  .defaultOrdering([{field: 'date', direction: 'desc'}]),
              ),

            // Travel
            orderableDocumentListDeskItem({
              S,
              context,
              type: 'travelDestination',
              title: 'Travel',
              icon: EarthGlobeIcon,
            }),

            // Yearly Reviews — sorted by year desc.
            S.listItem()
              .title('Yearly Reviews')
              .icon(ActivityIcon)
              .child(
                S.documentTypeList('yearlyReview')
                  .title('Yearly Reviews')
                  .defaultOrdering([{field: 'year', direction: 'desc'}]),
              ),

            // Resources
            orderableDocumentListDeskItem({
              S,
              context,
              type: 'resourceTopic',
              title: 'Resource Topics',
              icon: BookmarkIcon,
            }),
            orderableDocumentListDeskItem({
              S,
              context,
              type: 'resourceCategory',
              title: 'Resource Categories',
              icon: BookmarkIcon,
            }),
            orderableDocumentListDeskItem({
              S,
              context,
              type: 'resource',
              title: 'All Resources',
              icon: BookmarkIcon,
            }),

            // Certificates — sorted by date desc on the flat list.
            orderableDocumentListDeskItem({
              S,
              context,
              type: 'certificateIssuer',
              title: 'Certificate Issuers',
              icon: TaskIcon,
            }),
            S.listItem()
              .title('All Certificates')
              .icon(TaskIcon)
              .child(
                S.documentTypeList('certificate')
                  .title('All Certificates')
                  .defaultOrdering([{field: 'date', direction: 'desc'}]),
              ),
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

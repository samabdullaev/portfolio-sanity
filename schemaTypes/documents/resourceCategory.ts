import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'resourceCategory',
  title: 'Resource Category',
  type: 'document',
  description: 'A curated category of external links with its own detail page on /resources/{slug} (e.g. Interview Prep, Newsletters).',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (r) => r.required()}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'string', description: 'Short description shown under the title on the hub card.'}),
    defineField({name: 'thumbnail', title: 'Thumbnail', type: 'image', validation: (r) => r.required()}),
    defineField({name: 'sectionLabel', title: 'Section Label', type: 'string', description: 'Heading shown above the list on the detail page.', initialValue: 'resources'}),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
          defineField({name: 'desc', title: 'Description', type: 'string'}),
          defineField({name: 'url', title: 'URL', type: 'url', validation: (r) => r.required()}),
        ],
        preview: {select: {title: 'name', subtitle: 'desc'}},
      })],
    }),
    defineField({
      name: 'sections',
      title: 'Sections (for multi-section categories)',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({name: 'label', title: 'Section Label', type: 'string'}),
          defineField({
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [defineArrayMember({
              type: 'object',
              fields: [
                defineField({name: 'name', title: 'Name', type: 'string'}),
                defineField({name: 'desc', title: 'Description', type: 'string'}),
                defineField({name: 'url', title: 'URL', type: 'url'}),
              ],
              preview: {select: {title: 'name'}},
            })],
          }),
        ],
        preview: {select: {title: 'label'}},
      })],
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'subtitle', media: 'thumbnail'}},
})

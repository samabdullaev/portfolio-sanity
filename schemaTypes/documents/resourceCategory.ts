import {defineType, defineField, defineArrayMember} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'resourceCategory',
  title: 'Resource Category',
  type: 'document',
  description:
    'A curated category of external links with its own detail page on /resources/{slug} (e.g. Interview Prep, Newsletters). Drag to reorder in Studio. For a single-section page, just add one entry to Sections.',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Short description shown under the title on the hub card.',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      description:
        'Each section has a label and a list of links. For a single-section page, add one entry — the label becomes the heading shown above the list.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Section Label',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Name',
                      type: 'string',
                      validation: (r) => r.required(),
                    }),
                    defineField({name: 'desc', title: 'Description', type: 'string'}),
                    defineField({
                      name: 'url',
                      title: 'URL',
                      type: 'url',
                      validation: (r) => r.required(),
                    }),
                  ],
                  preview: {select: {title: 'name', subtitle: 'desc'}},
                }),
              ],
            }),
          ],
          preview: {select: {title: 'label'}},
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    orderRankField({type: 'resourceCategory'}),
  ],
  orderings: [orderRankOrdering],
  preview: {select: {title: 'title', subtitle: 'subtitle', media: 'thumbnail'}},
})

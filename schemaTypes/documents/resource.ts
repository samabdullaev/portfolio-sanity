import {defineType, defineField} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  description: 'A single external resource — a tool, app, library, or service that links straight off-site. Add one of these whenever you find something useful, then add it under any Resource Topic. Drag to reorder the All Resources list in Studio.',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (r) => r.required()}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'string', description: 'Short description shown under the title on the hub card.'}),
    defineField({name: 'thumbnail', title: 'Thumbnail', type: 'image', validation: (r) => r.required()}),
    defineField({name: 'externalUrl', title: 'External URL', type: 'url', validation: (r) => r.required()}),
    orderRankField({type: 'resource'}),
  ],
  orderings: [orderRankOrdering],
  preview: {select: {title: 'title', subtitle: 'subtitle', media: 'thumbnail'}},
})

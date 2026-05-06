import {defineType, defineField} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'resourceTopic',
  title: 'Resource Topic',
  type: 'document',
  description: 'A grouping shown as a section on the Resources hub (e.g. "Tools", "Apps", "Playbooks"). Pick which resources or categories appear here, in order.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
      description: 'e.g. "Tools", "Apps", "Playbooks"',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
      description: 'Used in URL filter parameter, e.g. /resources?topic=tools',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Square thumbnail shown on the filter card on the Resources hub.',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'resource'}, {type: 'resourceCategory'}]}],
      description: 'Cards shown under this topic on the hub. Pick a Resource (external link) or a Resource Category (detail page). Drag to reorder.',
    }),
    orderRankField({type: 'resourceTopic'}),
  ],
  orderings: [orderRankOrdering],
  preview: {select: {title: 'title', media: 'logo'}},
})

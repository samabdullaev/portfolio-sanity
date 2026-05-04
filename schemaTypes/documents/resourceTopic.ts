import {defineType, defineField} from 'sanity'

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
    defineField({name: 'order', title: 'Order', type: 'number'}),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'resource'}, {type: 'resourceCategory'}]}],
      description: 'Cards shown under this topic on the hub. Pick a Resource (external link) or a Resource Category (detail page).',
    }),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title'}},
})

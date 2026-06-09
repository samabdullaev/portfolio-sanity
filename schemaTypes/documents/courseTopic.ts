import {defineType, defineField} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'courseTopic',
  title: 'Course Topic',
  type: 'document',
  description:
    'A subject grouping on the Courses page (e.g. Python & Computer Science, Web Development). The courses that belong to this topic are listed in the `courses[]` array — drag to reorder. Rendered as a section heading on the website.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
      description: 'Display name shown as the section heading on the Courses page.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: (r) => r.required(),
      description: 'Square 3D icon shown on the filter card at the top of the Courses page (same style as the Certificate Issuer / Resource Topic logos).',
    }),
    defineField({
      name: 'courses',
      title: 'Courses',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'course'}]}],
      description: 'Courses in this topic, in display order. Drag to reorder.',
    }),
    orderRankField({type: 'courseTopic'}),
  ],
  orderings: [orderRankOrdering],
  preview: {select: {title: 'title'}},
})

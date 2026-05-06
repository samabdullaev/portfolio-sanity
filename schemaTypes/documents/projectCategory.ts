import {defineType, defineField} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'projectCategory',
  title: 'Project Category',
  type: 'document',
  description:
    'A category (Personal, Freelance, Hackathon) used as a filter card on the Projects hub. Holds the category logo and the ordered list of projects that belong to it. The website renders project sections by iterating these categories in their drag-ordered position.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
      description: 'Display name shown on the filter card and as the section heading (e.g. "Personal").',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
      description: 'Used in URL filter parameter, e.g. /projects?category=personal.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: (r) => r.required(),
      description: 'Square thumbnail shown on the filter card.',
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}],
      description:
        'Projects in this category, in display order. Drag to reorder — the website renders them in this order. A project can sit in only one category at a time (no schema enforcement, but website expects unique containment).',
    }),
    orderRankField({type: 'projectCategory'}),
  ],
  orderings: [orderRankOrdering],
  preview: {select: {title: 'title', media: 'logo'}},
})

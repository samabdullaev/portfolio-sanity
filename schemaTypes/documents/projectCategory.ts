import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'projectCategory',
  title: 'Project Category',
  type: 'document',
  description: 'A category (Personal, Freelance, Hackathon) used as a filter card on the Projects hub. Holds the category logo and ordering. Projects are matched by their `category` string field.',
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
      description: 'Must match the project\'s `category` field value (e.g. "personal", "freelance", "hackathon"). Also used in the URL filter parameter.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: (r) => r.required(),
      description: 'Square thumbnail shown on the filter card.',
    }),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', media: 'logo'}},
})

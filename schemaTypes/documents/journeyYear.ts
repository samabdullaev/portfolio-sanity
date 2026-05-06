import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'journeyYear',
  title: 'Journey Year',
  type: 'document',
  description:
    'A year (2023, 2024, …) used as a filter card on the Journey hub. Holds the year-specific logo. Journey updates are matched by year derived from their publish date.',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (r) => r.required().integer(),
      description: 'The numeric year (e.g. 2024).',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'year'},
      validation: (r) => r.required(),
      description: 'Used in URL filter parameter, e.g. /journey?year=2024',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: (r) => r.required(),
      description: 'Square thumbnail shown on the filter card.',
    }),
  ],
  orderings: [
    {title: 'Year, newest first', name: 'yearDesc', by: [{field: 'year', direction: 'desc'}]},
  ],
  preview: {select: {title: 'year', media: 'logo'}},
})

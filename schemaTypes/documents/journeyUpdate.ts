import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'journeyUpdate',
  title: 'Journey Update',
  type: 'document',
  description:
    'A monthly journey update published on LinkedIn. Set the publish date to the 1st of the month AFTER the recap month (e.g. October 2023 → 2023-11-01).',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'date',
      options: {dateFormat: 'YYYY-MM-DD'},
      validation: (r) => r.required(),
      description: '1st of the month following the recap month.',
    }),
    defineField({name: 'thumbnail', title: 'Thumbnail', type: 'image'}),
    defineField({
      name: 'linkedInUrl',
      title: 'LinkedIn URL',
      type: 'url',
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {title: 'Date, newest first', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]},
  ],
  preview: {select: {title: 'title', subtitle: 'date', media: 'thumbnail'}},
})

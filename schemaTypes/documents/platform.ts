import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'platform',
  title: 'Platform',
  type: 'document',
  description:
    'A source / job board you apply through (e.g. LinkedIn, Company Website, Wellfound). Reusable across applications — on an application, pick an existing platform or create a new one inline.',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{title: 'Name, A–Z', name: 'nameAsc', by: [{field: 'name', direction: 'asc'}]}],
  preview: {select: {title: 'name'}},
})

import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'certificateIssuer',
  title: 'Certificate Issuer',
  type: 'document',
  description: 'A source that issued one or more certificates (e.g. Coursera, CS50, HackerRank). Used as a filter card on the Certificates hub.',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
      description: 'Display name shown on the filter card and as the section heading.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (r) => r.required(),
      description: 'Used in URL filter parameter, e.g. /certificates?issuer=coursera',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: (r) => r.required(),
      description: 'Square brand logo or thumbnail shown on the filter card.',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Manual ordering for the filter row.',
    }),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', media: 'logo'}},
})

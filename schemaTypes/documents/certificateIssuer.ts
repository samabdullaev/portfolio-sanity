import {defineType, defineField} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'certificateIssuer',
  title: 'Certificate Issuer',
  type: 'document',
  description: 'A source that issued one or more certificates (e.g. Coursera, CS50, HackerRank). Used as a filter card on the Certificates hub. The certificates that belong to this issuer are listed in the `certificates[]` array — drag to reorder.',
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
      name: 'certificates',
      title: 'Certificates',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'certificate'}]}],
      description: 'Certificates issued by this organization, in display order. Drag to reorder.',
    }),
    orderRankField({type: 'certificateIssuer'}),
  ],
  orderings: [orderRankOrdering],
  preview: {select: {title: 'name', media: 'logo'}},
})

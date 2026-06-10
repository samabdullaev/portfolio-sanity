import {defineType, defineField} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'applicationStatus',
  title: 'Application Status',
  type: 'document',
  description:
    'A stage in the job-application pipeline (e.g. Submitted, HR Meeting, Rejected). Single source of truth for the status badge colour, the Board column, and the column order. Applications reference one of these. Drag to reorder — the order is the Board column order on the website.',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (r) => r.required(),
      description: 'Display name shown on the badge and as the Board column heading.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'label'},
      validation: (r) => r.required(),
      description: 'Stable key used for filtering + CSV export, e.g. "hr-meeting".',
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Colour',
      type: 'string',
      validation: (r) =>
        r.required().regex(/^#[0-9a-fA-F]{6}$/, {name: 'hex colour (e.g. #f59e0b)'}),
      description:
        'A single 6-digit hex (e.g. #f59e0b). The badge tint, text, dot, and Board accent are all derived from this one value, so it works in both light and dark mode.',
    }),
    orderRankField({type: 'applicationStatus'}),
  ],
  orderings: [orderRankOrdering],
  preview: {select: {title: 'label', subtitle: 'accentColor'}},
})

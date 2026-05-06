import {defineType, defineField} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'blogSeries',
  title: 'Blog Series',
  type: 'document',
  description:
    'A blog series shown as a section on the Blog hub. Articles in the series come from the `articles[]` array — drag to reorder; the article\'s "Part N" label is its index in this array.',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (r) => r.required()}),
    defineField({
      name: 'shortTitle',
      title: 'Short Title',
      type: 'string',
      description: 'Compact label shown on the filter card on /blog (e.g. "SvelteKit + Sanity"). Falls back to Title if empty.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Square thumbnail shown on the filter card on /blog.',
    }),
    defineField({
      name: 'articles',
      title: 'Articles',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'blogArticle'}]}],
      description: 'Articles in this series, in display order. Drag to reorder — Part N labels reflect the array index.',
    }),
    orderRankField({type: 'blogSeries'}),
  ],
  orderings: [orderRankOrdering],
  preview: {select: {title: 'title', media: 'logo'}},
})

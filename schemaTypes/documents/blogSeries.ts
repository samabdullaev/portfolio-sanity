import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'blogSeries',
  title: 'Blog Series',
  type: 'document',
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
    defineField({name: 'articles', title: 'Articles', type: 'array', of: [{type: 'reference', to: [{type: 'blogArticle'}]}]}),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', media: 'logo'}},
})

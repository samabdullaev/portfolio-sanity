import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'blogArticle',
  title: 'Blog Article',
  type: 'document',
  description:
    'A single blog article. Add it freely here, then add a reference to it in the appropriate `blogSeries.articles[]` array — its "Part N" label is computed from the array index.',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'date', title: 'Date', type: 'string'}),
    defineField({name: 'externalUrl', title: 'External URL', type: 'url', validation: (r) => r.required()}),
    defineField({name: 'thumbnail', title: 'Thumbnail', type: 'image'}),
  ],
  preview: {select: {title: 'title', subtitle: 'date', media: 'thumbnail'}},
})

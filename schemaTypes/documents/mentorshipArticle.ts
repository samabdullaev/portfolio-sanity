import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'mentorshipArticle',
  title: 'Mentorship Article',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'task', title: 'Task', type: 'string'}),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: {dateFormat: 'YYYY-MM-DD'},
    }),
    defineField({name: 'thumbnail', title: 'Thumbnail', type: 'image'}),
    defineField({name: 'externalUrl', title: 'External URL', type: 'url'}),
  ],
  orderings: [
    {title: 'Date, newest first', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]},
  ],
  preview: {select: {title: 'title', subtitle: 'task', media: 'thumbnail'}},
})

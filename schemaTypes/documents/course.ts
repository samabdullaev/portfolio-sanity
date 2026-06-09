import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  description:
    'A course Sam has studied. Add it freely here, then add a reference to it inside the appropriate `courseTopic.courses[]` array. Topic membership and display order both come from the array on the parent.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
      description: 'Course name — the primary text on each row.',
    }),
    defineField({
      name: 'provider',
      title: 'Provider',
      type: 'string',
      description: 'Platform / institution shown as supporting metadata, e.g. "Harvard · edX", "Meta · Coursera".',
    }),
    defineField({
      name: 'url',
      title: 'Course URL',
      type: 'url',
      validation: (r) => r.required(),
      description: 'Link to take the course — the primary action when the course title is clicked.',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: {dateFormat: 'YYYY-MM-DD'},
      description: 'When studied. For month-only sources, use the 1st of that month (e.g. 2024-03-01).',
    }),
  ],
  orderings: [
    {title: 'Date, newest first', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]},
  ],
  preview: {select: {title: 'title', subtitle: 'provider'}},
})

import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'application',
  title: 'Application',
  type: 'document',
  description:
    'A single job application, shown on the website /applications tracker (Table + Board views, read-only). Set its stage via the `status` reference. Sorted newest-first by `lastUpdated`.',
  fields: [
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
      validation: (r) => r.required(),
      description: 'Role title — the primary text in the table row / board card.',
    }),
    defineField({name: 'city', title: 'City', type: 'string', description: 'e.g. London, San Francisco. Leave blank for fully remote roles.'}),
    defineField({name: 'country', title: 'Country', type: 'string', description: 'e.g. UK, USA.'}),
    defineField({
      name: 'mode',
      title: 'Work Mode',
      type: 'string',
      options: {list: ['Onsite', 'Hybrid', 'Remote'], layout: 'radio'},
      description: 'Onsite, Hybrid, or Remote.',
    }),
    defineField({name: 'jobLink', title: 'Job Posting URL', type: 'url'}),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'reference',
      to: [{type: 'platform'}],
      description: 'Where you applied from — pick an existing platform or create a new one inline.',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'reference',
      to: [{type: 'applicationStatus'}],
      validation: (r) => r.required(),
      description: 'The application stage — drives the badge colour, board column, and sorting.',
    }),
    defineField({name: 'hrNotes', title: 'HR Notes', type: 'text', rows: 2}),
    defineField({name: 'personalNotes', title: 'Personal Notes', type: 'text', rows: 2}),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      options: {dateFormat: 'YYYY-MM-DD'},
      validation: (r) => r.required(),
      description: 'Date of the last activity — the default sort key and the source for the Month filter.',
    }),
  ],
  orderings: [
    {title: 'Last updated, newest first', name: 'updatedDesc', by: [{field: 'lastUpdated', direction: 'desc'}]},
  ],
  preview: {select: {title: 'jobTitle', subtitle: 'company'}},
})

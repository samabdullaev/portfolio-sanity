import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  description:
    'A single certificate. Add it freely here, then add a reference to it inside the appropriate `certificateIssuer.certificates[]` array. Issuer membership and order both come from the array on the parent.',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'date', title: 'Date', type: 'string'}),
    defineField({name: 'image', title: 'Certificate Image', type: 'image'}),
    defineField({name: 'verifyUrl', title: 'Verify URL', type: 'url'}),
  ],
  preview: {select: {title: 'title', subtitle: 'date', media: 'image'}},
})

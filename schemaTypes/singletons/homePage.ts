import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  preview: {
    select: {title: 'name', subtitle: 'title', media: 'profileImage'},
    prepare: ({title, subtitle, media}) => ({
      title: title || 'Home Page',
      subtitle: subtitle || 'Hero, socials, and CTA',
      media,
    }),
  },
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({name: 'profileImage', title: 'Profile Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'socials', title: 'Social Links', type: 'array', of: [{type: 'socialLink'}]}),
    defineField({name: 'resumeFile', title: 'Resume File', type: 'file'}),
    defineField({name: 'ctaLabel', title: 'CTA Button Label', type: 'string'}),
    defineField({name: 'ctaUrl', title: 'CTA Button URL', type: 'string'}),
  ],
})

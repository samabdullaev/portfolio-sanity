import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  preview: {
    select: {title: 'siteTitle', subtitle: 'footerText'},
    prepare: ({title, subtitle}) => ({
      title: title || 'Site Settings',
      subtitle: subtitle || 'Global settings (footer, site title)',
    }),
  },
  fields: [
    defineField({name: 'siteTitle', title: 'Site Title', type: 'string'}),
    defineField({name: 'footerText', title: 'Footer Text', type: 'string'}),
  ],
})

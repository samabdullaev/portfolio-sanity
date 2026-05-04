import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'galleryVideo',
  title: 'Gallery Video',
  type: 'object',
  fields: [
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or Vimeo URL',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Optional caption (e.g. "Hackathon demo")',
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'videoUrl'},
    prepare({title, subtitle}) {
      return {title: title || 'Video', subtitle}
    },
  },
})

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
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Shown as the title in the full-screen modal.',
    }),
  ],
  preview: {
    select: {title: 'caption', subtitle: 'videoUrl'},
    prepare({title, subtitle}) {
      return {title: title || 'Video', subtitle}
    },
  },
})

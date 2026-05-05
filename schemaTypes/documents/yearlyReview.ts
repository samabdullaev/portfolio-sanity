import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'yearlyReview',
  title: 'Yearly Review',
  type: 'document',
  fields: [
    defineField({name: 'year', title: 'Year', type: 'number', validation: (r) => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', validation: (r) => r.required()}),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {hotspot: true},
      description: 'Cover image shown on the Reviews hub card; also leads the detail-page gallery.',
      fields: [
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: 'Shown as the title in the full-screen modal.',
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Shown as the title in the full-screen modal.',
            }),
          ],
        }),
      ],
      description: 'Extra images shown on the year detail page (after the thumbnail).',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({name: 'title', title: 'Title', type: 'string'}),
          defineField({name: 'items', title: 'Items', type: 'array', of: [{type: 'string'}]}),
        ],
        preview: {select: {title: 'title'}},
      })],
    }),
  ],
  preview: {select: {title: 'year', media: 'thumbnail'}},
})

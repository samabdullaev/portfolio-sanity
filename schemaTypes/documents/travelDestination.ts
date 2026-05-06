import {defineType, defineField, defineArrayMember} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
  name: 'travelDestination',
  title: 'Travel Destination',
  type: 'document',
  description: 'A travel destination (country or guide page). Drag to reorder in Studio — the website renders them in this order.',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (r) => r.required()}),
    defineField({name: 'flag', title: 'Flag Emoji', type: 'string'}),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
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
      description: 'Extra images shown on the destination detail page (after the thumbnail).',
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'object',
      fields: [
        defineField({name: 'citiesVisited', title: 'Cities Visited', type: 'array', of: [{type: 'string'}]}),
        defineField({name: 'accommodation', title: 'Accommodation', type: 'array', of: [{type: 'string'}]}),
      ],
    }),
    defineField({
      name: 'placesToTravel',
      title: 'Places to Travel',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({name: 'city', title: 'City', type: 'string'}),
          defineField({name: 'places', title: 'Places', type: 'array', of: [{type: 'string'}]}),
        ],
        preview: {select: {title: 'city'}},
      })],
    }),
    defineField({name: 'personalTips', title: 'Personal Tips', type: 'array', of: [{type: 'string'}]}),
    defineField({
      name: 'sections',
      title: 'Sections (for travel-tips page)',
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
    orderRankField({type: 'travelDestination'}),
  ],
  orderings: [orderRankOrdering],
  preview: {select: {title: 'title', media: 'thumbnail'}},
})

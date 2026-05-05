import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  preview: {
    select: {media: 'profileImage'},
    prepare: ({media}) => ({
      title: 'About Page',
      subtitle: 'Bio, contributions, and hobbies',
      media,
    }),
  },
  fields: [
    defineField({name: 'profileImage', title: 'Profile Image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'bioParagraphs',
      title: 'Bio Paragraphs',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({name: 'summary', title: 'Summary', type: 'text'}),
          defineField({name: 'expandedText', title: 'Expanded Text', type: 'text'}),
        ],
        preview: {select: {title: 'summary'}},
      })],
    }),
    defineField({
      name: 'contributions',
      title: 'Contributions',
      description:
        'Each item maps to a fixed slot in the About-page bento (LinkedIn, UzTech, GitHub, Publink, Medium, LeetCode — in that order). Order matters; reorder to swap slots.',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({name: 'title', title: 'Title', type: 'string'}),
          defineField({name: 'description', title: 'Description', type: 'text'}),
          defineField({name: 'url', title: 'URL', type: 'url'}),
          defineField({
            name: 'tag',
            title: 'Tag',
            type: 'string',
            description:
              'Short uppercase label on the bento card (e.g. SOCIAL, COMMUNITY, CODE, WRITING, PRACTICE).',
          }),
          defineField({
            name: 'subtitle',
            title: 'Subtitle (quote variant)',
            type: 'string',
            description: 'Small caption shown on the Quote bento card (Publink slot).',
          }),
          defineField({
            name: 'channelName',
            title: 'Channel Name (community variant)',
            type: 'string',
            description: 'Telegram-style channel handle on the Community bento card (e.g. @UzTechUK).',
          }),
          defineField({
            name: 'channelStatus',
            title: 'Channel Status (community variant)',
            type: 'string',
            description: 'Footer status text on the Community bento card (e.g. Active community).',
          }),
          defineField({
            name: 'activities',
            title: 'Activities (community variant)',
            type: 'array',
            of: [{type: 'string'}],
            description: 'Pill labels on the Community bento card (e.g. Events, Training, Projects).',
          }),
        ],
        preview: {select: {title: 'title', subtitle: 'description'}},
      })],
    }),
    defineField({
      name: 'hobbies',
      title: 'Hobbies',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({name: 'emoji', title: 'Emoji', type: 'string'}),
          defineField({name: 'label', title: 'Label', type: 'string'}),
        ],
        preview: {select: {title: 'label'}},
      })],
    }),
  ],
})

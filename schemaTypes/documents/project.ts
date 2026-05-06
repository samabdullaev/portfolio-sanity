import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  description:
    'A single project. Add it freely here, then assign it to a category by adding a reference inside `projectCategory.projects[]`. Order within a category comes from the array order on the parent.',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (r) => r.required()}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({name: 'about', title: 'About', type: 'text'}),
    defineField({name: 'features', title: 'Features', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'techStack', title: 'Tech Stack', type: 'array', of: [{type: 'string'}]}),
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
        {
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
        },
        {type: 'galleryVideo'},
      ],
      description: 'Mix of images and videos shown after the thumbnail on the detail page.',
    }),
    defineField({name: 'liveUrl', title: 'Live URL', type: 'url'}),
    defineField({name: 'githubUrl', title: 'GitHub URL', type: 'url'}),
  ],
  preview: {select: {title: 'title', media: 'thumbnail'}},
})

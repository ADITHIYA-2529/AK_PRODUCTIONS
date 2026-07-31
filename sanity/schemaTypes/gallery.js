import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),

    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),

    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: 'Square', value: 'square' },
          { title: 'Portrait', value: 'portrait' },
          { title: 'Landscape', value: 'landscape' },
        ],
      },
    }),

    defineField({
      name: 'altText',
      title: 'Alt Text (for accessibility)',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description (optional)',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 10,
    }),

    defineField({
      name: 'featured',
      title: 'Featured (showcase in home gallery)',
      type: 'boolean',
      initialValue: false,
    }),

    // Media Type
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      initialValue: 'image',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
    }),

    // Image
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ document }) => document?.mediaType === 'video',
    }),

    // Video
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({ document }) => document?.mediaType === 'image',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      mediaType: 'mediaType',
      image: 'image',
      video: 'video',
    },
    prepare(selection) {
      const { title, subtitle, mediaType, image } = selection

      return {
        title,
        subtitle: `${subtitle || ''} • ${mediaType || 'image'}`,
        media: image,
      }
    },
  },
})
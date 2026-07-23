import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event / Portfolio',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtitle / Tagline',
      type: 'string',
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Wedding', value: 'Wedding' },
          { title: 'Corporate', value: 'Corporate' },
          { title: 'Birthday', value: 'Birthday' },
          { title: 'Engagement', value: 'Engagement' },
          { title: 'Baby Shower', value: 'Baby Shower' },
          { title: 'Theme', value: 'Theme' },
          { title: 'Entertainment', value: 'Entertainment' },
          { title: 'School', value: 'School' },
        ],
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    defineField({
      name: 'guests',
      title: 'Guest Count',
      type: 'number',
    }),

    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'tags',
      title: 'Tags (e.g. Luxury, Floral, Traditional)',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'date',
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Past Event', value: 'past' },
          { title: 'Upcoming Event', value: 'upcoming' },
        ],
        layout: 'radio',
      },
      initialValue: 'past',
    }),

    defineField({
      name: 'featured',
      title: 'Featured (show as hero showcase)',
      type: 'boolean',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})

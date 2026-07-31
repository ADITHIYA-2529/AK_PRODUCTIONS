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
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
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
      name: 'bannerImage',
      title: 'Banner Image (for Event Detail hero)',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional large banner image for the event detail page. Falls back to Cover Image if not set.',
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
      name: 'date',
      title: 'Event Date',
      type: 'date',
    }),

    defineField({
      name: 'time',
      title: 'Event Time (e.g. 6:00 PM IST)',
      type: 'string',
    }),

    defineField({
      name: 'organizer',
      title: 'Organizer / Host',
      type: 'string',
    }),

    defineField({
      name: 'registrationDeadline',
      title: 'Registration Deadline (optional)',
      type: 'date',
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

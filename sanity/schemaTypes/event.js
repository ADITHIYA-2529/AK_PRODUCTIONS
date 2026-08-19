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
          { title: 'Custom', value: 'Custom' },
        ],
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'customCategory',
      title: 'Custom Category',
      type: 'string',
      description: 'Specify your custom category name when Category is set to Custom',
      hidden: ({ parent }) => parent?.category !== 'Custom',
      validation: Rule => Rule.custom((customCategory, context) => {
        if (context?.parent?.category === 'Custom' && (!customCategory || !customCategory.trim())) {
          return 'Custom Category is required when Category is set to Custom'
        }
        return true
      }),
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
      name: 'dateMode',
      title: 'Date Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Exact Date', value: 'exact' },
          { title: 'Month Only', value: 'month' },
        ],
        layout: 'radio',
      },
      initialValue: 'exact',
      description: 'Select whether the event has an exact day date or month/year only.',
    }),

    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'date',
      description: 'Select complete event date (required when Date Mode is Exact Date)',
      hidden: ({ parent }) => parent?.dateMode === 'month',
    }),

    defineField({
      name: 'eventMonth',
      title: 'Event Month',
      type: 'string',
      options: {
        list: [
          { title: 'January', value: 'January' },
          { title: 'February', value: 'February' },
          { title: 'March', value: 'March' },
          { title: 'April', value: 'April' },
          { title: 'May', value: 'May' },
          { title: 'June', value: 'June' },
          { title: 'July', value: 'July' },
          { title: 'August', value: 'August' },
          { title: 'September', value: 'September' },
          { title: 'October', value: 'October' },
          { title: 'November', value: 'November' },
          { title: 'December', value: 'December' },
        ],
      },
      hidden: ({ parent }) => parent?.dateMode !== 'month',
    }),

    defineField({
      name: 'eventYear',
      title: 'Event Year',
      type: 'number',
      description: 'e.g. 2026',
      hidden: ({ parent }) => parent?.dateMode !== 'month',
      validation: Rule => Rule.custom((eventYear, context) => {
        if (context?.parent?.dateMode === 'month' && !eventYear) {
          return 'Event Year is required when Date Mode is Month Only'
        }
        return true
      }),
    }),

    defineField({
      name: 'time',
      title: 'Event Time (e.g. 6:00 PM IST)',
      type: 'string',
      hidden: ({ parent }) => parent?.dateMode === 'month',
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
      title: 'Status (Legacy)',
      type: 'string',
      description: 'Note: Event Upcoming/Past status is automatically calculated on the website using the event date.',
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
      category: 'category',
      dateMode: 'dateMode',
      date: 'date',
      eventMonth: 'eventMonth',
      eventYear: 'eventYear',
      media: 'coverImage',
    },
    prepare({ title, category, dateMode, date, eventMonth, eventYear, media }) {
      const dateDisplay = dateMode === 'month' && eventMonth && eventYear
        ? `${eventMonth} ${eventYear}`
        : date || ''
      return {
        title,
        subtitle: `${category || ''}${dateDisplay ? ` • ${dateDisplay}` : ''}`,
        media,
      }
    },
  },
})

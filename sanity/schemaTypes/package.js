import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'package',
  title: 'Pricing Package',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Package Name (e.g. Gold)',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Bronze',   value: 'bronze'   },
          { title: 'Silver',   value: 'silver'   },
          { title: 'Gold',     value: 'gold'     },
          { title: 'Platinum', value: 'platinum' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'price',
      title: 'Starting Price (₹)',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),

    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'features',
      title: 'What\'s Included',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'notIncluded',
      title: 'What\'s NOT Included',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'popular',
      title: 'Mark as Popular / Recommended',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'icon',
      title: 'Icon / Symbol (e.g. ✦ ✧ ★ ✨)',
      type: 'string',
    }),

    defineField({
      name: 'order',
      title: 'Display Order (1 = first)',
      type: 'number',
      initialValue: 10,
    }),
  ],

  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],

  preview: {
    select: { title: 'name', subtitle: 'tier' },
  },
})

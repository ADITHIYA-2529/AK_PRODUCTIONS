import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',

  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Booking',      value: 'Booking'      },
          { title: 'Pricing',      value: 'Pricing'      },
          { title: 'Services',     value: 'Services'     },
          { title: 'Logistics',    value: 'Logistics'    },
          { title: 'Cancellation', value: 'Cancellation' },
          { title: 'General',      value: 'General'      },
        ],
      },
    }),

    defineField({
      name: 'order',
      title: 'Display Order (lower = first)',
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
    select: { title: 'question', subtitle: 'category' },
  },
})

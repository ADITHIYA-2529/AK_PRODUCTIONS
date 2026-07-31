import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Content',
  type: 'document',

  fields: [
    // ─── Hero Banner ──────────────────────────────────
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'ABOUT US',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
    }),

    // ─── Story Section ──────────────────────────────────
    defineField({
      name: 'title',
      title: 'Story Pretitle (e.g. "Who We Are")',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Story Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Story Description (separate paragraphs with double newline)',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'image',
      title: 'Hero / Banner Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      title: 'Story Images Grid (up to 4)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    // ─── Mission & Vision ───────────────────────────────
    defineField({
      name: 'missionTitle',
      title: 'Mission Card Title',
      type: 'string',
    }),
    defineField({
      name: 'missionText',
      title: 'Mission Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'visionTitle',
      title: 'Vision Card Title',
      type: 'string',
    }),
    defineField({
      name: 'visionText',
      title: 'Vision Text',
      type: 'text',
      rows: 3,
    }),

    // ─── Stats Counters ─────────────────────────────────
    defineField({
      name: 'eventsCount',
      title: 'Events Executed (number, e.g. 500)',
      type: 'number',
    }),
    defineField({
      name: 'teamCount',
      title: 'Team Members (number, e.g. 30)',
      type: 'number',
    }),
    defineField({
      name: 'guestsCount',
      title: 'Happy Guests (number, e.g. 50000)',
      type: 'number',
    }),
    defineField({
      name: 'yearsCount',
      title: 'Years in Chennai (number, e.g. 10)',
      type: 'number',
    }),

    // ─── Values ─────────────────────────────────────────
    defineField({
      name: 'values',
      title: 'Core Values (4 cards)',
      type: 'array',
      of: [
        {
          name: 'valueItem',
          title: 'Value Item',
          type: 'object',
          fields: [
            { name: 'title', title: 'Value Title', type: 'string' },
            {
              name: 'icon',
              title: 'Lucide Icon Name (e.g. Heart, Award, Shield, Clock)',
              type: 'string',
            },
            { name: 'desc', title: 'Description', type: 'text', rows: 2 },
          ],
          preview: {
            select: { title: 'title', subtitle: 'desc' },
          },
        },
      ],
    }),

    // ─── Timeline ───────────────────────────────────────
    defineField({
      name: 'timeline',
      title: 'Company Timeline',
      type: 'array',
      of: [
        {
          name: 'timelineItem',
          title: 'Timeline Milestone',
          type: 'object',
          fields: [
            { name: 'year', title: 'Year (e.g. 2015)', type: 'string' },
            { name: 'title', title: 'Milestone Title', type: 'string' },
            { name: 'desc', title: 'Description', type: 'text', rows: 2 },
          ],
          preview: {
            select: { title: 'year', subtitle: 'title' },
          },
        },
      ],
    }),

    // ─── Team ───────────────────────────────────────────
    defineField({
      name: 'team',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          name: 'teamMember',
          title: 'Team Member',
          type: 'object',
          fields: [
            { name: 'name', title: 'Full Name', type: 'string' },
            { name: 'role', title: 'Role / Title', type: 'string' },
            { name: 'bio', title: 'Short Bio', type: 'text', rows: 2 },
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { title: 'name', subtitle: 'role', media: 'image' },
          },
        },
      ],
    }),

    // ─── CTA Section ────────────────────────────────────
    defineField({
      name: 'ctaTitle',
      title: 'CTA Heading',
      type: 'string',
    }),
    defineField({
      name: 'ctaSubtitle',
      title: 'CTA Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
    }),
  ],
})

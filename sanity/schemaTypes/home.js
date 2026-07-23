import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',

  fields: [
    // ─── Hero ───────────────────────────────────────────
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),

    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'heroDescription',
      title: 'Hero Description (main paragraph)',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'heroButtonText',
      title: 'Hero Primary Button Text',
      type: 'string',
    }),

    defineField({
      name: 'heroImage',
      title: 'Hero Image (used as video poster)',
      type: 'image',
      options: { hotspot: true },
    }),

    // ─── Stats Strip ────────────────────────────────────
    defineField({
      name: 'eventsCount',
      title: 'Events Completed (e.g. 500+)',
      type: 'string',
    }),

    defineField({
      name: 'clientsCount',
      title: 'Happy Clients (e.g. 1500+)',
      type: 'string',
    }),

    defineField({
      name: 'yearsCount',
      title: 'Years Experience (e.g. 10+)',
      type: 'string',
    }),

    defineField({
      name: 'teamCount',
      title: 'Team Size (e.g. 25+)',
      type: 'string',
    }),

    // ─── About Preview ──────────────────────────────────
    defineField({
      name: 'aboutPreviewText',
      title: 'About Preview — Paragraph 1',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'aboutPreviewText2',
      title: 'About Preview — Paragraph 2',
      type: 'text',
      rows: 3,
    }),
  ],
})

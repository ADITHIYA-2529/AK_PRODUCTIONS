import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Wedding', value: 'Wedding' },
          { title: 'Celebration', value: 'Celebration' },
          { title: 'Corporate', value: 'Corporate' },
          { title: 'Decoration', value: 'Decoration' },
          { title: 'Education', value: 'Education' },
          { title: 'Media', value: 'Media' },
          { title: 'Entertainment', value: 'Entertainment' },
          { title: 'Technical', value: 'Technical' },
          { title: 'Food & Beverage', value: 'Food & Beverage' },
          { title: 'Planning', value: 'Planning' },
        ],
      },
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name (Lucide)',
      type: 'string',
      description: 'Lucide icon identifier, e.g., Heart, Gem, Star, Cake, Baby, Sparkles, Palette, Briefcase, GraduationCap, University, Camera, Film, Music, Zap, ChefHat, ClipboardList',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'features',
      title: 'Features List',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'startingPrice',
      title: 'Starting Price',
      type: 'number',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      description: 'Lower numbers appear first (e.g. 1 = first, 10 = last). Default is 10.',
      type: 'number',
      initialValue: 10,
    }),

    defineField({
      name: 'featured',
      title: 'Featured (Show on Home Page Specialties)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})

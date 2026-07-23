import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Information',
  type: 'document',

  fields: [
    defineField({
      name: 'officeName',
      title: 'Primary Office Name',
      type: 'string',
      initialValue: 'AK Productions Headquarters',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'string',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps Link',
      type: 'url',
    }),
    defineField({
      name: 'workingHours',
      title: 'Working Hours',
      type: 'string',
      initialValue: 'Mon – Sun · 9 AM – 9 PM',
    }),

    // Banners & Images
    defineField({
      name: 'heroImage',
      title: 'Contact Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'contactBanner',
      title: 'Contact Banner Image',
      type: 'image',
      options: { hotspot: true },
    }),

    // Social Channels
    defineField({
      name: 'instagramUsername',
      title: 'Instagram Username',
      type: 'string',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'facebookName',
      title: 'Facebook Page Name',
      type: 'string',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'twitterUrl',
      title: 'X / Twitter URL',
      type: 'url',
    }),

    // Multiple Offices Support
    defineField({
      name: 'offices',
      title: 'Additional Office Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'officeName', title: 'Office Name', type: 'string' },
            { name: 'address', title: 'Address', type: 'string' },
            { name: 'phone', title: 'Phone', type: 'string' },
            { name: 'email', title: 'Email', type: 'string' },
            { name: 'googleMapsUrl', title: 'Google Maps URL', type: 'url' },
            { name: 'workingHours', title: 'Working Hours', type: 'string' },
          ],
        },
      ],
    }),
  ],
})

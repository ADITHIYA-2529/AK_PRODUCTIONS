import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',

  // Singleton — only update allowed (no create/delete/duplicate)
  __experimental_actions: ['update', 'publish'],

  groups: [
    { name: 'logos',    title: '🖼️ Logo & Branding' },
    { name: 'heroes',   title: '🌄 Hero Banners'     },
    { name: 'seo',      title: '🔍 SEO & Social'     },
  ],

  fields: [
    // ─── Logo & Branding ────────────────────────────────────────
    defineField({
      name: 'navbarLogo',
      title: 'Navbar Logo',
      description: 'Logo shown in the top navigation bar.',
      type: 'image',
      group: 'logos',
      options: { hotspot: true },
    }),

    defineField({
      name: 'footerLogo',
      title: 'Footer Logo',
      description: 'Logo shown in the site footer.',
      type: 'image',
      group: 'logos',
      options: { hotspot: true },
    }),

    defineField({
      name: 'favicon',
      title: 'Favicon',
      description: 'Browser tab icon (recommended: 32×32 or 64×64 PNG/ICO).',
      type: 'image',
      group: 'logos',
      options: { hotspot: true },
    }),

    // ─── Hero Banners ───────────────────────────────────────────
    defineField({
      name: 'homeHeroImage',
      title: 'Home Hero Image',
      description: 'Background image for the Home page hero section.',
      type: 'image',
      group: 'heroes',
      options: { hotspot: true },
    }),

    defineField({
      name: 'aboutHeroImage',
      title: 'About Hero Image',
      description: 'Background image for the About page hero banner.',
      type: 'image',
      group: 'heroes',
      options: { hotspot: true },
    }),

    defineField({
      name: 'servicesHeroImage',
      title: 'Services Hero Image',
      description: 'Background image for the Services page hero banner.',
      type: 'image',
      group: 'heroes',
      options: { hotspot: true },
    }),

    defineField({
      name: 'galleryHeroImage',
      title: 'Gallery Hero Image',
      description: 'Background image for the Gallery page hero banner.',
      type: 'image',
      group: 'heroes',
      options: { hotspot: true },
    }),

    defineField({
      name: 'contactHeroImage',
      title: 'Contact Hero Image',
      description: 'Background image for the Contact page hero banner.',
      type: 'image',
      group: 'heroes',
      options: { hotspot: true },
    }),

    // ─── SEO & Social ───────────────────────────────────────────
    defineField({
      name: 'defaultSeoImage',
      title: 'Default SEO Image',
      description: 'Fallback Open Graph / meta image for search engines (recommended: 1200×630).',
      type: 'image',
      group: 'seo',
      options: { hotspot: true },
    }),

    defineField({
      name: 'socialShareImage',
      title: 'Social Share Image',
      description: 'Image used when sharing on social media platforms (Twitter, Facebook, WhatsApp).',
      type: 'image',
      group: 'seo',
      options: { hotspot: true },
    }),
  ],

  preview: {
    select: {
      media: 'navbarLogo',
    },
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Logo · Hero Banners · SEO Images',
      }
    },
  },
})

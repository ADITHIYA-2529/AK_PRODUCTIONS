/**
 * AK Productions – Custom Studio Structure Configuration
 *
 * Matching the exact navigation structure from the reference screenshot:
 * - Gallery Showcase
 * - About & Story
 * - FAQ
 * - Event Packages
 * - Contact Details
 * - Hero Banner
 * - Site Settings
 */

export const deskStructure = (S) =>
  S.list()
    .title('AK Productions')
    .items([
      // 🎪 Events & Portfolio section
      S.listItem()
        .title('Events & Portfolio')
        .icon(() => '🎪')
        .child(
          S.list()
            .title('Events Management')
            .items([
              S.listItem()
                .title('All Events')
                .icon(() => '📋')
                .child(S.documentTypeList('event').title('All Events')),
              S.listItem()
                .title('⭐ Featured Showcase')
                .icon(() => '⭐')
                .child(
                  S.documentTypeList('event')
                    .title('Featured Events')
                    .filter('_type == "event" && featured == true')
                ),
              S.listItem()
                .title('📅 Upcoming Events')
                .icon(() => '📅')
                .child(
                  S.documentTypeList('event')
                    .title('Upcoming Events')
                    .filter('_type == "event" && status == "upcoming"')
                ),
            ])
        ),

      S.divider(),

      // 🖼️ Gallery Showcase
      S.listItem()
        .title('Gallery Showcase')
        .icon(() => '🖼️')
        .child(S.documentTypeList('gallery').title('Gallery Showcase')),

      // 📖 About & Story
      S.listItem()
        .title('About & Story')
        .icon(() => '📖')
        .child(S.documentTypeList('about').title('About & Story')),

      // 💬 FAQ
      S.listItem()
        .title('FAQ')
        .icon(() => '💬')
        .child(S.documentTypeList('faq').title('FAQ')),

      // 📦 Event Packages
      S.listItem()
        .title('Event Packages')
        .icon(() => '📦')
        .child(S.documentTypeList('package').title('Event Packages')),

      // ✉️ Contact Details
      S.listItem()
        .title('Contact Details')
        .icon(() => '✉️')
        .child(S.documentTypeList('contact').title('Contact Details')),

      // ☀️ Hero Banner
      S.listItem()
        .title('Hero Banner')
        .icon(() => '☀️')
        .child(S.documentTypeList('hero').title('Hero Banner')),

      S.divider(),

      // ⚙️ Site Settings
      S.listItem()
        .title('Site Settings')
        .icon(() => '⚙️')
        .child(S.documentTypeList('siteSettings').title('Site Settings')),
    ])

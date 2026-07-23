import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'hero',
    title: 'Hero Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string'
        }),
        defineField({
            name: 'image',
            title: 'Hero Image',
            type: 'image',
            options: {
                hotspot: true
            }
        })
    ]
})
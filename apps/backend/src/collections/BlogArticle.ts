import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
export const Articles: CollectionConfig = {
  slug: 'articles',

  versions: {
    drafts: {
      autosave: {
        interval: 8000, // Time in ms between saves (default is 8000)
      },
    },
    maxPerDoc: 50,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', maxLength: 65, label: 'Main Heading', required: true },
    { name: 'short_quote', type: 'text', maxLength: 65, label: 'Short Quote', required: true },
    {
      name: 'tags',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'tag',
          type: 'text',
          maxLength: 40,
          required: false,
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    slugField({
      name: 'slug',
      useAsSlug: 'title',
      required: true,
    }),
    {
      name: 'text',
      type: 'richText',
      label: 'Article',
      editor: lexicalEditor({}),
      required: true,
    },
    {
      name: 'cover_image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

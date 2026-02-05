import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const SEOPages: CollectionConfig = {
  slug: 'seo-pages',
  admin: {
    useAsTitle: 'page_title',
    defaultColumns: ['page_title', 'page_description', 'slug', 'status', 'updatedAt'],
    group: 'SEO',
  },
  fields: [
    {
      name: 'page_title',
      type: 'text',
      required: true,
      label: 'Page Title',
    },
    slugField({
      name: 'slug',
      useAsSlug: 'page_title',
    }),
    {
      name: 'page_description',
      type: 'text',
      required: true,
      label: 'Page Description',
      maxLength: 150,
    },

    {
      name: 'og_image',
      type: 'upload',
      relationTo: 'media',
      label: 'OG Image',
    },
  ]
}
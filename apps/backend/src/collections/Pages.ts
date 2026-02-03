import type { CollectionConfig } from 'payload'

export const SEOPages: CollectionConfig = {
  slug: 'seo-pages',
  admin: {
    useAsTitle: 'page_description',
    defaultColumns: ['page_description', 'slug', 'status', 'updatedAt'],
    group: 'Content',
  },
  fields: [
    {
      name: 'page_title',
      type: 'text',
      required: true,
      label: 'Page Title',
    },
    {
      name: 'page_description',
      type: 'text',
      required: true,
      label: 'Page Description',

    },
    {
      name: 'page_keywords',
      type: "text",
      required: true,
      label: 'Keywords',
    },
    {
      name: 'default_og_image',
      type: "text",
      required: true,
      label: 'Keywords',
    },
    {
      name: 'og_image',
      type: 'upload',
      relationTo: 'media',
      label: 'OG Image',
    },
  ]
}
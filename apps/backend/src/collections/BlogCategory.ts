import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    group: "Content"
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 50,
    },
    slugField({
      name: 'slug',
      useAsSlug: 'name',
      required: true,
    }),
  ],
}

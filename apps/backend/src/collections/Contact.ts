import type { CollectionConfig } from 'payload'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'companyName', 'createdAt'],
  },
  access: {
    create: () => true, // Allow public submissions
    read: ({ req: { user } }) => !!user, // Only authenticated users can read
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      validate: (val: string | null | undefined) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!val) {
          return 'Enter a valid email'
        }
        return emailRegex.test(val) ? true : 'Enter a valid email'
      },
    },
    {
      name: 'companyName',
      type: 'text',
      required: false, // Optional but validated if present
      validate: (val: string | null | undefined) => {
        if (val && val.length < 2) return 'Company Name must be at least 2 characters'
        return true
      },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: false,
      validate: (val: string | null | undefined) => {
        if (!val) return true
        const phoneRegex = /^[0-9+\-\s()]{7,}$/
        return phoneRegex.test(val) ? true : 'Enter a valid phone number'
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: false,
      validate: (val: string | null | undefined) => {
        if (val && val.length < 5) return 'Message must be at least 5 characters'
        return true
      },
    },
  ],
  timestamps: true,
}

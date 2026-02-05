import { GlobalConfig } from 'payload'
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'basic_settings',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              maxLength: 50,
            },
            {
              name: 'tagline',
              type: 'text',
              required: true,
              maxLength: 50,
            },
            {
              name: 'cta_tagline',
              type: 'text',
              required: true,
              maxLength: 60,
              label: "CTA Tagline",
              defaultValue: ""
            },

            {
              name: 'description',
              type: 'textarea',
              required: true,
              maxLength: 100,
            },

            {
              name: 'contact',
              type: 'group',
              fields: [
                {
                  name: 'address',
                  type: 'group',
                  required: true,
                  fields: [
                    {
                      name: 'address_line_1',
                      type: 'text',
                    },
                    {
                      name: 'address_line_2',
                      type: 'text',
                    },
                    {
                      name: 'address_line_3',
                      type: 'text',
                    },
                    {
                      name: 'map_link',
                      type: 'text',
                    },
                  ],
                },

                {
                  name: 'contact_email',
                  type: 'email',
                  required: true,
                },
                {
                  name: 'phone_number_1',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'phone_number_2',
                  type: 'text',
                },
                {
                  name: 'career_email',
                  type: 'email',
                },
                {
                  name: 'support_email',
                  type: 'email',
                },
              ],
            },
          ],
        },
        {
          name: 'page_seo',
          fields: [
            {
              name: 'site_name',
              type: 'text',
              maxLength: 100,
            },
            {
              name: 'title_suffix',
              type: 'text',
              maxLength: 20,
            },
            {
              name: 'default_title',
              type: 'text',
              maxLength: 60,
            },
            {
              name: 'default_keywords',
              type: 'text',
              required: true,
            },
            {
              name: 'default_og_image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              type: 'group',
              name: 'analytics',
              fields: [
                {
                  name: 'google_tags_scripts',
                  type: 'text',
                },
                {
                  name: 'google_tags_key',
                  type: 'text',
                  maxLength: 40,
                },
                {
                  name: 'ahref_id',
                  type: 'text',
                  maxLength: 40,
                },
              ],
            },
          ],
        },
        {
          name: 'social_media',
          fields: [
            {
              name: 'facebook',
              type: 'text',
            },
            {
              name: 'instagram',
              type: 'text',
            },
            {
              name: 'linkedin',
              type: 'text',
            },
            {
              name: 'x',
              type: 'text',
            },
            {
              name: 'whatsapp',
              type: 'text',
            },
            {
              name: 'tiktok',
              type: 'text',
            },
            {
              name: 'youtube',
              type: 'text',
            },
            {
              name: 'pinterest',
              type: 'text',
            },
            {
              name: 'threads',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}

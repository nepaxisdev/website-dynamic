import { config as dotenvConfig } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Load .env from monorepo root
dotenvConfig({ path: path.resolve(dirname, '../../../.env') });

import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';
import { buildConfig } from 'payload';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Categories } from './collections/BlogCategory';
import { Articles } from './collections/BlogArticle';
import { SiteSettings } from './global/SiteSetttings';

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories, Articles],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PRIVATE_PAYLOAD_SECRET!,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.PRIVATE_DATABASE_URI!,
    },
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['articles', ''],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc.title} | Nepaxis`,
      generateDescription: ({ doc }) => doc.short_quote,
      generateImage: ({ doc }) => doc.cover_image,
    }),
  ],
});
import { getPayloadClient } from '$lib/server/payload';
import type { RequestHandler } from './$types';
import { PUBLIC_CLIENT_URL as siteUrl } from '$env/static/public';
import type { Article, SeoPage } from '$backend/src/payload-types';

export const GET: RequestHandler = async () => {
	const payload = await getPayloadClient();

	// 1. Fetch data from all relevant collections
	const [articles, seoPages] = await Promise.all([
		payload.find({
			collection: 'articles',
			limit: 1000,
			select: { slug: true, updatedAt: true },
			where: {
				'meta.prevent_indexing': {
					not_equals: true,
				},
			},
		}),
		payload.find({
			collection: 'seo-pages',
			limit: 100,
			select: { slug: true, updatedAt: true },
			where: {
				'meta.prevent_indexing': {
					not_equals: true,
				},
			},
		}),
	]);

	// 2. Map docs to URL objects
	const articleEntries = articles.docs.map((doc: Article) => ({
		loc: `${siteUrl}/blog/${doc.slug}`,
		lastmod: new Date(doc.updatedAt).toISOString().split('T')[0],
		priority: '0.7',
	}));

	const pageEntries = seoPages.docs.map((doc: SeoPage) => ({
		// Use empty string for home if slug is 'home' or similar
		loc: `${siteUrl}/${doc.slug === 'home' ? '' : doc.slug}`,
		lastmod: new Date(doc.updatedAt).toISOString().split('T')[0],
		priority: '1.0',
	}));

	const allEntries = [...pageEntries, ...articleEntries];

	// 3. Generate XML string
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allEntries
			.map(
				(entry) => `
    <url>
      <loc>${entry.loc}</loc>
      <lastmod>${entry.lastmod}</lastmod>
      <priority>${entry.priority}</priority>
    </url>`
			)
			.join('')}
</urlset>`.trim();

	// 4. Return response with correct Content-Type
	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=0, s-maxage=3600', // Cache for 1 hour
		},
	});
};
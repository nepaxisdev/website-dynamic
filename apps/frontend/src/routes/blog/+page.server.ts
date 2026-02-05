import type { PageServerLoad } from './$types';
import { getPayloadClient } from '$lib/server/payload';
import config from '$lib/config';
import type { SeoPage } from '$backend/src/payload-types';

const SERVER_SORT_CODES = [
	{
		client: 'latest',
		server: '-createdAt'
	},
	{
		client: 'oldest',
		server: 'createdAt'
	},
	{
		client: 'alpha-asc',
		server: 'title'
	},
	{
		client: 'alpha-desc',
		server: '-title'
	}
];

export const load: PageServerLoad = async ({ url }) => {
	const PERMALINK = "blog";

	const page = url.searchParams.get('page') || '1';
	let sort = url.searchParams.get('sort') || config.blog.sorting;
	const query = url.searchParams.get('query') || '';
	const category = url.searchParams.get('category') || '';

	const payload = await getPayloadClient();

	let sort_search_res = SERVER_SORT_CODES.find((emt) => {
		return emt.client === sort;
	});
	if (sort_search_res === undefined) {
		sort_search_res = SERVER_SORT_CODES.find((emt) => {
			return emt.client === config.blog.sorting;
		});

		sort = config.blog.sorting;
	}
	const whereClause = {
		and: [
			{ _status: { equals: 'published' } },
			// 1. Mandatory Category Filter (if selected)
			...(category && category !== '' ? [{ 'category.slug': { equals: category } }] : []),

			// 2. Search Query Filter (Title OR Tags)
			...(query
				? [
					{
						or: [
							{ title: { contains: query } },
							{ 'tags.tag': { contains: query } } // Note: your schema field is 'tag' inside 'tags'
						]
					}
				]
				: [])
		]
	};
	const result = await payload.find({
		collection: 'articles',
		sort: sort_search_res!.server,
		select: {
			title: true,
			slug: true,
			createdAt: true,
			cover_image: {
				url: true,
				alt: true,
				sizes: {
					thumbnail: true
				}
			},
			tags: true,
			category: true
		},
		where: whereClause,
		pagination: {
			limit: config.blog.articlesPerPage
		}
	});

	const categories = await payload.find({
		collection: 'categories'
	});

	const page_seo = await payload.find({
		collection: "seo-pages",
		where: {
			slug: {
				equals: PERMALINK
			},
			limit: 1,
		}
	})

	return {
		page_seo: page_seo.docs[0] as SeoPage,
		categories: categories.docs,
		articles: result,
		sorting_mode: sort,
		query,
		category
	};
};

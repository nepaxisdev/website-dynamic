import type { PageServerLoad } from './$types';
import { getPayloadClient } from '$lib/payload';
import config from '$lib/config';

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
		},
		page: page
	});

	// const usedIds = [
	// 	...new Set(
	// 		result.docs.map((doc: Article) => {
	// 			if (typeof doc.category == 'number') {
	// 				return doc.category;
	// 			} else {
	// 				return doc.category.id;
	// 			}
	// 		})
	// 	)
	// ];
	const categories = await payload.find({
		collection: 'categories'
	});

	return {
		categories: categories.docs,
		articles: result,
		sorting_mode: sort,
		query,
		category
	};
};

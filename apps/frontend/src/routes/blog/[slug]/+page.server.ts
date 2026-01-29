import { getPayloadClient } from '$lib/payload';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const payload = await getPayloadClient();
	const data = await payload.find({
		collection: 'articles',
		where: {
			slug: {
				equals: params.slug
			}
		},
		pagination: {
			limit: 1
		}
	});

	return { article: data.docs[0] };
};

import type { PageServerLoad } from './$types';
import { getPayloadClient } from '$lib/server/payload';
import type { SeoPage } from '$backend/src/payload-types';


export const load: PageServerLoad = async () => {
	const PERMALINK = "home";
	const payload = await getPayloadClient();

	const result = await payload.find({
		collection: 'seo-pages',
		where: {
			slug: {
				equals: PERMALINK
			},
			limit: 1,
		}
	});

	return {
		page_seo: result.docs[0] as SeoPage,
	};
};

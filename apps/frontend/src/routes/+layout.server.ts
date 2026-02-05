import type { LayoutServerLoad } from './$types';
import { getPayloadClient } from '$lib/server/payload';

export const load: LayoutServerLoad = async ({ }) => {

	const payload = await getPayloadClient();

	const result = await payload.findGlobal({
		slug: 'site-settings',
		depth: 2,
	});


	return {
		siteSettings: result
	};
};

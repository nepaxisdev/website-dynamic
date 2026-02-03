import { getPayload } from 'payload';
import config from '$backend/src/payload.config';

let cached: any = null;

export async function getPayloadClient() {
	if (cached) return cached;

	cached = await getPayload({ config });
	return cached;
}
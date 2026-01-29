import { getPayload } from 'payload';
import config from '$backend/src/payload.config';

let cached: any = null;

export async function getPayloadClient() {
	if (cached) return cached;
	try {
		cached = await getPayload({ config });
		return cached;
	} catch (e: any) {
		console.error(`${e}`);
	}
}

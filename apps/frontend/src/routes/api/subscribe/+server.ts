import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PRIVATE_MAILCHIMP_API_KEY, PRIVATE_AUDIENCE_KEY } from "$env/static/private";

interface SubscribeBody {
	email: string;
}

export const POST: RequestHandler = async ({ request }) => {

	// These variables are loaded securely from Vercel's environment settings.
	const MAILCHIMP_API_KEY = PRIVATE_MAILCHIMP_API_KEY!;
	const AUDIENCE_ID = PRIVATE_AUDIENCE_KEY!;

	// Validate environment variables
	if (!MAILCHIMP_API_KEY || !AUDIENCE_ID) {
		console.error('Missing Mailchimp credentials');
		error(500, 'Server configuration error');
	}

	try {
		const body = (await request.json()) as SubscribeBody;
		const { email } = body;

		if (!email) {
			return json({ message: 'Email is required' }, { status: 400 });
		}

		// Extract data center from API key
		const DC = MAILCHIMP_API_KEY.split('-')[1];
		const MAILCHIMP_URL = `https://${DC}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

		// Create Basic Auth header
		const authString = `apikey:${MAILCHIMP_API_KEY}`;
		const encodedAuth = Buffer.from(authString).toString('base64');

		const response = await fetch(MAILCHIMP_URL, {
			method: 'POST',
			headers: {
				Authorization: `Basic ${encodedAuth}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email_address: email,
				status: 'subscribed'
			})
		});

		const data = await response.json();

		if (response.ok) {
			return json({ message: 'Successfully subscribed!', member: data }, { status: 200 });
		} else {
			// Return Mailchimp error response
			return json(data, { status: response.status });
		}
	} catch (e) {
		console.error('Subscription error:', e);
		return json(
			{
				message: 'Internal Server Error',
				error: (e as Error).message
			},
			{ status: 500 }
		);
	}
};

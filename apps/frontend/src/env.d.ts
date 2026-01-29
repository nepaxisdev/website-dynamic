declare module '$env/static/private' {
	export const PRIVATE_DATABASE_URI: string;
	export const PRIVATE_PAYLOAD_SECRET: string;
	export const WEB3FORMS_ACCESS_KEY: string;
}
declare module '$env/dynamic/private' {
	export const PRIVATE_DATABASE_URI: string;
	export const PRIVATE_PAYLOAD_SECRET: string;
	export const WEB3FORMS_ACCESS_KEY: string;
}

declare module '$env/static/public' {
	export const PUBLIC_API_URL: string;
	export const WEB3FORMS_ACCESS_KEY: string;
}
declare module '$env/dynamic/public' {
	export const PUBLIC_API_URL: string;
	export const WEB3FORMS_ACCESS_KEY: string;
}

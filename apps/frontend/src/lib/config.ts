import { PUBLIC_API_URL } from '$env/static/public';

export default {
	uri: PUBLIC_API_URL,
	blog: {
		articlesPerPage: 10,
		sorting: '-createdAt'
	}
};

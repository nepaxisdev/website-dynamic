import { getPayload } from 'payload';
import config from '@payload-config';

const seed = async () => {
	const payload = await getPayload({ config });

	const userData = {
		email: 'nepaxisdev@gmail.com',
		password: 'apple123',
		role: 'admin', // Ensure this role exists in your User collection schema
	};

	try {
		payload.logger.info('Checking for existing admin user...');

		// 1. Check if user already exists
		const existingUsers = await payload.find({
			collection: 'users',
			where: {
				email: { equals: userData.email },
			},
		});

		if (existingUsers.totalDocs > 0) {
			payload.logger.warn(`User with email ${userData.email} already exists. Skipping seed.`);
			return;
		}

		// 2. Create the user
		payload.logger.info(`Seeding admin user: ${userData.email}`);
		await payload.create({
			collection: 'users',
			data: userData,
		});

		payload.logger.info('Seed completed successfully.');
	} catch (error: unknown) {
		// 3. Proper error handling
		const message = error instanceof Error ? error.message : 'Unknown error';
		payload.logger.error(`Seed failed: ${message}`);
		process.exit(1); // Exit with failure code for CI/CD pipelines
	}
};

await seed();
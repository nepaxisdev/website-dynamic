import { getPayload } from 'payload';
import config from '@payload-config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadMediaAsset = async (payload: any, relativePath: string, altText: string) => {
	const filePath = path.resolve(__dirname, relativePath);

	if (!fs.existsSync(filePath)) {
		payload.logger.error(`File not found at: ${filePath}`);
		return null;
	}

	const fileStats = fs.statSync(filePath);
	const fileBuffer = fs.readFileSync(filePath);

	try {
		// Check if it already exists to avoid duplicates
		const existing = await payload.find({
			collection: 'media',
			where: {
				filename: { equals: path.basename(filePath) },
			},
		});

		if (existing.totalDocs > 0) {
			payload.logger.info(`Asset ${path.basename(filePath)} already exists. Using existing.`);
			return existing.docs[0].id;
		}

		// Create the media document
		const mediaDoc = await payload.create({
			collection: 'media',
			data: {
				alt: altText,
			},
			file: {
				data: fileBuffer,
				name: path.basename(filePath),
				size: fileStats.size,
				mimetype: 'image/jpeg', // Adjust based on your asset type
			},
		});

		payload.logger.info(`Successfully uploaded: ${mediaDoc.filename}`);
		return mediaDoc.id;
	} catch (error) {
		payload.logger.error(`Failed to upload asset: ${error instanceof Error ? error.message : 'Unknown error'}`);
		return null;
	}
};

const seedSiteSettings = async () => {
	const payload = await getPayload({ config })

	try {
		payload.logger.info('Seeding Site Settings...')

		// 1. Get an image ID for the required OG Image field
		const ogImageId = await uploadMediaAsset(payload, './seed-og.png', 'Default Site OG Image');
		if (!ogImageId) {
			payload.logger.error('Could not seed media. Aborting Global seed.');
			return;
		}



		// 2. Update Global
		await payload.updateGlobal({
			slug: 'site-settings',
			data: {
				// Tab: basic_settings
				basic_settings: {
					name: 'Nepaxis Technologies llc',
					tagline: 'Empowering your digital journey.',
					cta_tagline: "Start your digital transformation us!",
					description: "Empowering your digital journey.",
					contact: {
						address: {
							address_line_1: 'RAG Global Business Hub ',
							address_line_2: 'Al Qusais 2, 102-36 ',
							address_line_3: ' Dubai, United Arab Emirates ',
						},
						contact_email: 'hi@nepaxis.com',
						phone_number_1: '+971561448979',
						career_email: 'hr@nepaxis.com',
						support_email: 'support@nepaxis.com',
					},
				},
				// Tab: page_seo
				page_seo: {
					site_name: 'Nepaxis',
					title_suffix: ' | Nepaxis',
					default_title: 'Nepaxis Technologies llc | Empowering your digital journey',
					default_keywords: "IT Company of Dubai and Nepal",
					default_og_image: ogImageId, // Required field
				},
				// Tab: social_media
				social_media: {
					facebook: 'https://www.facebook.com/profile.php?id=61583287982556',
					instagram: 'https://www.instagram.com/nepaxis',
					linkedin: 'https://www.linkedin.com/company/nepaxis/',
					x: 'https://x.com/nepaxis',
					whatsapp: 'https://wa.me/971561448979',
				}
			},
		})

		payload.logger.info('Site Settings seeded successfully.')
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : 'Unknown error'
		payload.logger.error(`Site Settings seed failed: ${message}`)
		process.exit(1)
	}
}

await seedSiteSettings()
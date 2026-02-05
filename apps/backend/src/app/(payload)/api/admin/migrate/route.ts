import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(req: Request) {
	const token = req.headers.get('x-migration-token')

	if (token !== process.env.MIGRATION_TOKEN) {
		return Response.json({ error: 'Unauthorized' }, { status: 401 })
	}

	try {
		const payload = await getPayload({ config: configPromise })

		// Run migrations
		await payload.db.migrate()

		return Response.json({
			success: true,
			message: 'Migration completed'
		})
	} catch (error: any) {
		console.error('Migration failed:', error)
		return Response.json({
			error: error.message,
			details: error.stack
		}, { status: 500 })
	}
}
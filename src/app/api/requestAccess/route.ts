
import { NextRequest } from 'next/server';
import { MongoClient } from 'mongodb';


// sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB!;

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { name, email, type } = body;
		if (!name || !email || !type) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
		}

		// Save to MongoDB
		try {
			const client = await MongoClient.connect(MONGODB_URI);
			const db = client.db(MONGODB_DB);
			await db.collection('request_access_submissions').insertOne({
				name, email, type, date: new Date()
			});
			client.close();
		} catch (error) {
			return new Response(JSON.stringify({ error: 'Error saving to database', details: error }), { status: 500 });
		}

		// Send email with SendGrid
		// try {
		// 	await sgMail.send({
		// 		to: ADMIN_EMAIL,
		// 		from: FROM_EMAIL,
		// 		subject: `Request Access: ${type}`,
		// 		text: `Name: ${name}\nEmail: ${email}\nDocument Type: ${type}`,
		// 	});
		// } catch (error) {
		// 	console.error('SENDGRID ERROR:', error);
		// 	return new Response(JSON.stringify({ error: 'Error sending email', details: error }), { status: 500 });
		// }

		return new Response(JSON.stringify({ message: 'Request submitted successfully' }), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Invalid request', details: error }), { status: 400 });
	}
}

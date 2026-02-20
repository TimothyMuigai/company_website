import { NextRequest } from 'next/server';
import { MongoClient } from 'mongodb';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL!;

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { fullName, email, phoneNumber, company } = body;
		if (!fullName || !email || !phoneNumber || !company) {
			return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
		}

		// Save to MongoDB
		try {
			const client = await MongoClient.connect(MONGODB_URI);
			const db = client.db(MONGODB_DB);
			await db.collection('book_demo_submissions').insertOne({
				fullName, email, phoneNumber, company, date: new Date()
			});
			client.close();
		} catch (error) {
			return new Response(JSON.stringify({ message: 'Error saving to database', error }), { status: 500 });
		}

		// Send email with SendGrid
		try {
			await sgMail.send({
				to: ADMIN_EMAIL,
				from: FROM_EMAIL,
				subject: 'Demo Request',
				text: `Full Name: ${fullName}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nCompany: ${company}`,
			});
		} catch (error) {
			 console.error("API ERROR:", error);
			return new Response(JSON.stringify({ message: 'Error sending email', error }), { status: 500 });
		}

		return new Response(JSON.stringify({ message: 'Submission successful' }), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ message: 'Invalid request', error }), { status: 400 });
	}
}

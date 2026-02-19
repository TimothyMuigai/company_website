// import sgMail from '@sendgrid/mail';
import { MongoClient } from 'mongodb';

// sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB!;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message, institution } = body;

        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ message: 'Missing required fields' }),
                { status: 400 }
            );
        }

        // Save to MongoDB
        const client = await MongoClient.connect(MONGODB_URI);
        const db = client.db(MONGODB_DB);

        await db.collection('news_centre_submissions').updateOne(
            {email},
            {
                $set: {
                    name,
                    email,
                    institution,
                    message,
                    updatedAt: new Date(),
                },
                $setOnInsert: {
                    createdAt: new Date(),
                }            
            },
            { upsert: true }
        );

        await client.close();

        // Send Email
        // await sgMail.send({
        //     to: process.env.ADMIN_EMAIL!,
        //     from: process.env.SENDGRID_FROM_EMAIL!,
        //     subject: 'New News Centre Submission',
        //     text: `Name: ${name}
        //         Email: ${email}
        //         Institution: ${institution || ''}
        //         Message: ${message}`,
        // });

        return new Response(
            JSON.stringify({ message: 'Submission successful' }),
            { status: 200 }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Server error', error }),
            { status: 500 }
        );
    }
}

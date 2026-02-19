import sgMail from "@sendgrid/mail";
import { MongoClient } from "mongodb";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB!;

export async function POST() {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(MONGODB_DB);

    const users = await db
      .collection("news_centre_submissions")
      .find({})
      .toArray();

    await client.close();

    if (!users.length) {
      return new Response(
        JSON.stringify({ message: "No users found" }),
        { status: 404 }
      );
    }

    const airtableLink = process.env.NEXT_PUBLIC_AIRTABLE_LINK!;

    const emails = users.map(user => ({
      to: user.email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: "News Center Updated",
      text: `
The Deepfake News Center has been updated.

Access it here:
${airtableLink}
      `,
    }));

    await sgMail.send(emails);

    return new Response(
      JSON.stringify({ message: "Notifications sent" }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error sending notifications", error }),
      { status: 500 }
    );
  }
}

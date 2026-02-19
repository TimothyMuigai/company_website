import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL!;

let client: MongoClient;

async function connectDB() {
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
  }
  return client.db(MONGODB_DB);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, jobTitle, company, message } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    const db = await connectDB();

    // Save to MongoDB
    await db.collection("contact_submissions").insertOne({
      firstName,
      lastName,
      email,
      jobTitle: jobTitle || "",
      company: company || "",
      message,
      createdAt: new Date(),
    });

    // Send Email
    await sgMail.send({
      to: ADMIN_EMAIL,
      from: FROM_EMAIL,
      subject: "New Contact Submission",
      text: `
First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
Job Title: ${jobTitle || ""}
Company: ${company || ""}
Message: ${message}
      `,
    });

    return NextResponse.json(
      { message: "Submission successful." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

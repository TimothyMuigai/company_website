import { MongoClient } from "mongodb";
import sgMail from "@sendgrid/mail";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB!;
// const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
// const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL!;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const jobSlug = formData.get("jobSlug") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const links = formData.get("links") as string;
    const github = formData.get("github") as string;
    const cover = formData.get("cover") as string;
    const cvFile = formData.get("cv") as File;

    if (!firstName || !lastName || !email || !cover || !cvFile) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Convert uploaded file to Buffer
    const arrayBuffer = await cvFile.arrayBuffer();
    const cvBuffer = Buffer.from(arrayBuffer);

    // 🔹 Save to MongoDB
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(MONGODB_DB);

    await db.collection("careers_application_submissions").insertOne({
      jobSlug,
      jobTitle,
      firstName,
      lastName,
      email,
      phone,
      links,
      github,
      cover,
      cv: {
        originalFilename: cvFile.name,
        mimetype: cvFile.type,
        size: cvFile.size,
      },
      createdAt: new Date(),
    });

    await client.close();

    // 🔹 Email Admin (with attachment)
//     await sgMail.send({
//       to: ADMIN_EMAIL,
//       from: FROM_EMAIL,
//       subject: `New Application: ${jobTitle} (${firstName} ${lastName})`,
//       text: `
// New Career Application

// Job: ${jobTitle}
// Name: ${firstName} ${lastName}
// Email: ${email}
// Phone: ${phone || ""}
// Links: ${links || ""}
// GitHub: ${github || ""}
// Cover Letter:
// ${cover}
//       `,
//       attachments: [
//         {
//           content: cvBuffer.toString("base64"),
//           filename: cvFile.name,
//           type: cvFile.type,
//           disposition: "attachment",
//         },
//       ],
//     });

//     // 🔹 Confirmation Email to Applicant
//     await sgMail.send({
//       to: email,
//       from: FROM_EMAIL,
//       subject: `Application Received – ${jobTitle}`,
//       text: `
// Dear ${firstName},

// Thank you for applying for the ${jobTitle} role.

// We have received your application and will review it shortly.

// Best regards,
// The Team
//       `,
//     });

    return new Response(
      JSON.stringify({ message: "Application submitted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
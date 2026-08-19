import { MongoClient } from "mongodb";
import { Resend } from "resend";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB!;
const MONGODB_TIMEOUT = 5000; // 5 second timeout

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  return apiKey ? new Resend(apiKey) : null;
}
const FROM_EMAIL = "noreply@deeptrack.io";
const ADMIN_EMAIL = "people@deeptrack.io";

async function connectMongoDBWithTimeout(uri: string): Promise<MongoClient> {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: MONGODB_TIMEOUT,
    connectTimeoutMS: MONGODB_TIMEOUT,
    socketTimeoutMS: MONGODB_TIMEOUT,
  });

  try {
    await client.connect();
    return client;
  } catch (error) {
    await client.close().catch(() => {});
    throw error;
  }
}

export async function POST(req: Request) {
  let client: MongoClient | null = null;
  
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

    if (!MONGODB_URI || !MONGODB_DB) {
      console.error("MongoDB configuration missing");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500 }
      );
    }

    // Convert uploaded file to Buffer
    const arrayBuffer = await cvFile.arrayBuffer();
    const cvBuffer = Buffer.from(arrayBuffer);

    // Connect to MongoDB with timeout
    client = await connectMongoDBWithTimeout(MONGODB_URI);
    const db = client.db(MONGODB_DB);

    // Save to MongoDB
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

    // Email Template for Admin
    const adminEmailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="margin: 0; color: #185FA5; font-size: 24px;">New Career Application</h1>
          <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">from Deeptrack Careers Portal</p>
        </div>

        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong style="color: #333;">Position:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-align: right; color: #666;">${jobTitle}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong style="color: #333;">Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-align: right; color: #666;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong style="color: #333;">Email:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-align: right; color: #666;"><a href="mailto:${email}" style="color: #185FA5; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong style="color: #333;">Phone:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-align: right; color: #666;">${phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong style="color: #333;">GitHub:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-align: right; color: #666;">${github ? `<a href="${github}" style="color: #185FA5; text-decoration: none;">${github}</a>` : "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong style="color: #333;">Links:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-align: right; color: #666;">${links ? `<a href="${links}" style="color: #185FA5; text-decoration: none;">${links}</a>` : "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0;"><strong style="color: #333;">CV File:</strong></td>
              <td style="padding: 10px 0; text-align: right; color: #666;">${cvFile.name}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <strong style="color: #333; display: block; margin-bottom: 10px;">Cover Letter:</strong>
            <p style="margin: 0; color: #666; line-height: 1.6; white-space: pre-wrap;">${cover}</p>
          </div>
        </div>

        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px; border-top: 1px solid #e0e0e0;">
          <p>Submitted: ${new Date().toLocaleString()}</p>
          <p>This is an automated notification from Deeptrack Careers Portal</p>
        </div>
      </div>
    `;

    const adminAttachments = [
      {
        filename: cvFile.name,
        content: cvBuffer,
        content_type: cvFile.type || 'application/octet-stream',
      },
    ];

    // Email Template for Applicant (Confirmation)
    const applicantEmailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="margin: 0; color: #185FA5; font-size: 24px;">Application Received</h1>
          <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Thank you for applying to Deeptrack</p>
        </div>

        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 0 0 15px 0; color: #333;">Hi ${firstName},</p>
          <p style="margin: 0 0 15px 0; color: #666; line-height: 1.6;">
            Thank you for applying for the <strong>${jobTitle}</strong> position at Deeptrack. We appreciate your interest in joining our team!
          </p>
          <p style="margin: 0 0 15px 0; color: #666; line-height: 1.6;">
            We've received your application and will review it carefully. Our team will reach out to you if your profile matches what we're looking for.
          </p>

          <div style="background-color: #f0f7ff; padding: 15px; border-left: 4px solid #185FA5; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0; color: #185FA5; font-weight: 500;">We review applications regularly and will be in touch within 2-4 weeks.</p>
          </div>

          <p style="margin: 15px 0 0 0; color: #666; line-height: 1.6;">
            Questions? Reach out to us at <a href="mailto:people@deeptrack.io" style="color: #185FA5; text-decoration: none;">people@deeptrack.io</a>
          </p>
        </div>

        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px; border-top: 1px solid #e0e0e0;">
          <p>&copy; 2026 Deeptrack. All rights reserved.</p>
        </div>
      </div>
    `;

    const resend = getResend();
    if (-not ) { return new Response(JSON.stringify({ error: 'Email service is not configured' }), { status: 503 }); }

    // Send email to admin
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Application: ${jobTitle} - ${firstName} ${lastName}`,
        html: adminEmailHtml,
        attachments: [
          {
            filename: cvFile.name,
            content: cvBuffer,
            contentType: cvFile.type || 'application/octet-stream',
          },
        ],
      });
    } catch (emailError) {
      console.error("Failed to send admin email:", emailError);
      // Don't fail the submission if email fails
    }

    // Send confirmation email to applicant
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: `Application Received – ${jobTitle} Position`,
        html: applicantEmailHtml,
      });
    } catch (emailError) {
      console.error("Failed to send applicant confirmation email:", emailError);
      // Don't fail the submission if email fails
    }

    return new Response(
      JSON.stringify({ message: "Application submitted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Career Application Error:", errorMessage);
    
    // Check for connection timeout/network errors
    if (errorMessage.includes("ETIMEDOUT") || errorMessage.includes("ECONNREFUSED")) {
      return new Response(
        JSON.stringify({ 
          error: "Database connection error. Please check your MongoDB Atlas network access settings. Ensure your IP is whitelisted or set to 0.0.0.0/0 for development.",
          details: process.env.NODE_ENV === "development" ? errorMessage : undefined
        }),
        { status: 503 }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to submit application",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      }),
      { status: 500 }
    );
  } finally {
    // Ensure client is closed
    if (client) {
      await client.close().catch((err) => console.error("Error closing MongoDB client:", err));
    }
  }
}
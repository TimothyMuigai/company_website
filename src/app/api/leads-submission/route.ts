import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || "noreply@deeptrack.io";
const ADMIN_EMAIL = "bryan@deeptrack.io";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orgName,
      contactName,
      contactEmail,
      contactPhone,
      industry,
      geography,
      dealSize,
      expectedClose,
      notes,
    } = body;

    // Basic validation
    if (!orgName || !contactName || !contactEmail || !industry || !geography || !dealSize) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Send Email to Bryan
    await sgMail.send({
      to: ADMIN_EMAIL,
      from: FROM_EMAIL,
      subject: `New Lead Submission: ${orgName}`,
      html: `
        <h2>New Lead Submission</h2>
        <p><strong>Organization Name:</strong> ${orgName}</p>
        <p><strong>Contact Name:</strong> ${contactName}</p>
        <p><strong>Contact Email:</strong> ${contactEmail}</p>
        <p><strong>Contact Phone:</strong> ${contactPhone || "N/A"}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Geography:</strong> ${geography}</p>
        <p><strong>Estimated Deal Size:</strong> ${dealSize}</p>
        <p><strong>Expected Close Date:</strong> ${expectedClose || "N/A"}</p>
        <p><strong>Notes:</strong></p>
        <p>${notes.replace(/\n/g, "<br>") || "N/A"}</p>
        <p style="margin-top: 20px; color: #888; font-size: 12px;">
          Submitted at: ${new Date().toLocaleString()}
        </p>
      `,
    });

    return NextResponse.json(
      { message: "Lead submitted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Leads API error:", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

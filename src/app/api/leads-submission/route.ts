import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = "noreply@deeptrack.io";
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

    // Email Template for Admin
    const adminEmailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="margin: 0; color: #185FA5; font-size: 24px;">New Lead Submission</h1>
          <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">from Deeptrack Channel Partner Portal</p>
        </div>

        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                <strong style="color: #333;">Organization:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-align: right; color: #666;">
                ${orgName}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                <strong style="color: #333;">Contact Name:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-align: right; color: #666;">
                ${contactName}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                <strong style="color: #333;">Contact Email:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-align: right; color: #666;">
                <a href="mailto:${contactEmail}" style="color: #185FA5; text-decoration: none;">${contactEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                <strong style="color: #333;">Contact Phone:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-align: right; color: #666;">
                ${contactPhone || "Not provided"}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                <strong style="color: #333;">Industry:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-align: right; color: #666;">
                ${industry}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                <strong style="color: #333;">Geography:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-align: right; color: #666;">
                ${geography}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                <strong style="color: #333;">Deal Size:</strong>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; text-align: right; color: #666;">
                ${dealSize}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0;">
                <strong style="color: #333;">Expected Close:</strong>
              </td>
              <td style="padding: 10px 0; text-align: right; color: #666;">
                ${expectedClose || "Not specified"}
              </td>
            </tr>
          </table>

          ${notes ? `
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <strong style="color: #333; display: block; margin-bottom: 10px;">Opportunity Notes:</strong>
              <p style="margin: 0; color: #666; line-height: 1.6; white-space: pre-wrap;">${notes}</p>
            </div>
          ` : ''}
        </div>

        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px; border-top: 1px solid #e0e0e0;">
          <p>Submitted: ${new Date().toLocaleString()}</p>
          <p>This is an automated notification from Deeptrack Channel Partner Portal</p>
        </div>
      </div>
    `;

    // Email Template for Partner (Confirmation)
    const partnerEmailHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="margin: 0; color: #185FA5; font-size: 24px;">Lead Submission Confirmed</h1>
          <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Thank you for submitting a lead</p>
        </div>

        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 0 0 15px 0; color: #333;">Hi ${contactName},</p>
          <p style="margin: 0 0 15px 0; color: #666; line-height: 1.6;">
            Thank you for submitting a lead for <strong>${orgName}</strong> through the Deeptrack Channel Partner Portal.
          </p>
          <p style="margin: 0 0 15px 0; color: #666; line-height: 1.6;">
            We've received your submission and our team will review it within 1-2 business days. You'll receive an email confirmation once we've processed the lead.
          </p>

          <div style="background-color: #f0f7ff; padding: 15px; border-left: 4px solid #185FA5; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 0; color: #185FA5; font-weight: 500;">Reference Number: LD-${Date.now()}</p>
          </div>

          <p style="margin: 15px 0 0 0; color: #666; line-height: 1.6;">
            If you have any questions, please contact our partnership team at <a href="mailto:partners@deeptrack.io" style="color: #185FA5; text-decoration: none;">partners@deeptrack.io</a>
          </p>
        </div>

        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px; border-top: 1px solid #e0e0e0;">
          <p>© 2026 Deeptrack. All rights reserved.</p>
        </div>
      </div>
    `;

    // Send email to admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🎯 New Lead: ${orgName} (${industry})`,
      html: adminEmailHtml,
    });

    // Send confirmation email to partner
    await resend.emails.send({
      from: FROM_EMAIL,
      to: contactEmail,
      subject: "Lead Submission Confirmed - Deeptrack Channel Partner Portal",
      html: partnerEmailHtml,
    });

    return NextResponse.json(
      { message: "Lead submitted successfully. Check your email for confirmation." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Leads submission error:", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

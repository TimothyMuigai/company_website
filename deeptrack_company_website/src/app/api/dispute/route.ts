import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { partnerEmail, partnerName, message } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    await resend.emails.send({
      from: "noreply@deeptrack.io",
      to: "partnerships@deeptrack.io",
      subject: `Commission Dispute — ${partnerName || partnerEmail}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #185FA5;">Commission Dispute Flagged</h2>
          <p><strong>Partner:</strong> ${partnerName || "Unknown"}</p>
          <p><strong>Email:</strong> ${partnerEmail || "Unknown"}</p>
          <hr style="border: 1px solid #eee; margin: 16px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; color: #444;">${message}</p>
          <hr style="border: 1px solid #eee; margin: 16px 0;" />
          <p style="color: #999; font-size: 12px;">Submitted via Deeptrack Partner Portal — ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Dispute email error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
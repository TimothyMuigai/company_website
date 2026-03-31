import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

const resendApiKey =
  process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;

const passwordResetProvider =
  resendApiKey && resendApiKey.length > 0
    ? {
        id: "resend",
        type: "email" as const,
        name: "Resend",
        from: "Deeptrack <no-reply@deeptrack.io>",
        maxAge: 10 * 60,
        apiKey: resendApiKey,
        async sendVerificationRequest({
          identifier: to,
          url,
          token,
          provider,
          expires,
          theme,
        }: {
          identifier: string;
          url: string;
          token: string;
          provider: any;
          expires: Date;
          theme: any;
        }) {
          const { host } = new URL(url);
          const subject = `Reset your Deeptrack password`;
          const html = `
<body style="background: #f9f9f9;">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: #fff; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: #444;">
        Reset your password for <strong>${host}</strong>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 0; font-size: 16px; line-height: 24px; font-family: Helvetica, Arial, sans-serif; color: #444;">
        Use the code below to complete your password reset:
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 10px 0;">
        <div style="font-size: 24px; letter-spacing: 0.05em; font-family: Helvetica, Arial, sans-serif; color: #111;">
          <strong>${token}</strong>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 0; font-size: 16px; line-height: 24px; font-family: Helvetica, Arial, sans-serif; color: #444;">
        If you did not request this, you can safely ignore this email.
      </td>
    </tr>
    <tr>
      <td style="padding: 10px 0; font-size: 14px; line-height: 20px; font-family: Helvetica, Arial, sans-serif; color: #888;">
        Or click the button below to continue the reset flow.
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="${url}" target="_blank" style="display:inline-block;padding:12px 24px;border-radius:6px;background:#346df1;color:#fff;text-decoration:none;font-family:Helvetica, Arial, sans-serif;font-weight:600;">Continue reset</a>
      </td>
    </tr>
  </table>
</body>
          `;
          const text = `Reset your Deeptrack password for ${host}\n\nUse this code: ${token}\n\nThis code expires in 10 minutes.\n\nOr open this link: ${url}\n\nIf you did not request this, ignore this email.`;

          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${provider.apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: provider.from,
              to,
              subject,
              html,
              text,
            }),
          });

          if (!res.ok) {
            throw new Error("Resend error: " + JSON.stringify(await res.json()));
          }
        },
      }
    : undefined;

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password({ reset: passwordResetProvider })],
});

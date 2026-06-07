import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_966QovSx_Bz3PZ7RBV26rDHMgfosK7Eix");

const WEBHOOK_URL =
  "https://yatrikcrm.reviu.store/api/webhooks/meta-leads?orgId=tUqPko4C4cQYmFXglWGY";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, query } = body as {
      name: string;
      email?: string;
      phone: string;
      query?: string;
    };

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required." },
        { status: 400 },
      );
    }

    // ── 1. Send email via Resend ─────────────────────────────────────────────
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 12px;">
        <h2 style="color: #1e293b; margin-bottom: 4px;">New Contact Form Submission</h2>
        <p style="color: #64748b; margin-top: 0; margin-bottom: 24px; font-size: 14px;">Received from bittstech.com</p>

        <table style="width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
          <tr>
            <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569; width: 140px;">Name</td>
            <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Phone</td>
            <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Email</td>
            <td style="padding: 14px 20px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${email || "—"}</td>
          </tr>
          <tr>
            <td style="padding: 14px 20px; font-weight: 600; color: #475569; vertical-align: top;">Business Query</td>
            <td style="padding: 14px 20px; color: #1e293b;">${query || "—"}</td>
          </tr>
        </table>

        <p style="margin-top: 20px; color: #94a3b8; font-size: 12px; text-align: center;">This is an automated notification from Bitts Tech contact form.</p>
      </div>
    `;

    const emailResult = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "bittstechinfo@gmail.com",
      subject: `New Enquiry from ${name}`,
      html: emailHtml,
    });

    if (emailResult.error) {
      console.error("Resend error:", emailResult.error);
    }

    // ── 2. Post to CRM Webhook ───────────────────────────────────────────────
    const webhookPayload = {
      name: name,
      phone: phone,
      source: "Bitts Tech Website",
      pax: 1,
      travelDate: query || "Not specified",
    };

    const webhookResult = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResult.ok) {
      console.error(
        "Webhook error:",
        webhookResult.status,
        await webhookResult.text().catch(() => ""),
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}

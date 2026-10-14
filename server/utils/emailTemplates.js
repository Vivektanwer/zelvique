// The text of the two emails we send:
//   1. adminEmailContent(lead)    -> goes to the Zelvique owner
//   2. customerEmailContent(lead) -> goes to the visitor (automatic thank-you)
//
// Each function returns { subject, html, text }.
// Emails only understand simple HTML with inline styles (no Tailwind), so styles are written inline here.
// IMPORTANT: everything the visitor typed goes through escapeHtml(), so nobody can inject HTML into our emails.

import { site } from "../../src/data/site.js";

// Turns < > & " ' into safe text
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Same, but keeps the line breaks of the message
function escapeWithLineBreaks(value) {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

// One row of the details table
function row(label, valueHtml) {
  return `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #E4E7ED;color:#454B57;font-size:14px;width:130px;vertical-align:top;">${label}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #E4E7ED;color:#0E1116;font-size:15px;line-height:1.5;">${valueHtml}</td>
    </tr>`;
}

// The outside frame shared by both emails
function wrapEmail(title, bodyHtml) {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:24px;background:#F7F9FC;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#FFFFFF;border:1px solid #E4E7ED;border-radius:12px;overflow:hidden;">
      <tr>
        <td style="background:#387DEA;padding:20px 24px;color:#FFFFFF;font-size:20px;font-weight:bold;">${escapeHtml(title)}</td>
      </tr>
      ${bodyHtml}
    </table>
  </body>
</html>`;
}

// ---------- 1. Email to the owner ----------
export function adminEmailContent(lead) {
  const subject = "New Website Enquiry — Zelvique";

  const html = wrapEmail(
    "New Website Enquiry",
    `<tr><td>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${row("Name", escapeHtml(lead.name))}
        ${row("Email", `<a href="mailto:${escapeHtml(lead.email)}" style="color:#2A62C4;">${escapeHtml(lead.email)}</a>`)}
        ${row("Phone", `<a href="tel:${escapeHtml(lead.phone.replace(/\s/g, ""))}" style="color:#2A62C4;">${escapeHtml(lead.phone)}</a>`)}
        ${row("Company", escapeHtml(lead.company || "Not provided"))}
        ${row("Service", escapeHtml(lead.service))}
        ${row("Message", escapeWithLineBreaks(lead.message))}
        ${row("Date and time", `${escapeHtml(lead.date)} ${escapeHtml(lead.time)} (${escapeHtml(lead.timeZone)})`)}
      </table>
    </td></tr>
    <tr><td style="padding:16px 24px;color:#454B57;font-size:13px;">Reply to this email to answer ${escapeHtml(lead.name)} directly.</td></tr>`
  );

  const text = [
    "New Website Enquiry — Zelvique",
    "",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Company: ${lead.company || "Not provided"}`,
    `Service: ${lead.service}`,
    `Message: ${lead.message}`,
    `Date and time: ${lead.date} ${lead.time} (${lead.timeZone})`,
  ].join("\n");

  return { subject, html, text };
}

// ---------- 2. Thank-you email to the visitor ----------
export function customerEmailContent(lead) {
  const subject = "Thank You for Contacting Zelvique";
  const firstName = lead.name.split(" ")[0];

  const html = wrapEmail(
    "Thank you for contacting Zelvique",
    `<tr><td style="padding:24px;color:#0E1116;font-size:16px;line-height:1.6;">
      <p style="margin:0 0 16px;">Hi ${escapeHtml(firstName)},</p>
      <p style="margin:0 0 16px;">Thank you for contacting Zelvique. We have received your enquiry and will get back to you soon.</p>
      <p style="margin:0 0 8px;color:#454B57;font-size:14px;">Here is a copy of your message:</p>
      <p style="margin:0 0 24px;padding:16px;background:#F7F9FC;border-radius:8px;font-size:15px;">${escapeWithLineBreaks(lead.message)}</p>
      <p style="margin:0 0 4px;">Best regards,</p>
      <p style="margin:0 0 24px;font-weight:bold;">The Zelvique team</p>
      <p style="margin:0;color:#454B57;font-size:13px;">
        <a href="${escapeHtml(site.url)}" style="color:#2A62C4;">${escapeHtml(site.url.replace("https://", ""))}</a>
        &nbsp;|&nbsp; ${escapeHtml(site.email)}
      </p>
      <p style="margin:16px 0 0;color:#454B57;font-size:12px;">If you did not send this enquiry, you can safely ignore this email.</p>
    </td></tr>`
  );

  const text = [
    `Hi ${firstName},`,
    "",
    "Thank you for contacting Zelvique. We have received your enquiry and will get back to you soon.",
    "",
    "Here is a copy of your message:",
    lead.message,
    "",
    "Best regards,",
    "The Zelvique team",
    `${site.url} | ${site.email}`,
    "",
    "If you did not send this enquiry, you can safely ignore this email.",
  ].join("\n");

  return { subject, html, text };
}

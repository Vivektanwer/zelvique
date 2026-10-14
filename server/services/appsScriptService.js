// APPS SCRIPT SERVICE
// This is the ONLY file that knows how we talk to Google.
//
// Instead of an SMTP email account and a Google Cloud service account, this project sends
// every lead to a small Google Apps Script (a script that runs inside YOUR Google account).
// That one script:
//   1. Adds a new row to your Google Sheet
//   2. Emails you (the owner) the lead details, from YOUR Gmail address
//   3. Emails the visitor an automatic thank-you message, also from YOUR Gmail address
//
// Setup: see SETUP-BACKEND.md. You paste a script into script.google.com (Code.gs in this
// project has the exact text) and deploy it as a "Web App". That gives you a URL, which goes
// into .env as GOOGLE_SCRIPT_URL.

// Do not wait forever for Google to answer (Apps Script can be slow to "wake up")
const REQUEST_TIMEOUT_MS = 20000;

// Sends the lead + the two emails' content to the Apps Script.
// Returns { sheet: true/false, adminEmail: true/false, customerEmail: true/false }.
// Throws only if the request itself could not be made at all (network down, wrong URL, ...).
export async function submitLeadToAppsScript({ lead, adminEmail, customerEmail }) {
  const url = process.env.GOOGLE_SCRIPT_URL;
  const secret = process.env.APPS_SCRIPT_SECRET;

  if (!url || !secret) {
    throw new Error(
      "Google Apps Script is not set up. Check GOOGLE_SCRIPT_URL and APPS_SCRIPT_SECRET in .env"
    );
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Everything the Apps Script needs is sent in one request: the row for the sheet,
    // and the ready-made subject/html/text for both emails (built with emailTemplates.js).
    body: JSON.stringify({
      secret,
      date: lead.date,
      time: lead.time,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      service: lead.service,
      message: lead.message,
      status: lead.status,
      adminSubject: adminEmail.subject,
      adminHtml: adminEmail.html,
      customerSubject: customerEmail.subject,
      customerHtml: customerEmail.html,
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  // Apps Script almost always answers with 200 and puts the real result inside the JSON,
  // even when one of the 3 steps failed inside the script. A non-200 here usually means
  // the URL is wrong or the deployment is not public.
  if (!response.ok) {
    throw new Error(`Apps Script answered with status ${response.status}`);
  }

  let result;
  try {
    result = await response.json();
  } catch (error) {
    throw new Error("Apps Script did not return valid JSON. Check the deployment is a Web App.");
  }

  if (result.error) {
    throw new Error(`Apps Script error: ${result.error}`);
  }

  return result;
}

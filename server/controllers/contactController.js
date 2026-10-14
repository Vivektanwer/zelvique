// CONTACT CONTROLLER
// This runs when the website sends the contact form to POST /api/contact.
//
// The steps:
//   1. Ignore spam bots (they fill the hidden "website" field)
//   2. Check the data again on the server (never trust the browser)
//   3. Build the "lead" (the cleaned information) and the two emails' content
//   4. Send everything in ONE request to the Google Apps Script (it saves the row
//      and sends both emails from your own Gmail account)
//   5. Tell the website if it worked
//
// Rule: the visitor sees "success" if the lead was saved SOMEWHERE (the sheet row OR the
// owner's email). If only the thank-you email to the visitor fails, we still say success
// and just write a log. If nothing could be saved, we show a friendly error so the visitor
// can try again.

import { validateContactForm } from "../../src/utils/validateContactForm.js";
import { services } from "../../src/data/services.js";
import { submitLeadToAppsScript } from "../services/appsScriptService.js";
import { adminEmailContent, customerEmailContent } from "../utils/emailTemplates.js";
import { getDateAndTime } from "../utils/dateTime.js";

// Turns the value into text, removes new lines (for one-line fields) and extra spaces
function cleanLine(value) {
  return String(value ?? "").replace(/[\r\n]+/g, " ").trim();
}

// The service is sent as a short name (slug). We turn it into the real title.
// Unknown values are ignored, so nobody can send us strange text here.
function getServiceLabel(slug) {
  if (slug === "not-sure") return "Not sure yet";
  const service = services.find((item) => item.slug === slug);
  return service ? service.title : "Not specified";
}

// Builds the cleaned lead information
function buildLead(body) {
  const { date, time, timeZone } = getDateAndTime(new Date(), process.env.TIMEZONE);

  return {
    date,
    time,
    timeZone,
    name: cleanLine(body.name),
    email: cleanLine(body.email),
    phone: cleanLine(body.phone),
    company: cleanLine(body.company),
    service: getServiceLabel(body.service),
    message: String(body.message ?? "").trim(),
    status: "New", // the "Lead Status" column in Google Sheets
  };
}

export async function handleContactForm(req, res) {
  try {
    const body = req.body || {};

    // 1. Spam bots fill the hidden field. Pretend it worked, but do nothing.
    if (String(body.website ?? "").trim() !== "") {
      return res.status(200).json({ message: "Submitted successfully!" });
    }

    // 2. Check the data again
    const errors = validateContactForm(body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Please check the form and try again.",
        errors,
      });
    }

    // 3. Build the lead and the two emails
    const lead = buildLead(body);
    const adminEmail = adminEmailContent(lead);
    const customerEmail = customerEmailContent(lead);

    // 4. Send it all to the Apps Script in one request
    let result;
    try {
      result = await submitLeadToAppsScript({ lead, adminEmail, customerEmail });
    } catch (error) {
      console.error("[contact] Apps Script request failed:", error.message);
      return res.status(500).json({
        message: "We could not send your message right now. Please try again in a moment.",
      });
    }

    // Log which parts failed INSIDE the script, without stopping the response
    if (!result.sheet) console.error("[contact] The Google Sheet row could not be saved.");
    if (!result.adminEmail) console.error("[contact] The admin email could not be sent.");
    if (!result.customerEmail) console.error("[contact] The customer thank-you email could not be sent.");

    // 5. Was the lead saved somewhere?
    const leadWasSaved = result.sheet || result.adminEmail;

    if (!leadWasSaved) {
      return res.status(500).json({
        message: "We could not send your message right now. Please try again in a moment.",
      });
    }

    console.log("[contact] New lead received");
    return res.status(200).json({ message: "Submitted successfully!" });
  } catch (error) {
    // Anything unexpected ends up here. The visitor sees a friendly message, the log has the details.
    console.error("[contact] Unexpected error:", error.message);
    return res.status(500).json({
      message: "Something went wrong on our side. Please try again in a moment.",
    });
  }
}

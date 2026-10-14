/**
 * ZELVIQUE — Google Apps Script (Code.gs)
 *
 * This script runs inside YOUR Google account (vivektanwer648@gmail.com).
 * When the website's contact form is submitted, the server sends the lead here.
 * This script then:
 *   1. Adds a new row to this spreadsheet's "Leads" tab
 *   2. Emails you the lead details (from your own Gmail address)
 *   3. Emails the visitor an automatic thank-you message (also from your own Gmail address)
 *
 * SETUP: see SETUP-BACKEND.md for the full step-by-step guide. Short version:
 *   1. Open your Google Sheet > Extensions > Apps Script
 *   2. Delete anything in Code.gs and paste this whole file instead
 *   3. Change SHARED_SECRET below to the value shown in your project's SETUP-BACKEND.md
 *   4. Click Deploy > New deployment > type "Web app"
 *        Execute as: Me
 *        Who has access: Anyone
 *   5. Copy the Web app URL it gives you into your project's .env as GOOGLE_SCRIPT_URL
 */

// This MUST be exactly the same text as APPS_SCRIPT_SECRET in your project's .env file.
// It stops strangers from sending fake leads straight to this script (they would need to
// guess this secret, which nobody else has).
var SHARED_SECRET = "nYNTnWhtc5oyxA3swAIFkVdJCRwS3uNu";

// Your own email address, where new leads should arrive.
// Written as plain text (not read from the session) because when the WEBSITE calls this
// script, there is no logged-in Google user making the request — only you, running this
// script from your own account, ever sends real emails through it.
var ADMIN_EMAIL = "vivektanwer648@gmail.com";

// The name of the tab (bottom of the sheet) where leads are saved
var SHEET_TAB_NAME = "Leads";

// Runs automatically whenever the server sends a POST request to this script's URL
function doPost(e) {
  var result = { sheet: false, adminEmail: false, customerEmail: false };

  try {
    var data = JSON.parse(e.postData.contents);

    // Reject the request if the secret does not match
    if (data.secret !== SHARED_SECRET) {
      return jsonResponse({ error: "Unauthorized" });
    }

    // ---- 1. Save the row in the Sheet ----
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_TAB_NAME);
      if (!sheet) throw new Error('No tab named "' + SHEET_TAB_NAME + '" was found.');

      sheet.appendRow([
        data.date,
        data.time,
        data.name,
        data.email,
        data.phone,
        data.company,
        data.service,
        data.message,
        data.status,
      ]);
      result.sheet = true;
    } catch (sheetError) {
      Logger.log("Sheet error: " + sheetError);
    }

    // ---- 2. Email the owner (you) ----
    try {
      MailApp.sendEmail({
        to: ADMIN_EMAIL,
        subject: data.adminSubject,
        htmlBody: data.adminHtml,
        replyTo: data.email, // so you can just press "Reply" to answer the visitor
      });
      result.adminEmail = true;
    } catch (adminError) {
      Logger.log("Admin email error: " + adminError);
    }

    // ---- 3. Email the visitor (automatic thank-you) ----
    try {
      MailApp.sendEmail({
        to: data.email,
        subject: data.customerSubject,
        htmlBody: data.customerHtml,
      });
      result.customerEmail = true;
    } catch (customerError) {
      Logger.log("Customer email error: " + customerError);
    }

    return jsonResponse(result);
  } catch (error) {
    return jsonResponse({ error: String(error) });
  }
}

// Small helper: Apps Script needs this exact way of returning JSON
function jsonResponse(object) {
  return ContentService.createTextOutput(JSON.stringify(object)).setMimeType(
    ContentService.MimeType.JSON
  );
}

// Lets you click "Run" in the Apps Script editor to send yourself a test email,
// without needing the website. Useful for checking MailApp works on your account first.
function testEmail() {
  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: "Zelvique Apps Script test",
    htmlBody: "<p>If you received this, MailApp is working on this Google account.</p>",
  });
}

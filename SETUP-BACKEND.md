# Backend setup guide (contact form → Google Sheet + emails)

The contact form sends its data to our server, which sends it to a small **Google Apps Script**.
That script runs inside YOUR Google account (for example `vivektanwer648@gmail.com`) and does 3 things:

1. Adds a new row to your Google Sheet
2. Emails **you** the lead details (from your own Gmail address)
3. Emails the **visitor** an automatic thank-you message (also from your own Gmail address)

No email password and no Google Cloud "service account" are needed with this method — everything
runs under your own Google login. You do the setup once, by pasting one file into Google's website.

---

## Step 1: Create the Google Sheet

1. Create a new Google Sheet. Name it "Zelvique Leads" (any name is fine).
2. Rename the tab at the bottom to `Leads` (this must match `SHEET_TAB_NAME` inside `server/Code.gs`).
3. In **row 1**, type these headings exactly, one per column (A to I):

   `Date` | `Time` | `Name` | `Email` | `Phone` | `Company` | `Service` | `Message` | `Lead Status`

New leads get the status `New`. You can change the status by hand later (for example `Contacted`, `Won`, `Lost`).

---

## Step 2: Add the script to the Sheet

1. In your Google Sheet, click **Extensions > Apps Script**. A new tab opens with an empty `Code.gs` file.
2. Delete everything in that editor.
3. Open the file **`server/Code.gs`** in this project, copy its whole content, and paste it into the Apps Script editor.
4. At the top of the file, check this line:

   ```js
   var SHARED_SECRET = "nYNTnWhtc5oyxA3swAIFkVdJCRwS3uNu";
   ```

   This must be **exactly the same text** as `APPS_SCRIPT_SECRET` in your project's `.env` file (already
   filled in for you in `.env.example` — you can keep it, or generate your own random text and put the
   same value in both places).

5. Click the **Save** icon (or Ctrl/Cmd + S). Name the project "Zelvique Backend" if it asks.

---

## Step 3: Deploy it as a Web App

1. Click **Deploy > New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - **Execute as:** `Me (your email)`
   - **Who has access:** `Anyone`

   ("Anyone" sounds risky, but only your server can do anything useful, because every request must
   include the secret text from Step 2. Nobody else knows it.)
4. Click **Deploy**.
5. The first time, Google will ask you to **authorize** the script (because it needs permission to
   send email and edit the sheet). Click through: "Authorize access" → choose your Google account →
   you will see an "unverified app" warning because this is your own private script → click
   **Advanced > Go to Zelvique Backend (unsafe)** → **Allow**.
6. Copy the **Web app URL** it shows you. It looks like:

   ```text
   https://script.google.com/macros/s/AKfycb..................../exec
   ```

---

## Step 4: Fill in `.env`

1. In the project folder, copy `.env.example` and name the copy `.env`.
2. Paste the Web app URL from Step 3 as `GOOGLE_SCRIPT_URL`.
3. Make sure `APPS_SCRIPT_SECRET` is exactly the same text as `SHARED_SECRET` in `server/Code.gs`.

```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycb..................../exec
APPS_SCRIPT_SECRET=nYNTnWhtc5oyxA3swAIFkVdJCRwS3uNu
```

`.env` is already listed in `.gitignore`, so it will not be uploaded to GitHub. Never share this file.

---

## Step 5: Test it

**First, test the script by itself (no website needed):**

1. Back in the Apps Script editor, at the top, choose the function `testEmail` from the dropdown next to "Run".
2. Click **Run**. Check your Gmail inbox for a test email titled "Zelvique Apps Script test".
3. If it arrives, MailApp works on your account and you can move on. If not, see the table below.

**Then test the whole website:**

```bash
npm install
npm run dev
```

1. Open http://localhost:3000/contact and send the form with your own email address.
2. You should see: **"Submitted successfully! Thank you for contacting Zelvique."**
3. Check three places: a new row in the Sheet, the enquiry email in your Gmail inbox, and the
   thank-you email in the inbox of the address you typed. (Also check spam folders.)

The server prints a short line in the terminal when something fails. The form still works if only
one part fails — for example if the sheet is saved but an email fails, the visitor still sees success,
and the failure is written to the terminal so you can fix it.

### If something fails

| Message | Most likely reason |
| --- | --- |
| `Google Apps Script is not set up` | `GOOGLE_SCRIPT_URL` or `APPS_SCRIPT_SECRET` is missing in `.env`. Restart `npm run dev` after editing `.env`. |
| `Apps Script answered with status 404` (or similar) | The URL was copied wrong, or the deployment was deleted. Redeploy (Step 3) and copy the URL again. |
| `Apps Script error: Unauthorized` | `APPS_SCRIPT_SECRET` in `.env` does not exactly match `SHARED_SECRET` in `server/Code.gs`. Copy-paste it again, careful with extra spaces. |
| The Sheet row is never added | The tab is not named `Leads`, or you renamed a column heading. Check Step 1. |
| Emails never arrive | Check the Apps Script's own log: in the Apps Script editor, click **Executions** on the left to see each run and any error inside it. Also check spam folders. |
| "This app isn't verified" warning when deploying | Normal for your own private script. Click **Advanced > Go to Zelvique Backend (unsafe) > Allow**. |

---

## Step 6: When you change the script later

If you ever edit `server/Code.gs` (for example to change the Sheet tab name), you must create a
**new deployment** for the change to take effect:

**Deploy > Manage deployments > pencil icon (Edit) > Version: New version > Deploy**

Editing the script alone, without this step, does not update the live Web app.

---

## Step 7: When you put the website online

- Add `GOOGLE_SCRIPT_URL`, `APPS_SCRIPT_SECRET`, `PORT` and `TIMEZONE` in the environment settings of
  your hosting company. Do not upload the `.env` file itself.
- The Apps Script side needs nothing extra — it is already public on Google's servers once deployed.
- Upload the whole project (not only the `dist` folder). The server reads the validation rules from `src/`.
- Run `npm install`, `npm run build`, then `npm start`.

---

## Sending limits (Gmail quota)

Because emails are sent through your own Gmail account, Google limits how many you can send per day:

- A normal personal Gmail account: **100 emails a day**
- A Google Workspace (business) account: **1,500 emails a day**

Each enquiry uses 2 emails (one to you, one to the visitor), so a personal Gmail account can handle
about 50 enquiries a day. If Zelvique grows past that, consider a Google Workspace account, or switch
this project to a dedicated email provider later (only `server/services/appsScriptService.js` and
`server/Code.gs` would need to change).

---

## What protects the form

- The server checks every field again (the browser check alone is not enough).
- A hidden trap field catches simple spam bots.
- One visitor can send at most 5 messages in 15 minutes (`server/utils/rateLimiter.js`).
- The shared secret stops strangers from sending fake leads straight to your Apps Script URL.
- Everything the visitor types is made safe before it goes into an email, so nobody can inject HTML into your emails.
- Error details go only to the server log. Visitors see friendly messages, and the secret is never printed.

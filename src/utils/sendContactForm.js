// Sends the contact form to our server (POST /api/contact).
// It never throws an error. It always returns one of these:
//   { ok: true }
//   { ok: false, message: "Text to show the visitor", fieldErrors: { ... } }

const genericMessage =
  "Something went wrong while sending your message. Please try again in a moment.";

export async function sendContactForm(values) {
  let response;

  try {
    response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      signal: AbortSignal.timeout(15000), // give up after 15 seconds
    });
  } catch (error) {
    // No internet, server is down, or it took too long
    return {
      ok: false,
      message:
        "We could not reach the server. Please check your internet connection and try again.",
    };
  }

  // Try to read the answer. It may not be JSON, so we protect against that.
  let data = null;
  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    return {
      ok: false,
      message: data?.message || genericMessage,
      fieldErrors: data?.errors,
    };
  }

  return { ok: true };
}

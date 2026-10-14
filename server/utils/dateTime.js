// Gives the current date and time as simple text, for example:
//   date: "2026-09-21"   time: "14:35:10"
// The timezone comes from the TIMEZONE value in .env (for example "Asia/Kolkata").
// If it is missing or wrong, we use "UTC".

export function getDateAndTime(now = new Date(), timeZone = "UTC") {
  function format(zone) {
    // "en-CA" writes dates as YYYY-MM-DD, which sorts nicely in Google Sheets
    const date = new Intl.DateTimeFormat("en-CA", {
      timeZone: zone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);

    // hourCycle "h23" gives 24-hour time
    const time = new Intl.DateTimeFormat("en-GB", {
      timeZone: zone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).format(now);

    return { date, time, timeZone: zone };
  }

  try {
    return format(timeZone || "UTC");
  } catch (error) {
    // An invalid timezone name throws an error. Use UTC instead of crashing.
    return format("UTC");
  }
}

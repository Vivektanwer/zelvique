// Helpers for the phone field in the contact form. No browser code here, so it is easy to test.
//
//   cleanPhoneInput(typedText, country)
//       Decides what the phone field may hold while the visitor types or pastes.
//       Returns the digits to keep, or null, which means "ignore this change": the field keeps
//       what it had before, so the wrong key simply does nothing.
//
//   phoneRuleText(country)
//       A short hint to show under the field, like "10 digits, starting with 6, 7, 8 or 9".
//
// The rules come from data/countries.js (maxDigits, firstDigits), so changing a country there
// changes the typing rules here too. For India that means:
//   - only digits (no letters, spaces or symbols)
//   - never more than 10 digits
//   - the first digit must be 6, 7, 8 or 9

// "6789" -> "6, 7, 8 or 9"
function joinWithOr(digits) {
  return digits.split("").join(", ").replace(/, (\d)$/, " or $1");
}

export function cleanPhoneInput(typedText, country) {
  const dialDigits = country.dial.replace("+", ""); // "+91" -> "91"
  // Numbers may not start with 0, unless the country has its own list of allowed first digits
  const allowedFirstDigits = country.firstDigits || "123456789";

  // 1. Spaces, dashes, dots and brackets are dropped (a pasted "98765 43210" becomes 9876543210)
  let text = String(typedText).replace(/[\s\-.()]/g, "");

  // 2. A pasted number like +91 98765 43210 loses its "+91", because the dropdown already has it.
  //    A "+" followed by any other country's code is refused.
  if (text.startsWith("+")) {
    if (!text.startsWith("+" + dialDigits)) return null;
    text = text.slice(dialDigits.length + 1);
  }

  // 3. Anything that is still not a digit (letters, symbols) is refused
  if (!/^\d*$/.test(text)) return null;

  // 4. Two common ways people paste a full number. Without this, the extra digits would be cut off
  //    and a WRONG number could look valid, so we remove the extra part properly instead:
  //      919876543210  -> the country code was pasted without the "+"
  //      09876543210   -> a "0" that many countries put in front of the number
  if (text.length === dialDigits.length + country.maxDigits && text.startsWith(dialDigits)) {
    text = text.slice(dialDigits.length);
  } else if (text.length === country.maxDigits + 1 && text.startsWith("0")) {
    text = text.slice(1);
  }

  // 5. Never more digits than the country allows
  if (text.length > country.maxDigits) return null;

  // 6. The first digit must be one of the allowed ones
  if (text.length > 0 && !allowedFirstDigits.includes(text[0])) return null;

  return text;
}

export function phoneRuleText(country) {
  const length =
    country.minDigits === country.maxDigits
      ? `${country.maxDigits} digits`
      : `${country.minDigits} to ${country.maxDigits} digits`;

  if (!country.firstDigits) return `Digits only, ${length}. Do not start with 0.`;

  // Many allowed first digits (for example 2-9): it is shorter to say which ones are NOT allowed
  if (country.firstDigits.length > 5) {
    const notAllowed = "0123456789".split("").filter((digit) => !country.firstDigits.includes(digit)).join("");
    return `Digits only, ${length}. Do not start with ${joinWithOr(notAllowed)}.`;
  }

//   return `Digits only, ${length}, starting with ${joinWithOr(country.firstDigits)}.`;
}
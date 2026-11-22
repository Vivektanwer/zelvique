// Countries shown in the "country code" dropdown next to the phone number.
// Only 4 countries are listed on purpose. To add one: copy one line, change the values, and paste it into the list.
// To remove a country: delete its line. Nothing else needs to change.
//
//   code          short unique name (2 letters). Used internally.
//   name          shown in the dropdown
//   dial          the country calling code, with the "+"
//   minDigits     fewest digits the visitor may type (without the country code)
//   maxDigits     most digits the visitor may type (without the country code)
//   firstDigits   OPTIONAL. If set, the number must start with one of these digits.
//   groups        OPTIONAL. How the digits are spaced in emails and the sheet,
//                 for example [5, 5] turns 9876543210 into "98765 43210".
//
// IMPORTANT: India and the USA have strict rules. For the other countries the length
// rule is a deliberately WIDE range, so a real number is never rejected by mistake
// (numbering plans differ for mobile and landline numbers). Tighten a range here if you know
// the exact rule for a country you work with a lot.
//
// The visitor types the number WITHOUT the leading 0 that many countries use inside the
// country (for example 07123 456789 in the UK is typed as 7123456789).
// The first country in this list is the one selected by default.

export const countries = [
  { code: "IN", name: "India", dial: "+91", minDigits: 10, maxDigits: 10, firstDigits: "6789", groups: [5, 5] },
  { code: "US", name: "USA", dial: "+1", minDigits: 10, maxDigits: 10, firstDigits: "23456789", groups: [3, 3, 4] },
  { code: "GB", name: "UK", dial: "+44", minDigits: 9, maxDigits: 10 },
  { code: "AE", name: "UAE", dial: "+971", minDigits: 8, maxDigits: 9 },
];

// The country selected before the visitor chooses one
export const defaultCountryCode = countries[0].code;
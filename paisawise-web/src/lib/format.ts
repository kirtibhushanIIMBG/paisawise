/**
 * Indian number formatting. Never use en-US here: ₹1,23,456 groups differently
 * from $123,456 and getting it wrong is the fastest way to look foreign.
 */

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inrDecimal = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const plain = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** ₹60,000 */
export function rupees(value: number): string {
  return inr.format(Math.round(value));
}

/** ₹16.63 — for per-day figures where rounding to zero would mislead */
export function rupeesExact(value: number): string {
  return inrDecimal.format(value);
}

/** 1,23,456 */
export function indianNumber(value: number): string {
  return plain.format(Math.round(value));
}

/** 3.2 Lakh, how large counts are stated in India */
export function lakh(value: number): string {
  if (value >= 1e7) return `${(value / 1e7).toFixed(value % 1e7 === 0 ? 0 : 1)} Cr`;
  if (value >= 1e5) return `${(value / 1e5).toFixed(value % 1e5 === 0 ? 0 : 1)} Lakh`;
  return plain.format(value);
}

export function percent(value: number): string {
  return `${Math.round(value)}%`;
}

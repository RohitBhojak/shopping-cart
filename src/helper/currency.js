import currency from "currency.js";

export function formatINR(amount) {
  return currency(amount * 100, { symbol: "₹", useVedic: true }).format();
}

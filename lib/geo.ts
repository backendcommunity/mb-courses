// All African ISO 3166-1 alpha-2 country codes
export const AFRICA_CODES = new Set([
  "NG", "GH", "KE", "ZA", "ET", "EG", "TZ", "UG", "CM", "SN", "RW", "CI",
  "AO", "MZ", "MG", "BF", "ML", "MW", "NE", "ZM", "TD", "SO", "ZW", "GN",
  "SS", "BJ", "TN", "BI", "SL", "TG", "LY", "ER", "MR", "CF", "NA", "GM",
  "BW", "LS", "GW", "LR", "SZ", "DJ", "KM", "CV", "ST", "SC", "MU", "RE",
  "YT", "EH", "SD", "CG", "CD", "GQ", "GA",
]);

export function isAfrican(countryCode?: string): boolean {
  return !!countryCode && AFRICA_CODES.has(countryCode.toUpperCase());
}

export const formatNumber = (id) => String(id).padStart(3, '0');

export const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

export function normalizeQuery(raw) {
  const clean = raw.trim().toLowerCase();
  if (/^#?\d+$/.test(clean)) return String(Number(clean.replace('#', '')));
  return clean;
}
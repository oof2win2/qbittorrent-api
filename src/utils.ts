export function normalizeHashes(hashes: string | string[]): string {
  if (hashes === "all") return "all";
  return Array.isArray(hashes) ? hashes.join("|") : hashes;
}

export function normalizeList(items: string | string[], separator: string): string {
  return Array.isArray(items) ? items.join(separator) : items;
}

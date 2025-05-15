export function getNameInitials(name: string): string {
  if (!name) return '';

  const parts = name.trim().split(' ').filter(Boolean);

  if (parts.length === 0) return '';

  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

  return parts
    .map((part, index, arr) => (index === 0 || index === arr.length - 1 ? part[0] : ''))
    .join('')
    .toUpperCase();
}

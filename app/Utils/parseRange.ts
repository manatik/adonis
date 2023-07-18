export const parseRange = (range: string) => {
  if (!range || !range.includes('=')) return {};
  const bytes = range.split('=').pop();
  if (!bytes || !range.includes('-')) return {};
  const [start, end] = bytes.split('-').map((n) => parseInt(n));
  if (isNaN(start)) return isNaN(end) ? {} : { tail: end };
  return isNaN(end) ? { start } : { start, end };
};
const millisecondsPerDay = 24 * 60 * 60 * 1000;

function toUtcDateOnly(date: Date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getLeaveDurationDays(startDate: Date, endDate: Date) {
  const start = toUtcDateOnly(startDate);
  const end = toUtcDateOnly(endDate);

  return Math.max(1, Math.round((end - start) / millisecondsPerDay) + 1);
}

export function getLeaveDurationLabel(startDate: Date, endDate: Date) {
  const days = getLeaveDurationDays(startDate, endDate);

  return days === 1 ? "1 day" : `${days} days`;
}

const now = new Date();
const utcNow = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));

export function getOffsetMinutes(tz: string): number {
  const tzNow = new Date(now.toLocaleString('en-US', { timeZone: tz }));
  return (tzNow.getTime() - utcNow.getTime()) / 60000;
}

export function formatOffset(minutes: number): string {
  const sign = minutes >= 0 ? '+' : '-';
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60).toString().padStart(2, '0');
  const m = (abs % 60).toString().padStart(2, '0');
  return `UTC${sign}${h}:${m}`;
}

export const allTimezones = Intl.supportedValuesOf('timeZone').slice().sort((a, b) => getOffsetMinutes(a) - getOffsetMinutes(b));

export function calculateRelativeTime(isoDate: string): string {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} years ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval}min ago`;

  interval = Math.floor(seconds / 86400);
  if (interval === 1) return `1d ago`;
  if (interval > 1) return `${interval}d ago`;

  interval = Math.floor(seconds / 3600);
  if (interval === 1) return `1h ago`;
  if (interval > 1) return `${interval}h ago`;

  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval}min ago`;
  if (interval === 1) return `${interval}min ago`;

  if (seconds === 1) return `Just now`;
  return `Just now`;
}

export function calculateRelativeTimestamp(
  unixTimeSeconds: number,
  suffixAgo = false
): string {
  if (!unixTimeSeconds) return '';

  const now = Math.floor(Date.now() / 1000);
  const seconds = now - unixTimeSeconds;

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval}y` + (suffixAgo ? ' ago' : '');

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval}mo` + (suffixAgo ? ' ago' : '');

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval}d` + (suffixAgo ? ' ago' : '');

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval}h` + (suffixAgo ? ' ago' : '');

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval}m` + (suffixAgo ? ' ago' : '');

  // temp disabled seconds
  if (seconds === 1) return `now`;

  return `now`;
}

// 26 May, 2024 --> 2024-05-26T00:00:00.000Z
// 2024-05-26T00:00:00.000Z --> 26 May, 2024
export function TranslateDate(input: string): string {

  // Check if the input is in the '26 May, 2024' format using a regular expression
  const dayMonthYearRegex = /^\d{2}\s\w{3},\s\d{4}$/;

  // If the input matches '26 May, 2024' format, convert to timestampz
  if (dayMonthYearRegex.test(input)) {
    // Split the dateString into day, month, and year parts
    const [day, month, year] = input.split(/[\s,]+/);

    // Create a mapping of short month names to their respective numerical values
    const monthMapping: { [key: string]: string } = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12'
    };

    // Construct a new date string in 'YYYY-MM-DD' format and then create a Date object
    const isoDateString = `${year}-${monthMapping[month]}-${day}`;

    // Return the ISO date string in timestampz format with time information added
    const date = new Date(`${isoDateString}T00:00:00Z`);
    return date.toISOString(); // Converts to 'YYYY-MM-DDTHH:MM:SS.sssZ' format
  } else {
    // If the input does not match '26 May, 2024', assume it's a timestampz
    const date = new Date(input);

    // Create a mapping of month numbers to short month names
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // Get the day, month, and year from the date object
    const day = date.getUTCDate(); // Get day of the month (1-31)
    const month = monthNames[date.getUTCMonth()]; // Get month name (e.g., "May")
    const year = date.getUTCFullYear(); // Get year (e.g., 2024)

    // Return the formatted string in "Day Month, Year" format
    return `${String(day).padStart(2, '0')} ${month}, ${year}`;
  }
}

// Helper function to get the week number from a date
export function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

// Helper function to get the month abbreviation
export function getMonthAbbr(date) {
  return date.toLocaleString('en-US', { month: 'short' });
}

export function getFullMonthAndYear(unixTimeSeconds: number): string {
  if (!unixTimeSeconds) return '';

  const date = new Date(unixTimeSeconds * 1000);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
  return date.toLocaleDateString('en-US', options);
}

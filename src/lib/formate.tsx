// Function to format the date and time in a readable format
export function formatDateTime(dateTimeString: string): string {
  // Parse the date-time string into a Date object
  const date = new Date(dateTimeString);

  // Options for formatting the date and time
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    // timeZoneName: "short",
  };

  // Format the date using the options
  return date.toLocaleString("en-US", options);
}

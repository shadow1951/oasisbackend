// Helper: Combine ISO date and "HH:mm" time into a full Date object
export const combineDateAndTime = (dateStr, timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date(dateStr);
  date.setHours(hours, minutes, 0, 0); // Set time on the date
  return date;
};

import reservation from "./model/reservation.mjs";

export const checkTimeSlotAvailability = async (
  startDate, // ISO Date (e.g. "2025-05-15T00:00:00.000Z")
  endDate, // ISO Date (e.g. "2025-05-15T00:00:00.000Z")
  startTime, // HH:mm format (e.g. "09:00")
  endTime, // HH:mm format (e.g. "12:00")
  hallId // Hall ID (e.g. "hall123")
) => {
  try {
    // Helper to combine date and time into a full Date object
    const combineDateAndTime = (dateStr, timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      const date = new Date(dateStr);
      date.setHours(hours, minutes, 0, 0); // Set time on the date
      return date;
    };

    // Combine start and end times to full Date objects
    const newStart = combineDateAndTime(startDate, startTime);
    const newEnd = combineDateAndTime(endDate, endTime);

    // Find reservations on the same start_date and end_date
    const reservations = await reservation.find({
      hall_id: hallId,
      start_date: { $eq: startDate },
      end_date: { $eq: endDate },
    });

    // Check for any overlap with existing reservations
    const isConflict = reservations.some((r) => {
      const existingStart = combineDateAndTime(r.start_date, r.start_time);
      const existingEnd = combineDateAndTime(r.end_date, r.end_time);

      // Check if there's any overlap between the new and existing reservations
      return newStart < existingEnd && existingStart < newEnd;
    });

    return !isConflict; // Return true if slot is available, false if there is a conflict
  } catch (err) {
    console.error("Error checking time slot availability:", err);
    throw err;
  }
};

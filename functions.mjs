import Reservation from "./model/reservation.mjs";

export const checkTimeSlotAvailability = async (
  startDate, // "2025-05-15" (string date)
  endDate, // "2025-05-15" (string date)
  startTime, // HH:mm format (e.g. "01:00")
  endTime, // HH:mm format (e.g. "02:00")
  hallid // Hall ID
) => {
  try {
    // Helper to combine date and time into a full Date object (with time zone handling)
    const combineDateAndTime = (dateStr, timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      const date = new Date(dateStr); // "2025-05-15" => full Date object
      date.setHours(hours, minutes, 0, 0); // Set time on the date
      return date;
    };

    // Normalize startDate and endDate to full Date objects with time zone handling
    const normalizedStartDate = new Date(`${startDate}T00:00:00.000Z`); // Ensure it's in ISO format with UTC
    const normalizedEndDate = new Date(`${endDate}T00:00:00.000Z`); // Same here

    // Combine start and end times to full Date objects
    const newStart = combineDateAndTime(normalizedStartDate, startTime);
    const newEnd = combineDateAndTime(normalizedEndDate, endTime);

    // Find reservations in the same hall and date range
    const reservations = await Reservation.find({
      start_date: { $gte: normalizedStartDate, $lte: normalizedEndDate },
      hall_id: hallid,
    });
    console.log("Reservations found:", reservations);

    // Check for conflicts with existing reservations
    const isConflict = reservations.some((r) => {
      const existingStart = combineDateAndTime(r.start_date, r.start_time);
      const existingEnd = combineDateAndTime(r.end_date, r.end_time);

      // Check if the new reservation overlaps with an existing one
      return newStart < existingEnd && newEnd > existingStart;
    });

    return !isConflict; // Return true if no conflict, false if there's a conflict
  } catch (err) {
    console.error("Error checking time slot availability:", err);
    throw err;
  }
};

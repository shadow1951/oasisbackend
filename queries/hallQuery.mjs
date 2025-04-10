import { Hall } from "../model/halls.mjs";

export const addHall = async (hallData) => {
  try {
    const missingFields = [];

    if (!hallData.hallName) missingFields.push("hallName");
    if (!hallData.hallFacility) missingFields.push("hallFacility");
    if (hallData.capacity === undefined) missingFields.push("capacity");
    if (!hallData.type) missingFields.push("type");
    if (!hallData.primaryInCharge) missingFields.push("primaryInCharge");

    if (missingFields.length > 0) {
      throw new Error(
        `The following required fields are missing: ${missingFields.join(
          ", "
        )}. Please provide all required information and try again.`
      );
    }

    // Optional: Check for duplicate hall name
    const existing = await Hall.findOne({ hall_name: hallData.hallName });
    if (existing) {
      throw new Error(
        "A hall with this name already exists. Please choose a different name."
      );
    }

    const newHall = new Hall({
      hall_name: hallData.hallName,
      hall_facility: hallData.hallFacility,
      capacity: hallData.capacity,
      type: hallData.type,
      primary_in_charge: hallData.primaryInCharge,
    });

    const result = await newHall.save();
    return result;
  } catch (error) {
    throw new Error(`Error adding hall: ${error.message}`);
  }
};

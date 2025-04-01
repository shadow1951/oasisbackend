import { Hall } from "../model/hall.mjs";

export const addHall = async (hallData) => {
  try {
    // Check if all required fields are present
    const missingFields = [];

    if (!hallData.hallName) missingFields.push("hallName");
    if (!hallData.hallFacility) missingFields.push("hallFacility");
    if (hallData.capacity === undefined) missingFields.push("capacity");
    if (!hallData.type) missingFields.push("type");
    if (!hallData.primaryInCharge) missingFields.push("primaryInCharge");

    // If there are missing fields, throw a professional error message
    if (missingFields.length > 0) {
      throw new Error(
        `The following required fields are missing: ${missingFields.join(
          ", "
        )}.Please provide all required information and try again.`
      );
    }

    // Proceed with the database insert
    const result = await db.insert(halls).values(hallData).execute();

    return result; // Successfully added the hall
  } catch (error) {
    if (error.code === "23505") {
      // Unique violation error code in PostgreSQL
      throw new Error(
        "A hall with this name already exists. Please choose a different name."
      );
    } else {
      throw new Error(`Error adding hall: ${error.message}`);
    }
  }
};

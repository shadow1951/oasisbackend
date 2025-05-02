import reservationHolder from "../model/reservationHolder.mjs";

export const addReservationHolderQuery = async (reservationHolderData) => {
  const { reserverName, reserverPhoneNumber, reservationEmail, id } =
    reservationHolderData;

  try {
    const newReservationHolder = new reservationHolder({
      reserverName,
      reserverPhoneNumber,
      reservationEmail,
      id,
    });
    const result = await newReservationHolder.save();
    return { message: "Reservation holder added successfully", result: result };
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding reservation holder" });
  }
};

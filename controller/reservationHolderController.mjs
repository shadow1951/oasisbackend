import { addReservationHolderQuery } from "../queries/reservationHolder.mjs";

export const addReservationHolder = async (req, res) => {
  const { reserverName, reserverPhoneNumber, reservationEmail } = req.body;
  const missingFields = [];

  if (!reserverName) {
    missingFields.push("reservername");
  }
  if (!reserverPhoneNumber) {
    missingFields.push("reserverPhoneNumber");
  }
  if (!reservationEmail) {
    missingFields.push("reservationEmail");
  }

  if (missingFields.length < 0) {
    return res.status(400).json({
      message: `The following required fields are missing: ${missingFields.join(
        ", "
      )}. Please provide all required information and try again.`,
    });
  }

  try {
    const id = req.user.id;
    const reservationHolderData = {
      reserverName: reserverName,
      reserverPhoneNumber: reserverPhoneNumber,
      reservationEmail: reservationEmail,
      id: id,
    };

    const newReservationHolder = await addReservationHolderQuery(
      reservationHolderData
    );
    return res.status(201).json({
      data: newReservationHolder,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

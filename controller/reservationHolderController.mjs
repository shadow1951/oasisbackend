import { addReservationHolderQuery } from "../queries/reservationHolder.mjs";

export const addReservationHolder = async (req, res, next) => {
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
      reserver_name: reserverName,
      reserver_phoneNumber: reserverPhoneNumber,
      reserver_email: reservationEmail,
      user_id: id,
    };

    const newReservationHolder = await addReservationHolderQuery(
      reservationHolderData
    );

    req.user.reserverId = newReservationHolder.result._id;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

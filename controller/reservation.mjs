import { check } from "express-validator";
import { addReservation } from "../queries/reservationHolder.mjs";
import { deleteReservationById } from "../queries/reservationHolder.mjs";
import { checkTimeSlotAvailability } from "../functions.mjs";

export const getReservation = async (req, res) => {
  try {
    const { id, reserverId } = req.user;
    console.log(reserverId, id);
    const {
      hallId,
      eventName,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
      foodRequirement,
    } = req.body;

    // Check for missing required user properties
    if (!id || !reserverId) {
      return res
        .status(500)
        .json({ message: "Missing user parameters: id or reserverId" });
    }

    // Check for missing required body properties
    if (
      !hallId ||
      !eventName ||
      !description ||
      !startDate ||
      !startTime ||
      !endDate ||
      !endTime
    ) {
      return res.status(400).json({
        message:
          "Missing one or more required reservation parameters in request body",
      });
    }

    //check for time slot availability
    const resultOfTimeSlot = await checkTimeSlotAvailability(
      startDate,
      endDate,
      startTime,
      endTime,
      hallId
    );
    if (!resultOfTimeSlot) {
      return res.status(400).json({
        message: "The selected time slot is not available.",
      });
    }

    const newReservationData = {
      reserver_id: reserverId,
      hall_id: hallId,
      start_date: new Date(startDate).toISOString().slice(0, 10),
      end_date: new Date(endDate).toISOString().slice(0, 10),
      start_time: startTime,
      end_time: endTime,
      purpose: description,
      status: "pending",
      food_requirement: foodRequirement || false,
    };
    const newReservation = await addReservation(newReservationData);

    return res.status(201).json({
      data: newReservation,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;

    if (!reservationId) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: reservationId" });
    }

    const deletedReservation = await deleteReservationById(reservationId);

    if (!deletedReservation) {
      return res
        .status(404)
        .json({ message: "Reservation not found or already deleted" });
    }

    return res.status(200).json({
      message: "Reservation deleted successfully",
      data: deletedReservation,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

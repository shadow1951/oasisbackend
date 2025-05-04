import express from "express";
import { addReservationHolder } from "../controller/reservationHolderController.mjs";
import { temporaryVallidation } from "../dummy.mjs";
import { getReservation } from "../controller/reservation.mjs";

const router = express.Router();

router.post(
  "/addReservation",
  temporaryVallidation,
  addReservationHolder,
  getReservation
);

export default router;

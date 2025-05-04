import express from "express";
import { addReservationHolder } from "../controller/reservationHolderController.mjs";
import { temporaryVallidation } from "../dummy.mjs";
import { addReservation } from "../queries/reservationHolder.mjs";

const router = express.Router();

router.post(
  "/addReservation",
  temporaryVallidation,
  addReservationHolder,
  addReservation
);

export default router;

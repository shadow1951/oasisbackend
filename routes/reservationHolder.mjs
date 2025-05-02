import express from "express";
import { addReservationHolder } from "../controller/reservationHolderController.mjs";
import { temporaryVallidation } from "../dummy.mjs";

const router = express.Router();

router.post(
  "/addReservationHolder",
  temporaryVallidation,
  addReservationHolder
);

export default router;

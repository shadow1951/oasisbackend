import express from "express";
import { deleteReservation } from "../controller/reservation.mjs";

const router = express.Router();

router.get("/addReservation");
router.delete("/deleteReservation/:id", deleteReservation);
export default router;

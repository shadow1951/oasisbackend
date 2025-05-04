import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  reserver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ReservationHolder",
    required: true,
  },
  hall_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hall",
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    maxlength: 255,
    required: true,
  },
  status: {
    type: String,
    maxlength: 20,
    default: "pending",
  },
  food_requirement: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Reservation", reservationSchema);

import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  reserver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ReservationHolder",
  },
  hall_id: { type: mongoose.Schema.Types.ObjectId, ref: "Hall" },
  date: { type: Date },
  start_time: { type: String }, // Or Date if using DateTime type
  end_time: { type: String },
  purpose: { type: String, maxlength: 255 },
  status: { type: String, maxlength: 20 },
  food_requirement: { type: Boolean },
});

export default mongoose.model("Reservation", reservationSchema);

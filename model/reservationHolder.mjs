import mongoose from "mongoose";

const reservationHolderSchema = new mongoose.Schema({
  reserver_name: { type: String, maxlength: 100 },
  reserver_phoneNumber: { type: String, maxlength: 15 },
  reserver_email: { type: String, maxlength: 100 },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("ReservationHolder", reservationHolderSchema);

import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  reservation_id: { type: mongoose.Schema.Types.ObjectId, ref: "Reservation" },
  notification_type: { type: String, maxlength: 50 },
  recipient_email: { type: String, maxlength: 100 },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Notification", notificationSchema);
